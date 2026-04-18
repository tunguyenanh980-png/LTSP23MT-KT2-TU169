import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ThongTinScreen() {
  const githubLink = "https://github.com/tunguyenanh980-png/LTSP23MT-KT2-TU169.git";

  return (
    <LinearGradient colors={['#3b82f6', '#8b5cf6', '#10b981']} style={styles.container}>
      
      {/* Nút Quay Lại Tự Tạo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Quay lại</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Image source={require('../assets/images/Tu.png')} style={styles.avatar} />
        
        <Text style={styles.name}>Nguyễn Anh Tú</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Lớp:</Text>
          <Text style={styles.value}>CĐ ĐTTT 23MT</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>MSSV:</Text>
          <Text style={styles.value}>0308231169</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sở thích:</Text>
          <Text style={styles.value}>Công Nghệ và Game</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.label}>Link Github:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(githubLink)}>
            <Text style={[styles.value, styles.linkText]} numberOfLines={1}>
              tunguyenanh980-png...
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  backBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  backText: { color: 'white', fontWeight: 'bold', fontSize: 16, marginLeft: 5 },
  
  card: { backgroundColor: 'white', padding: 30, borderRadius: 25, alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10 },
  avatar: { width: 130, height: 130, borderRadius: 65, marginBottom: 20, borderWidth: 4, borderColor: '#8b5cf6' },
  name: { fontSize: 28, fontWeight: '900', marginBottom: 25, color: '#1e293b' },
  
  infoRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#64748b' },
  value: { fontSize: 16, color: '#0f172a', maxWidth: '65%', textAlign: 'right', fontWeight: '500' },
  linkText: { color: '#3b82f6', textDecorationLine: 'underline', fontWeight: 'bold' }
});