/* tslint:disable */
import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator  } from '@react-navigation/drawer';
import HomeComponent from './HomeComponent'
import AboutComponent from './AboutComponent'
import ContactComponent from './ContactComponent'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();

const getOptions=(title,navigation)=>{
    return {
        title:title,
        headerStyle: {
            backgroundColor: '#2e3192',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft:()=>
          <Icon 
          name="menu" 
          size={24} 
          color="white" 
          onPress={()=>navigation.toggleDrawer()}/>
          
    }
}


const MenuNavigator=({navigation})=>{
    return <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} options={getOptions('Menu',navigation)}/>
        <Stack.Screen name="Dishdetails" component={DishdetailComponent} options={getOptions('Dish Details')}/>
    </Stack.Navigator>
}
const HomeNavigator=({navigation})=>{
    return <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={HomeComponent} 
            options={getOptions('Home',navigation)} />
        </Stack.Navigator>
}
const AboutNavigator=({navigation})=>{
    return  <Stack.Navigator>
            <Stack.Screen name="Home" component={AboutComponent} options={getOptions('About Us',navigation)}/>
        </Stack.Navigator>
}
const ContactNavigator=({navigation})=>{
    return  <Stack.Navigator>
            <Stack.Screen name="Home" component={ContactComponent} options={getOptions('Contact Us',navigation)}/>
        </Stack.Navigator>
}


const MainNavigator = ()=>{
    return  <Drawer.Navigator>
    <Drawer.Screen   name="Home" component={HomeNavigator} options={{drawerIcon:()=><Icon name="home" size={24} color="#2e3192"/>}}/>
    <Drawer.Screen name="About Us" component={AboutNavigator} options={{drawerIcon:()=><Icon name="info-circle" type="font-awesome" size={24} color="#2e3192"/>}}/>
    <Drawer.Screen name="Menu" component={MenuNavigator} options={{drawerIcon:()=><Icon name="menu" size={24} color="#2e3192"/>}}/>
    <Drawer.Screen name="Contact Us" component={ContactNavigator} options={{drawerIcon:()=><Icon name="address-card" type="font-awesome" size={24} color="#2e3192"/>}}/>

</Drawer.Navigator>
}
const MainComponent = () => {
   
    return (
        <NavigationContainer>
      <MainNavigator/>
      </NavigationContainer>

    )
}

export default MainComponent
