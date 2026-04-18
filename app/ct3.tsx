import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

export default function CT3Screen() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState('4'); 
  const [selectedColor, setSelectedColor] = useState('#facc15'); 
  const [isRunning, setIsRunning] = useState(false);
  
  const { width: screenWidth } = useWindowDimensions(); 
  
  const scrollX = useRef(new Animated.Value(screenWidth)).current;
  let lastPress = 0;

  const colors = ['#facc15', '#ef4444', '#3b82f6', '#10b981', '#ffffff', '#d946ef', '#f97316', '#06b6d4']; 

  const startAnimation = () => {
    const duration = parseFloat(speed) * 1000;
    scrollX.setValue(screenWidth); 
    
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -screenWidth * 2, 
        duration: duration, 
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    if (isRunning) {
      scrollX.stopAnimation();
      startAnimation();
    }
  }, [screenWidth, isRunning]);

  const handleRun = async () => {
    if (!text.trim() || !speed) return;
    setIsRunning(true);
    await ScreenOrientation.unlockAsync(); 
  };

  const handleDoubleTap = async () => {
    const time = new Date().getTime();
    if (time - lastPress < 400) {
      setIsRunning(false);
      scrollX.stopAnimation();
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    lastPress = time;
  };

  return (
    <View style={{ flex: 1 }}>
      {!isRunning ? (
        <LinearGradient colors={['#3b82f6', '#8b5cf6', '#10b981']} style={styles.container}>
          
          {/* Nút Back ở Menu */}
          <TouchableOpacity style={styles.backBtnMenu} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.backTextMenu}>Quay lại</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.iconCircle}><Ionicons name="text" size={40} color="#3b82f6" /></View>
            <Text style={styles.title}>Cấu hình Chữ Chạy</Text>
            
            <TextInput style={styles.input} placeholder="Nhập nội dung..." value={text} onChangeText={setText} />
            <TextInput style={styles.input} placeholder="Thời gian chạy (giây) - VD: 4" keyboardType="numeric" value={speed} onChangeText={setSpeed} />
            
            <Text style={styles.label}>Chọn màu chữ:</Text>
            <View style={styles.colorGrid}>
              {colors.map((c) => (
                <TouchableOpacity 
                  key={c} 
                  style={[styles.colorSwatch, { backgroundColor: c, borderWidth: selectedColor === c ? 3 : 0, borderColor: '#1e293b' }]} 
                  onPress={() => setSelectedColor(c)} 
                />
              ))}
            </View>

            <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
              <Text style={styles.btnText}>BẮT ĐẦU CHẠY</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : (
        <Pressable style={styles.marqueeScreen} onPress={handleDoubleTap}>
          <Animated.Text style={[styles.marqueeText, { color: selectedColor, transform: [{ translateX: scrollX }] }]} numberOfLines={1}>
            {text}
          </Animated.Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  
  backBtnMenu: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, zIndex: 10 },
  backTextMenu: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 5 },

  form: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 5 },
  iconCircle: { width: 80, height: 80, backgroundColor: '#dbeafe', borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 15, fontSize: 16 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#64748b', marginBottom: 10 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 25, justifyContent: 'center' },
  colorSwatch: { width: 35, height: 35, borderRadius: 17.5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  runBtn: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  marqueeScreen: { flex: 1, justifyContent: 'center', backgroundColor: '#000', overflow: 'hidden' },
  marqueeText: { fontSize: 60, fontWeight: 'bold' }
});