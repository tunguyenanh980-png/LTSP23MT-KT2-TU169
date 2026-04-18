import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'Menu Chính' }} />
      <Stack.Screen name="thongtin" options={{ title: 'Thông Tin Sinh Viên' }} />
      <Stack.Screen name="ct1" options={{ title: 'CT1 - Tắt máy' }} />
      <Stack.Screen name="ct2" options={{ title: 'CT2 - Cuộc gọi tới' }} />
      <Stack.Screen name="ct3" options={{ title: 'CT3 - Chữ chạy' }} />
    </Stack>
  );
}