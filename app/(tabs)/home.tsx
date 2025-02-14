import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

const HomeScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<string | null>(null);

  /*const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ Correct
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }; */

  const handleSubmit = async () => {
    if (!shopName || !location) {
      alert('Please enter all details');
      return;
    }
  
    /*let imageUrl = null;
    if (image) {
      try {
        console.log('Uploading image...');
        const fileName = `${Date.now()}_shop.jpg`;
        const response = await fetch(image);
        const blob = await response.blob();
  
        // Upload with content type
        const { data, error } = await supabase.storage
          .from('shops')
          .upload(fileName, blob, { contentType: 'image/jpeg' });
  
        if (error) throw error;
  
        imageUrl = supabase.storage.from('shops').getPublicUrl(fileName).data.publicUrl;
        console.log('Image uploaded:', imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Image upload failed. Check your network and Supabase settings.');
        return;
      }
    }*/
  
    // Insert into Supabase
    const { data: shop, error: shopError } = await supabase.from('shops').insert([
      { name: shopName, location }
    ]).select().single();
  
    if (shopError) {
      console.error('Shop insert failed:', shopError);
      alert('Failed to add shop');
      return;
    }
  
    alert('Shop added successfully');
    setModalVisible(false);
    setShopName('');
    setLocation('');
    setImage(null);
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Dashboard</Text>
      
      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modal for Adding Shop */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Shop</Text>
            <TextInput style={styles.input} placeholder="Shop Name" value={shopName} onChangeText={setShopName} />
            <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
            
            {/* {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
              <Text style={styles.imageButtonText}>{image ? 'Change Image' : 'Pick Image'}</Text>
            </TouchableOpacity>*/}
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Shop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.tint,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageButtonText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
  cancelText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
