import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainComponent from './Components/MainComponent'
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
const store=ConfigureStore()
export default function App() {
  return (
    <Provider store={store}>
      <MainComponent/>
    </Provider>
    
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
