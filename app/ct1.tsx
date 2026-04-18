import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CT1Screen() {
  const [isMachineOn, setIsMachineOn] = useState(true);
  let lastPress = 0;

  const handleDoubleTap = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;
    const DOUBLE_PRESS_DELAY = 400; // Khoảng thời gian cho phép giữa 2 lần nhấn (400ms)

    if (delta < DOUBLE_PRESS_DELAY) {
      setIsMachineOn(false);
      Alert.alert("Thành công", "Đã tắt máy!");
    }
    lastPress = time;
  };

  return (
    <Pressable style={[styles.container, { backgroundColor: isMachineOn ? '#dbeafe' : '#fee2e2' }]} onPress={handleDoubleTap}>
      <View style={[styles.indicator, { backgroundColor: isMachineOn ? '#3b82f6' : '#ef4444' }]} />
      <Text style={styles.statusText}>{isMachineOn ? "MÁY ĐANG HOẠT ĐỘNG" : "MÁY ĐÃ TẮT"}</Text>
      <Text style={styles.instruction}>Chạm 2 lần liên tiếp vào màn hình để tắt</Text>
      
      {!isMachineOn && (
        <Pressable style={styles.resetBtn} onPress={() => setIsMachineOn(true)}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Bật lại máy</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  indicator: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
  statusText: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  instruction: { fontSize: 16, color: '#64748b', fontStyle: 'italic' },
  resetBtn: { marginTop: 30, padding: 15, backgroundColor: '#10b981', borderRadius: 10 }
});