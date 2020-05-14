/* tslint:disable */
import React,{useState} from 'react'
import { View, Text,StyleSheet,Image } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerItem,DrawerItemList  } from '@react-navigation/drawer';
import HomeComponent from './HomeComponent'
import AboutComponent from './AboutComponent'
import ContactComponent from './ContactComponent'
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();
const getOptions = (title, navigation,headerLeftRequired=true) => {
    const options={title: title,
        headerStyle: {
            backgroundColor: '#2e3192',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }}
    return headerLeftRequired? {
        ...options,
        headerLeft: () =>
            <View style={{ paddingLeft: 16 }}>
                <Icon
                    name={"menu"}
                    size={24}
                    color="white"
                    onPress={() =>navigation.toggleDrawer()} />

            </View>
    }:
    options
}

const CustomerDrawer=(props)=>{
    return <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
}

const MenuNavigator=({navigation})=>{
    return <Stack.Navigator initialRouteName="Menu" >
        <Stack.Screen name="Menu" component={Menu} options={getOptions('Menu',navigation)}/>
        <Stack.Screen name="Dishdetails" component={DishdetailComponent} 
        options={getOptions('Dish Details',navigation,false)}/>
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
    return  <Drawer.Navigator drawerContent={props=><CustomerDrawer {...props}/>}>
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  