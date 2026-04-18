import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CT2Screen() {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [delay, setDelay] = useState('');
  
  const [isCalling, setIsCalling] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false); // Trạng thái đã bắt máy
  const [callDuration, setCallDuration] = useState(0); // Bộ đếm thời gian
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  let lastPress = 0;

  // Dừng mọi thứ khi tắt cuộc gọi
  const stopCall = () => {
    setIsCalling(false);
    setIsAccepted(false);
    setCallDuration(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleRun = () => {
    if (!name || !origin || !delay) return;
    const delayTime = parseInt(delay) * 1000; 
    
    timeoutRef.current = setTimeout(() => {
      setIsCalling(true);
    }, delayTime);
  };

  // Hàm xử lý bắt máy
  const acceptCall = () => {
    setIsAccepted(true);
    setCallDuration(0);
    // Bắt đầu đếm thời gian
    timerRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
  };

  // Định dạng thời gian mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleDoubleTap = () => {
    const time = new Date().getTime();
    if (time - lastPress < 400) stopCall();
    lastPress = time;
  };

  return (
    <View style={{ flex: 1 }}>
      {!isCalling ? (
        <LinearGradient colors={['#3b82f6', '#8b5cf6', '#10b981']} style={styles.container}>
          
          {/* Nút Back ở Menu */}
          <TouchableOpacity style={styles.backBtnMenu} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.backTextMenu}>Quay lại</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <View style={styles.iconCircle}><Ionicons name="call" size={40} color="#10b981" /></View>
            <Text style={styles.title}>Cấu hình cuộc gọi</Text>
            <TextInput style={styles.input} placeholder="Tên người gọi" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Xuất xứ số điện thoại" value={origin} onChangeText={setOrigin} />
            <TextInput style={styles.input} placeholder="Thời gian trễ (Ví dụ: 3 giây)" keyboardType="numeric" value={delay} onChangeText={setDelay} />
            
            <TouchableOpacity style={styles.runBtn} onPress={handleRun}>
              <Text style={styles.btnText}>BẮT ĐẦU MÔ PHỎNG</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : (
        <Pressable style={styles.callScreen} onPress={handleDoubleTap}>
          <View style={{ alignItems: 'center', marginTop: 100 }}>
            {/* Hiển thị thời gian đếm nếu đã bắt máy, ngược lại báo ĐANG GỌI */}
            <Text style={styles.incomingText}>{isAccepted ? formatTime(callDuration) : 'ĐANG GỌI TỚI...'}</Text>
            <Text style={styles.callerName}>{name}</Text>
            <Text style={styles.callerOrigin}>{origin}</Text>
          </View>

          {/* VÙNG CHỨA NÚT SÁT VIỀN DƯỚI */}
          <View style={styles.bottomControls}>
            {!isAccepted ? (
              // Trạng thái đang gọi tới: Có cả nút Xanh và Đỏ
              <View style={styles.actionButtons}>
                <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#ef4444' }]} onPress={stopCall}>
                  <Ionicons name="call" size={35} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#10b981' }]} onPress={acceptCall}>
                  <Ionicons name="call" size={35} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              // Trạng thái đã bắt máy: Chỉ còn nút Đỏ ở giữa
              <View style={styles.actionButtonsSingle}>
                <TouchableOpacity style={[styles.callBtn, { backgroundColor: '#ef4444' }]} onPress={stopCall}>
                  <Ionicons name="call" size={35} color="white" style={{ transform: [{ rotate: '135deg' }] }} />
                </TouchableOpacity>
              </View>
            )}
          </View>
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
  iconCircle: { width: 80, height: 80, backgroundColor: '#d1fae5', borderRadius: 40, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', marginBottom: 15, fontSize: 16 },
  runBtn: { backgroundColor: '#10b981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  callScreen: { flex: 1, backgroundColor: '#1e293b', position: 'relative' },
  incomingText: { fontSize: 18, color: '#94a3b8', marginBottom: 15, letterSpacing: 2 },
  callerName: { fontSize: 45, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  callerOrigin: { fontSize: 18, color: '#cbd5e1' },
  
  // Ép các nút xuống dưới cùng
  bottomControls: { position: 'absolute', bottom: 60, width: '100%' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 40 },
  actionButtonsSingle: { flexDirection: 'row', justifyContent: 'center' },
  callBtn: { width: 75, height: 75, borderRadius: 37.5, justifyContent: 'center', alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },
});