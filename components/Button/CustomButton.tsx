import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '@/styles/CustomButtonCss';
import { Colors } from '@/constants/Colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, backgroundColor = 'white', textColor = Colors.light.tint }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: Colors.light.tint }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
