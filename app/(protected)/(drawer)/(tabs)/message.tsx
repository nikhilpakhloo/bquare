import Button from '@/components/Button';
import { useUploadStore } from '@/store/useCloudStore';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PharmacyFinder = () => {
  const [fileInfo, setFileInfo] = useState<{ name: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [linkInput, setLinkInput] = useState<string>(''); 
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false); 
  const [uploadedUrl, setUploadedUrl] = useState<string>(''); 
  const setUploadedUrlInStore = useUploadStore(state => state.setUploadedUrl); 

  const handleFileUpload = async () => {
    try {
      setIsLinkInputVisible(false);

      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
        copyToCacheDirectory: true,
      });

      if (res.canceled || !res.assets?.[0]) return;

      const file = res.assets[0];
      setFileInfo({ name: file.name });

      setIsUploading(true);
      const url = await uploadToCloudinary(file.uri, file.mimeType || 'application/pdf', file.name);
      setUploadedUrl(url);
      setUploadedUrlInStore(url); 

      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'File Uploaded!',
        text2: 'Your file has been successfully uploaded.',
      });
    } catch (err) {
      console.error('Upload failed', err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Upload Failed',
        text2: 'There was an error uploading the file.',
      });
    } finally {
      setIsUploading(false); // Reset loading state
    }
  };

  const handleUploadLink = () => {
    if (!linkInput) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Link Required',
        text2: 'Please provide a valid link.',
      });
      return;
    }

    setUploadedUrl(linkInput);
    setUploadedUrlInStore(linkInput);  // Save the link in the store
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Link Uploaded!',
      text2: 'The provided link has been successfully uploaded.',
    });

    setLinkInput('');
    setIsLinkInputVisible(false); // Hide the link input after submitting
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.pinText}>📍</Text>
            <Text style={styles.locationText}>Mohali</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Pharmacy Nearby</Text>

        {/* Pharmacy Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {[{ title: 'Path lab pharmacy', image: require('../../../../assets/images/image1.png') },
          { title: '24 pharmacy', image: require('../../../../assets/images/image2.png') }].map((item, idx) => (
            <View style={styles.card} key={idx}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDistance}>5km Away</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.starIcon}>★</Text>
                  <Text style={styles.rating}>4.5 (120 reviews)</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.uploadTitle}>Upload Prescription</Text>
          <Text style={styles.uploadSubtitle}>
            We will show the pharmacy that fits as per your prescription.
          </Text>

          <View style={styles.uploadBox}>
            <TouchableOpacity style={styles.uploadOption} onPress={() => setIsLinkInputVisible(true)}>
              <Image source={require('../../../../assets/images/uploadlink.png')} />
              <Text style={styles.uploadOptionText}>Upload Link</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.uploadOption} onPress={handleFileUpload}>
              <View style={styles.uploadIconContainer}>
                <Image source={require('../../../../assets/images/uploadfile.png')} />
                <View style={styles.uploadUnderline} />
              </View>
              <Text style={styles.uploadOptionText}>Upload File</Text>
            </TouchableOpacity>
          </View>

          {/* Conditional rendering for Link input */}
          {isLinkInputVisible && (
            <View style={styles.linkInputContainer}>
              <TextInput
                style={styles.linkInput}
                placeholder="Enter the link here"
                value={linkInput}
                onChangeText={setLinkInput}
              />
              <TouchableOpacity style={styles.submitLinkButton} onPress={handleUploadLink}>
                <Text style={styles.submitLinkText}>Submit Link</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Show file info if file is selected but not uploaded */}
          {fileInfo && !uploadedUrl && (
            <Text style={styles.uploadedFileText}>✔ 1 file added: {fileInfo.name}</Text>
          )}
        </View>

        {/* Button */}
        <View style={styles.buttonWrapper}>
          <Button
            title="Continue"
            loading={isUploading}
            disabled={isUploading || !uploadedUrl}
          />
        </View>
      </ScrollView>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingBottom: 40},
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  backButton: { padding: 5 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginLeft: 15 },
  pinText: { fontSize: 16 },
  locationText: { fontSize: 16, fontWeight: '600', marginLeft: 5, color: '#333' },
  title: { fontSize: 24, fontWeight: '700', marginHorizontal: 20, marginTop: 10, color: '#222' },
  cardsContainer: { paddingHorizontal: 20, paddingTop: 10 },
  card: { width: 180, borderRadius: 12, backgroundColor: '#FFF', marginRight: 15, overflow: 'hidden', elevation: 3 },
  cardImage: { width: '100%', height: 110 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#111' },
  cardDistance: { fontSize: 14, color: '#777', marginTop: 3 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  starIcon: { fontSize: 16, color: '#FFD700' },
  rating: { fontSize: 14, color: '#666', marginLeft: 5 },
  uploadSection: { marginTop: 30, paddingHorizontal: 20 },
  uploadTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center', color: '#222' },
  uploadSubtitle: { fontSize: 14, color: '#777', textAlign: 'center', marginTop: 8, marginBottom: 20, paddingHorizontal: 20 },
  uploadBox: { flexDirection: 'row', borderWidth: 1, borderColor: '#EEE', borderRadius: 15, height: 150, backgroundColor: '#FAFAFA' },
  uploadOption: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  uploadIconContainer: { alignItems: 'center' },
  uploadUnderline: { height: 2, width: 30, backgroundColor: '#20B2AA', marginTop: 2 },
  uploadOptionText: { fontSize: 16, marginTop: 10, color: '#333' },
  divider: { width: 1, backgroundColor: '#DDD' },
  uploadedFileText: { textAlign: 'center', marginTop: 12, color: '#228B22', fontSize: 14, fontWeight: '600' },
  buttonWrapper: { marginHorizontal: 20, marginTop: 10, marginBottom: 30 },
  linkInputContainer: { marginTop: 20, alignItems: 'center' },
  linkInput: { height: 40, width: '80%', borderColor: '#DDDDDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10 },
  submitLinkButton: { marginTop: 10, backgroundColor: '#20B2AA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  submitLinkText: { color: '#FFF', fontWeight: '600' },
});

export default PharmacyFinder;
