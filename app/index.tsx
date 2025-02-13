import SampleScreen from "@/screens/Sample/SampleScreen";
import SplashScreenComponent from '@/app/(auth)/SplashScreen';
import LoginScreen from '@/app/(auth)/LoginScreen';
import React, { useState } from 'react';
import { View } from 'react-native';
import Toast from "react-native-toast-message";

export default function HomeScreen() {
  const [isSplashComplete, setIsSplashComplete] = React.useState(false);

  const handleAnimationComplete = () => {
    setIsSplashComplete(true);
  };

  return (
    <>  
    <View style={{ flex: 1 }}>
      {!isSplashComplete && (
        <SplashScreenComponent onAnimationComplete={handleAnimationComplete} />
      )}
      {isSplashComplete && <LoginScreen />}
    </View>
    
    </>
  );
}

