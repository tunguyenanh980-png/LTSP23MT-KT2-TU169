import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="thongtin" />
      <Stack.Screen name="ct1" />
      <Stack.Screen name="ct2" />
      <Stack.Screen name="ct3" />
    </Stack>
  );
}