import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';

const { width } = Dimensions.get('window');

interface SplashScreenComponentProps {
  onAnimationComplete: () => void;
}

const SplashScreenComponent: React.FC<SplashScreenComponentProps> = ({ onAnimationComplete }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Prevent auto-hiding of splash screen
    SplashScreen.preventAutoHideAsync();
    
    // Start animation sequence
    Animated.sequence([
      // Fade in and scale up
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Hold for a moment
      Animated.delay(1000),
    ]).start(async () => {
      await SplashScreen.hideAsync();
      onAnimationComplete();
    });
  }, []);

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            {/* Replace with your actual logo */}
            <Text style={styles.logoText}>POS</Text>
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>ModernPOS</Text>
        
        {/* Tagline */}
        <Text style={styles.tagline}>Your Business, Simplified</Text>
      </Animated.View>
    </View>
  );
};
export default SplashScreenComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#1E88E5',
    opacity: 0.8,
  },
});
