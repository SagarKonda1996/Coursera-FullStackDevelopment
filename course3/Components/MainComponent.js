/* tslint:disable */
import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../Shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const MainComponent = () => {
   
    return (
        <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Dishdetails" component={DishdetailComponent} options={{title:'Dish Details'}} />
      </Stack.Navigator>
    </NavigationContainer>
    )
}

export default MainComponent
