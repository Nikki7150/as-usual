import React, { use, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { View, Text, StyleSheet, TextInput, Pressable, } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { auth } from '../../../firebaseConfig';
import { getAuthErrorMessage } from '@/utils/authErrors';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {user, isLoading} = useAuthStore();
    const [submitting, setSubmitting] = useState(false);
    if (isLoading) return null;

    const handleLogin = async () => {
        setSubmitting(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error('Error logging in: ', err);
            setError(getAuthErrorMessage(err.code) || 'An unexpected error occurred. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.safeArea}>
            <ThemedText type='title'>Login</ThemedText>
            <TextInput
                placeholder="Email"
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                style={styles.textInput}
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>{submitting ? 'Processing...' : 'Login'}</Text>
            </Pressable>
            <Link href="/signup" style={{ flex: 1 }}>Don't have an account? Sign Up</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.four,
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        borderBottomWidth: 2,
        marginBottom: 12,
        paddingHorizontal: 10,
        fontSize: 30,
    },
    button: {
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
    },
    errorText: {
        marginBottom: 12,
    },
});