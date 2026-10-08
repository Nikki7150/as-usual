import { Stack } from "expo-router";

export default function Authlayout() {
    return (
        <Stack 
            screenOptions={{ 
                headerShown: false,
                animation: "fade",
                gestureEnabled: false, // disables swipe back
            }}
        />
    );
}