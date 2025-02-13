import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '@/components/Button/CustomButton';

const ProfileScreen = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
  
    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
  
    if (authError || !user) {
      console.error("Authenticated user error:", authError);
      alert('Error fetching authenticated user');
      setLoading(false);
      return;
    }
  
    console.log("Authenticated user:", user); // Log the user data to check if it's returned properly
  
    // Query the 'users' table for data corresponding to the authenticated user
    const { data, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)  // Using the authenticated user's ID
      .single(); // Assuming only one profile per user
  
    if (userError) {
      console.error("User fetch error:", userError);
      alert('Error fetching profile details');
      setLoading(false);
      return;
    }
  
    // Set the user data in state
    setName(data.full_name || '');  // 'full_name' field in your schema
    setEmail(data.email || '');      // 'email' field in your schema
    setLoading(false);
  };
  

  const handleSaveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('User not authenticated');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ name, email, language, currency, dark_mode: isDarkMode })
      .eq('id', user.id);

    if (error) {
      alert('Error updating profile');
    } else {
      alert('Profile updated successfully!');
      setIsEditing(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('../login');
    } else {
      alert("Logout Failed");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }]}>
      {/* Profile Icon */}
      <Ionicons name="person-circle-outline" size={100} color={Colors.light.tint} />

      {/* Editable Fields */}
      {isEditing ? (
        <>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full Name" />
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" />
          <CustomButton title="Save Changes" onPress={handleSaveProfile} style={styles.saveButton} textColor="white" />
        </>
      ) : (
        <>
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <CustomButton title="Edit Profile" onPress={() => setIsEditing(true)} style={styles.editButton} textColor="white" />
        </>
      )}

      {/* Language Selection */}
      <View style={styles.optionRow}>
        <Ionicons name="globe-outline" size={20} color={Colors.light.tint} />
        <Text style={styles.optionText}>Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="French" value="fr" />
          <Picker.Item label="Spanish" value="es" />
        </Picker>
      </View>

      {/* Currency Selection */}
      <View style={styles.optionRow}>
        <Ionicons name="cash-outline" size={20} color={Colors.light.tint} />
        <Text style={styles.optionText}>Currency</Text>
        <Picker
          selectedValue={currency}
          style={styles.picker}
          onValueChange={(itemValue) => setCurrency(itemValue)}
        >
          <Picker.Item label="USD ($)" value="USD" />
          <Picker.Item label="EUR (€)" value="EUR" />
          <Picker.Item label="GBP (£)" value="GBP" />
        </Picker>
      </View>

      <View style={styles.optionRow}>
        <Ionicons name="notifications-outline" size={20} color={Colors.light.tint} />
        <Text style={styles.optionText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? Colors.light.tint : "#ccc"}
        />
      </View>

      {/* Theme Toggle */}
      <View style={styles.optionRow}>
        <Ionicons name={isDarkMode ? "moon-outline" : "sunny-outline"} size={20} color={Colors.light.tint} />
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? Colors.dark.tint : "#ccc"}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#687076',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tint,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.tint,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f3faf9',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.light.tint,
    flex: 1,
  },
  picker: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
