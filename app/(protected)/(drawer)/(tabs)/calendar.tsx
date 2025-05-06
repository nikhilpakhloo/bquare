import DrawerButton from '@/components/DrawerButton';
import { useUploadStore } from '@/store/useCloudStore';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function Calendar() {
  const uploadedUrl = useUploadStore((state) => state.uploadedUrl);
  console.log(uploadedUrl);

  const isPDF = (url) => {
    return url && url.toLowerCase().includes('.pdf');
  };

  const isImage = (url) => {
    return (
      url &&
      (url.endsWith('.jpeg') ||
        url.endsWith('.jpg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif'))
    );
  };

  // Reference to the animated value
  const translateX = useRef(new Animated.Value(500)).current; // Start from the right side of the screen

  useEffect(() => {
    // Animate the component from the right to its normal position
    Animated.timing(translateX, {
      toValue: 0, // Move to the left (normal position)
      duration: 800, // Duration of the animation
      useNativeDriver: true,
    }).start();
  }, [translateX]);

  return (
    <SafeAreaView style={styles.container}>
         <View style={styles.header}>
                <View style={styles.hamburger}>
                  <DrawerButton />
                  <Image source={require("../../../../assets/images/Rectangle.png")} />
                </View>
                <TouchableOpacity style={styles.micButton}>
                  <View style={styles.micCircle}>
                    <Image source={require("../../../../assets/images/mic_logo.png")} style={styles.micIcon} />
                  </View>
                </TouchableOpacity>
              </View>
      <View style={styles.content}>
        {uploadedUrl ? (
          <>
            {isPDF(uploadedUrl) ? (
              <Animated.View
                style={[styles.pdfContainer, { transform: [{ translateX }] }]}>
                    {/* <Pdf
                      source={{ uri: uploadedUrl, cache: true }}
                      style={styles.pdfViewer}
                    /> */}
              </Animated.View>
            ) : isImage(uploadedUrl) ? (
              <Animated.View
                style={[styles.imageContainer, { transform: [{ translateX }] }]}>
                <Image
                  source={{ uri: uploadedUrl }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
                <Text style={styles.imageText}>Uploaded Image</Text>
              </Animated.View>
            ) : (
              <Text style={styles.noImageText}>Unsupported file type</Text>
            )}
          </>
        ) : (
          <Text style={styles.noImageText}>No file uploaded yet</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    width: '100%',
    maxWidth: 350,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  noImageText: {
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
  pdfContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 350,
  },
  pdfViewer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  hamburger: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  micButton: {
    width: 40,
    height: 40,
  },
  micCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  micIcon: {
    width: 15,
    height: 20,
  },
});
