import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#3b82f6', '#8b5cf6', '#10b981']} style={styles.container}>
      
      <View style={styles.header}>
        <Ionicons name="school" size={50} color="white" />
        <Text style={styles.title}>BÀI KIỂM TRA 2</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct1')}>
        <View style={styles.iconBox}>
          <Ionicons name="battery-full" size={24} color="#ef4444" />
        </View>
        <Text style={styles.buttonText}>CT1</Text>
        <View style={styles.spacer} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct2')}>
        <View style={styles.iconBox}>
          <Ionicons name="call" size={24} color="#10b981" />
        </View>
        <Text style={styles.buttonText}>CT2</Text>
        <View style={styles.spacer} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/ct3')}>
        <View style={styles.iconBox}>
          <Ionicons name="text" size={24} color="#f59e0b" />
        </View>
        <Text style={styles.buttonText}>CT3</Text>
        <View style={styles.spacer} />
      </TouchableOpacity>

      {/* Đã chỉnh sửa lại nút này để đồng bộ 100% với các nút trên */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/thongtin')}>
        <View style={styles.iconBox}>
          <Ionicons name="person" size={24} color="#3b82f6" />
        </View>
        <Text style={styles.buttonText}>Thông tin Sinh viên</Text>
        <View style={styles.spacer} />
      </TouchableOpacity>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', color: 'white', marginTop: 10, letterSpacing: 1, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5 },
  
  // Style chung cho cả 4 nút
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: 12, borderRadius: 15, marginBottom: 15, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5 },
  
  iconBox: { width: 45, height: 45, backgroundColor: '#f1f5f9', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  spacer: { width: 45, marginLeft: 10 },
  buttonText: { flex: 1, textAlign: 'center', color: '#0f172a', fontSize: 17, fontWeight: 'bold' }
});