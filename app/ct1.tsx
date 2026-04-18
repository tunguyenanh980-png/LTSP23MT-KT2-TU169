import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CT1Screen() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(5); 
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  let lastPress = useRef(0).current;

  // Hiệu ứng chỉ chớp nháy thanh năng lượng (không chớp viền pin)
  useEffect(() => {
    if (isSimulating && !isCharging && batteryLevel <= 20) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, { toValue: 0.1, duration: 500, useNativeDriver: true }),
          Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      ).start();
    } else {
      fadeAnim.stopAnimation();
      fadeAnim.setValue(1);
    }
  }, [isSimulating, isCharging, batteryLevel]);

  // Logic sạc pin
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCharging && isSimulating) {
      interval = setInterval(() => {
        setBatteryLevel(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 3000); 
    }
    return () => clearInterval(interval);
  }, [isCharging, isSimulating]);

  // Vẫn giữ tính năng nhấn đúp để thoát (vì đã bỏ nút back)
  const handleDoubleTap = () => {
    const time = new Date().getTime();
    if (time - lastPress < 400) {
      setIsSimulating(false);
      setIsCharging(false);
      setBatteryLevel(5); 
    }
    lastPress = time;
  };

  // =============== MÀN HÌNH MENU ==================
  if (!isSimulating) {
    return (
      <LinearGradient colors={['#3b82f6', '#8b5cf6', '#10b981']} style={styles.container}>
        
        <TouchableOpacity style={styles.backBtnMenu} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backTextMenu}>Quay lại</Text>
        </TouchableOpacity>

        <View style={styles.menuCard}>
          <Ionicons name="battery-half" size={60} color="#3b82f6" style={{ marginBottom: 10 }} />
          <Text style={styles.menuTitle}>MÔ PHỎNG PIN</Text>
          <Text style={styles.menuDesc}>Kiểm tra hiệu ứng sạc pin, thanh năng lượng chạy từ trái sang phải.</Text>
          <TouchableOpacity style={styles.startBtn} onPress={() => setIsSimulating(true)}>
            <Text style={styles.startBtnText}>VÀO MÔ PHỎNG</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  // =============== MÀN HÌNH MÔ PHỎNG ==================
  return (
    <Pressable style={styles.simContainer} onPress={handleDoubleTap}>
      <View style={styles.centerWrapper}>
        
        {/* ĐỒ HỌA PIN CHÍNH GIỮA */}
        <View style={styles.hardwareContainer}>
          <View style={[styles.batteryBody, { borderColor: isCharging ? "#10b981" : (batteryLevel <= 20 ? "#ef4444" : "white") }]}>
            {/* Chỉ có thanh Fill bên trong là áp dụng opacity fadeAnim */}
            <Animated.View style={[styles.batteryFill, { 
              width: `${batteryLevel}%`, 
              backgroundColor: isCharging ? "#10b981" : (batteryLevel <= 20 ? "#ef4444" : "white"),
              opacity: fadeAnim 
            }]} />
            <Text style={styles.batteryText}>{batteryLevel}%</Text>
          </View>
          <View style={[styles.batteryTerminal, { backgroundColor: isCharging ? "#10b981" : (batteryLevel <= 20 ? "#ef4444" : "white") }]} />
        </View>

        {isCharging && <Text style={styles.chargingText}>⚡ Đang sạc...</Text>}

      </View>

      {/* ĐỒ HỌA DÂY SẠC (DÍNH CHẶT VÀO VIỀN DƯỚI) */}
      {!isCharging && (
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => setIsCharging(true)} 
          style={styles.cableWrapper}
        >
          {/* Icon tia sét giống hình 2 */}
          <Ionicons name="flash" size={35} color="white" style={{ marginBottom: 20 }} />
          
          {/* Đầu chấu sạc viền trắng */}
          <View style={styles.plugHeadVertical} />
          
          {/* Sợi dây dài chạm đáy màn hình */}
          <View style={styles.wireVertical} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  
  backBtnMenu: { position: 'absolute', top: 50, left: 20, flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, zIndex: 10 },
  backTextMenu: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 5 },
  
  menuCard: { backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5 },
  menuTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  menuDesc: { textAlign: 'center', color: '#64748b', marginBottom: 20 },
  startBtn: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 12, width: '100%', alignItems: 'center' },
  startBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  simContainer: { flex: 1, backgroundColor: '#0f0f0f', justifyContent: 'center', alignItems: 'center' },
  centerWrapper: { alignItems: 'center', justifyContent: 'center' },
  
  // Layout Pin (Viền tĩnh, thanh trong nhấp nháy)
  hardwareContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  batteryBody: { width: 140, height: 70, borderWidth: 3, borderRadius: 10, padding: 3, justifyContent: 'center', position: 'relative' },
  batteryFill: { height: '100%', borderRadius: 5 },
  batteryText: { position: 'absolute', width: '100%', textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold', textShadowColor: '#000', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 3 },
  batteryTerminal: { width: 6, height: 25, borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  
  chargingText: { color: '#10b981', fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  
  // Layout Dây sạc (Cố định dưới đáy)
  cableWrapper: { 
    position: 'absolute', 
    bottom: 0, 
    alignItems: 'center',
    width: 100 // Vùng bấm đủ rộng để dễ chạm
  },
  plugHeadVertical: { width: 22, height: 28, borderWidth: 2, borderColor: 'white', borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomWidth: 0 },
  wireVertical: { width: 6, height: 120, backgroundColor: 'white' }, // Kéo dài chạm viền
});