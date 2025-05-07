import DrawerButton from '@/components/DrawerButton';
import { useUploadStore } from '@/store/useCloudStore';
import React, { useLayoutEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

export default function Calendar() {
  const uploadedUrl = useUploadStore((state) => state.uploadedUrl);

  const isPDF = (url: string) => {
    return url && url.toLowerCase().includes('.pdf');
  };

  const isImage = (url: string) => {
    return (
      url &&
      (url.endsWith('.jpeg') ||
        url.endsWith('.jpg') ||
        url.endsWith('.png') ||
        url.endsWith('.gif'))
    );
  };

  const translateX = useRef(new Animated.Value(screenWidth)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.hamburger}>
          <DrawerButton />
          <Image source={require('../../../../assets/images/Rectangle.png')} />
        </View>
        <TouchableOpacity style={styles.micButton}>
          <View style={styles.micCircle}>
            <Image
              source={require('../../../../assets/images/mic_logo.png')}
              style={styles.micIcon}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {uploadedUrl ? (
          <>
            {isPDF(uploadedUrl) ? (
              <Animated.View
                style={[styles.pdfContainer, { transform: [{ translateX }], opacity }]}>
                <Pdf
                  source={{ uri: uploadedUrl, cache: true }}  // Use uploaded URL for the PDF
                  style={styles.pdfViewer}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                />
                <Text style={styles.imageText}>Uploaded PDF</Text>
              </Animated.View>
            ) : isImage(uploadedUrl) ? (
              <Animated.View
                style={[styles.imageContainer, { transform: [{ translateX }], opacity }]}>
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
  content: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
  },
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  pdfViewer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  hamburger: {
    flexDirection: 'row',
    alignItems: 'center',
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
