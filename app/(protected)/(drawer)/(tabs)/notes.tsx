import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';



export default function TabTwoScreen() {
  const authContext = useContext(AuthContext);
  return (
   <View style={{
    flex : 1,
    justifyContent : 'center',
    alignItems :'center'
   }}>

    <Pressable onPress={authContext.logOut}>
      <Text>
        Logout
      </Text>
    </Pressable>
   </View>
  );
}

const styles = StyleSheet.create({
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
});
