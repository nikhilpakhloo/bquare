import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Loader() {

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/Loader.png")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
