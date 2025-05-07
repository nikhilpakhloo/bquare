import DrawerButton from '@/components/DrawerButton';
import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function TabTwoScreen() {
  const authContext = useContext(AuthContext);
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
    

  
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
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
  hamburger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
