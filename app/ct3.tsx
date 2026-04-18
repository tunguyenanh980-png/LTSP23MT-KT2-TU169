import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function CT3Screen() {
  const [text, setText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // Dùng Animated để thay đổi vị trí chữ
  const scrollX = useRef(new Animated.Value(screenWidth)).current;
  let lastPress = 0;

  const handleRun = () => {
    if (!text.trim()) return;
    setIsRunning(true);
    
    scrollX.setValue(screenWidth); // Đặt vị trí bắt đầu ở mép phải
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -screenWidth, // Chạy trượt qua mép trái
        duration: 4000, // Chạy trong 4 giây rồi lặp lại
        useNativeDriver: true,
      })
    ).start();
  };

  const handleDoubleTap = () => {
    const time = new Date().getTime();
    if (time - lastPress < 400) {
      setIsRunning(false);
      scrollX.stopAnimation(); // Dừng hiệu ứng chạy
    }
    lastPress = time;
  };

  return (
    <Pressable style={styles.container} onPress={handleDoubleTap}>
      {!isRunning ? (
        <View style={styles.form}>
          <Text style={styles.title}>Nhập chữ muốn chạy</Text>
          <TextInput style={styles.input} placeholder="Nhập text..." value={text} onChangeText={setText} />
          <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
            <Text style={styles.btnText}>RUN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.marqueeScreen}>
          <Animated.Text style={[styles.marqueeText, { transform: [{ translateX: scrollX }] }]}>
            {text}
          </Animated.Text>
          <Text style={styles.instruction}>Nhấn đúp (2 lần) vào màn hình để DỪNG</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  form: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 20, fontSize: 16 },
  runBtn: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  
  marqueeScreen: { flex: 1, justifyContent: 'center', backgroundColor: '#000', overflow: 'hidden' },
  marqueeText: { fontSize: 50, fontWeight: 'bold', color: '#facc15', width: screenWidth * 2 },
  instruction: { position: 'absolute', bottom: 50, alignSelf: 'center', color: '#ef4444', fontStyle: 'italic', fontSize: 16 }
});