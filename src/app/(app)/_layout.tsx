import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="day/[date]" />
            <Stack.Screen name="task/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="task/new" options={{ presentation: 'modal' }} />
            <Stack.Screen name="templates/index" />
            <Stack.Screen name="index" />
        </Stack>
    )
}