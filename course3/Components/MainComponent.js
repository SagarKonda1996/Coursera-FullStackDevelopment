/* tslint:disable */
import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import HomeComponent from './HomeComponent'

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();

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


const DishMenu=()=>{
    return <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={getOptions('Menu')}/>
        <Stack.Screen name="Dishdetails" component={DishdetailComponent} options={getOptions('Dish Details')}/>
    </Stack.Navigator>
}
const HomeNavigator=()=>{
    return <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeComponent} options={getOptions('Home')}/>
        </Stack.Navigator>
}

const MainComponent = () => {
   
    return (
       <Drawer.Navigator>
           <Drawer.Screen   name="Home" component={HomeNavigator}/>
           <Drawer.Screen name="Menu" component={DishMenu}/>

       </Drawer.Navigator>

    )
}

export default MainComponent
