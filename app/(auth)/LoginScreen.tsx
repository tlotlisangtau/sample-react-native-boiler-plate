import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import styles from '@/styles/LogInCss';
import { Stack } from 'expo-router';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,Dimensions,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '@/components/Button/CustomButton';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(`Login Failed' ${error.message}`);
    } else {
      alert("Login Successful");
      router.replace('../(tabs)/capture'); 

    }
  };


  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
        <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#1E88E5" />
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitleText}>Sign in to continue</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="white" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="white" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons 
                  name={showPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <CustomButton title="Sign In" onPress={handleLogin} />

          <TouchableOpacity 
        style={styles.signupRedirect} 
        onPress={() => router.push('../SignUpScreen')}
      >
        <Text style={styles.signupRedirectText}>
          Don't have an account? <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;

