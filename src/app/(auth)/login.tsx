import React, { use } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

const login = () => {
    const {user, isLoading} = useAuthStore();
    if (isLoading) return null;
    return (
        <View>
            <Text>Login!</Text>
        </View>
    );
}

export default login