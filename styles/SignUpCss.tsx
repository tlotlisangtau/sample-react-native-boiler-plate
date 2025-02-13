import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    avatarContainer: {
      width: 100,
      height: 100,
      backgroundColor: 'white',
      borderRadius: 50,
      marginBottom: -50,
      zIndex: 1,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#F5F5F5",
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '100%',
      backgroundColor: Colors.light.tint,
      borderRadius: 20,
      padding: 20,
      paddingTop: 60,
    },
    welcomeText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitleText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
    },
    inputContainer: {
      gap: 16,
    },
    picker: {
      flex: 1,
      color: 'white',
      fontSize: 16,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.3)',
      paddingBottom: 8,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      color: 'white',
      fontSize: 16,
      paddingVertical: 8,
    },
    passwordToggle: {
      padding: 4,
    },
    pickerContainer: {
      marginTop: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 10,
    },
    pickerLabel: {
      color: 'white',
      fontSize: 14,
      marginBottom: 5,
    },
    signUpButton: {
      backgroundColor: 'white',
      borderRadius: 30,
      paddingVertical: 14,
      alignItems: 'center',
      marginTop: 16,
    },
    signUpButtonText: {
      color: '#1E88E5',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginRedirect: {
      marginTop: 16,
      alignSelf: 'center',
    },
    loginRedirectText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
    },
  });

