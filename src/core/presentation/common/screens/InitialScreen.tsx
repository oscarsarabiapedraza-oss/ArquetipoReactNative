import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const InitialScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arquetipo React Native 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex:1, alignItems:'center', justifyContent:'center', padding:16},
  title: {fontSize:20, fontWeight:'600'}
});

export default InitialScreen;

