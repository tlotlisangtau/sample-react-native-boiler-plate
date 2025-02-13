import React, { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import styles from '@/styles/SignUpCss';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform,Dimensions,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from "react-native-toast-message";
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import * as bcrypt from 'react-native-bcrypt';

const { width } = Dimensions.get('window');

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match!" });
      return;
    }

    try {
      console.log('Signing up user:', { name, email });

      // 🔹 Step 1: Sign up in Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({ email, password });

      if (authError) {
        Toast.show({ type: "error", text1: authError.message });
        return;
      }

      if (!data.user) {
        Toast.show({ type: "error", text1: "User data is not available." });
        return;
      }

      const userId = data.user.id;

      // 🔹 Step 2: Hash the password before storing it (security best practice)
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // 🔹 Step 3: Insert user details into the `users` table
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: userId, // Ensure the same ID from auth.users
          full_name: name,
          email: email,
          password: hashedPassword, // Store hashed password
          shop_id: null, // Can be assigned later
        },
      ]);

      if (dbError) {
        Toast.show({ type: "error", text1: "Database Error", text2: dbError.message });
        return;
      }

      alert("Sign up successful!");
      router.push('./LoginScreen');

    } catch (error) {
      console.error("Unexpected Error:", error);
      alert( "An unexpected error occurred.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Toast />
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person-add" size={40} color={Colors.light.tint} />
          </View>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Create an Account</Text>
          <Text style={styles.subtitleText}>Sign up to get started</Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="white" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="white" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Already have an account? */}
          <TouchableOpacity style={styles.loginRedirect} onPress={() => router.push('../LoginScreen')}>
            <Text style={styles.loginRedirectText}>
              Already have an account? <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
