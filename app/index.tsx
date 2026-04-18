import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BÀI KIỂM TRA 2</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct1')}>
        <Text style={styles.buttonText}>CT1 - Tắt máy mô phỏng</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct2')}>
        <Text style={styles.buttonText}>CT2 - Giao diện cuộc gọi tới</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct3')}>
        <Text style={styles.buttonText}>CT3 - Giao diện chữ chạy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.infoBtn]} onPress={() => router.push('/thongtin')}>
        <Text style={styles.buttonText}>Thông tin Sinh viên</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f1f5f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#0f172a' },
  button: { width: '100%', backgroundColor: '#3b82f6', padding: 15, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  infoBtn: { backgroundColor: '#8b5cf6', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});