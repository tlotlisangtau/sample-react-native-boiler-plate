import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import styles from '@/styles/CustomButtonCss';
import { Colors } from '@/constants/Colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, backgroundColor = 'white', style, textColor=Colors.light.tint }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};


export default CustomButton;
