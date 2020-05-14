/* tslint:disable */
import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../Shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const getOptions=(title)=>{
    return {
        title:title,
        headerStyle: {
            backgroundColor: '#2e3192',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
    }
}
const MainComponent = () => {
   
    return (
        <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" >
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={getOptions('Welcome')}
        />
        <Stack.Screen name="Dishdetails" component={DishdetailComponent} options={getOptions('Dish Details')} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainComponent
