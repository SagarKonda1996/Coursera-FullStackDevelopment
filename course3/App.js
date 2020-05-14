import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainComponent from './Components/MainComponent'

export default function App() {
  return (
    <MainComponent/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
