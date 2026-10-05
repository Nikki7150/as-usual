import React, { use } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Stack } from 'expo-router';

const login = () => {
    const {user, isLoading} = useAuthStore();
    if (isLoading) return null;
    return (
        <Stack>
            {user ? (
                <Stack.Screen name="(app)" />
            ) : (
                <Stack.Screen name='(auth)' />
            )}
        </Stack>
    );
}

export default login