import { Image, StyleSheet, Text, View } from 'react-native';

export default function ThongTinScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/Tu.png')} style={styles.avatar} />
        
        <Text style={styles.name}>Nguyễn Anh Tú</Text>
        <View style={styles.infoRow}><Text style={styles.label}>Lớp:</Text><Text style={styles.value}>CĐ ĐTTT 23MT</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>MSSV:</Text><Text style={styles.value}>0308231169</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Sở thích:</Text><Text style={styles.value}>Công Nghệ và Game</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Link Github:</Text><Text style={styles.value}>Đang cập nhật...</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8fafc' },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 3, borderColor: '#3b82f6' },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#1e293b' },
  infoRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#64748b' },
  value: { fontSize: 16, color: '#0f172a' }
});