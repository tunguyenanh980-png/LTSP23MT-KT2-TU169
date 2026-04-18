import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CT2Screen() {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [delay, setDelay] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  let lastPress = 0;

  const handleRun = () => {
    if (!name || !origin || !delay) return;
    const delayTime = parseInt(delay) * 1000; // Đổi giây ra mili-giây
    
    // Đặt bộ đếm thời gian
    timeoutRef.current = setTimeout(() => {
      setIsCalling(true);
    }, delayTime);
  };

  const handleDoubleTap = () => {
    const time = new Date().getTime();
    if (time - lastPress < 400) {
      // Tắt cuộc gọi
      setIsCalling(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    lastPress = time;
  };

  return (
    <Pressable style={styles.container} onPress={handleDoubleTap}>
      {!isCalling ? (
        <View style={styles.form}>
          <Text style={styles.title}>Cấu hình cuộc gọi</Text>
          <TextInput style={styles.input} placeholder="Tên người gọi" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Xuất xứ số điện thoại" value={origin} onChangeText={setOrigin} />
          <TextInput style={styles.input} placeholder="Thời gian trễ (Ví dụ: 3 giây)" keyboardType="numeric" value={delay} onChangeText={setDelay} />
          
          <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
            <Text style={styles.btnText}>RUN</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.callScreen}>
          <Text style={styles.incomingText}>📞 ĐANG GỌI TỚI...</Text>
          <Text style={styles.callerName}>{name}</Text>
          <Text style={styles.callerOrigin}>{origin}</Text>
          <Text style={styles.instruction}>Nhấn đúp (2 lần) vào màn hình để TẮT</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  form: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 15, fontSize: 16 },
  runBtn: { backgroundColor: '#10b981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  
  callScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e293b' },
  incomingText: { fontSize: 20, color: '#10b981', marginBottom: 20 },
  callerName: { fontSize: 40, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  callerOrigin: { fontSize: 18, color: '#94a3b8', marginBottom: 50 },
  instruction: { color: '#ef4444', fontStyle: 'italic', fontSize: 16 }
});