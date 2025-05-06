import Button from '@/components/Button';
import DrawerButton from '@/components/DrawerButton';
import NavGrid from '@/components/NavGrid';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const uploadAnim = useRef(new Animated.Value(300)).current;
  const serviceAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(uploadAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(serviceAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navItems = [
    { 
      label: 'Questions', 
      icon: require('../../../../assets/images/questions.png'),
      onPress: () => router.navigate("/") 
    },
    { 
      label: 'Reminders', 
      icon: require('../../../../assets/images/Reminders.png'),
      onPress: () => router.navigate("/calendar") 
    },
    { 
      label: 'Messages', 
      icon: require('../../../../assets/images/Messages.png'),
      onPress: () => router.navigate('/message') 
    },
    { 
      label: 'Calendar', 
      icon: require('../../../../assets/images/calendar.png'),
      onPress: () => router.navigate('/notes') 
    },
  ];

  const gotoUpload = () => {
    router.navigate("/message");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
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

        <NavGrid items={navItems} />

        <Animated.View style={[styles.uploadSection, { transform: [{ translateX: uploadAnim }] }]}>
          <Text style={styles.uploadTitle}>UPLOAD PRESCRIPTION</Text>
          <Text style={styles.uploadDescription}>
            Upload a Prescription and Tell Us what you Need. We do the Rest!
          </Text>
          <View style={styles.discountRow}>
            <Text style={styles.discountText}>Flat 25% OFF ON MEDICINES</Text>
            <Button title='ORDER NOW' textStyle={styles.orderButtonText} buttonStyle={styles.orderButton} onPress={gotoUpload} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.serviceCard, { transform: [{ translateX: serviceAnim }] }]}>
          <View style={styles.serviceContent}>
            <Text style={styles.serviceTitle}>Get the Best</Text>
            <Text style={styles.serviceSubtitle}>Medical Service</Text>
            <Text style={styles.serviceDescription}>
              Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur.
            </Text>
          </View>
          <View style={styles.serviceImageContainer}>
            <Image source={require("../../../../assets/images/doctor.png")} />
          </View>
        </Animated.View>

        <View style={styles.offerCard}>
          <View style={styles.offerContent}>
            <View style={styles.offerTextContainer}>
              <Text style={styles.upToText}>UPTO</Text>
              <Text style={styles.percentText}>80 %</Text>
              <Text style={styles.offerText}>offer</Text>
              <Text style={styles.onProductsText}>On Health Products</Text>
            </View>
            <Button buttonStyle={styles.shopButton} textStyle={styles.shopButtonText} title='SHOP NOW' />
          </View>
          <View style={styles.vitaminContainer}>
            <Image source={require("../../../../assets/images/pills.png")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    paddingBottom: 80,
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
  uploadSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  uploadDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  discountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    width: '50%',
  },
  orderButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  serviceCard: {
    backgroundColor: '#e3f9e5',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  serviceContent: {
    flex: 3,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  serviceImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerCard: {
    backgroundColor: '#e6e6fa',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
  },
  offerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  offerTextContainer: {
    marginBottom: 15,
  },
  upToText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  percentText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  offerText: {
    fontSize: 18,
    color: '#333',
  },
  onProductsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  shopButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  shopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  vitaminContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vitaminImage: {
    width: 100,
    height: 120,
  },
});

export default Home;
