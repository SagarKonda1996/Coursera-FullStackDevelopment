import React,{useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import {ListItem} from 'react-native-elements'
import {DISHES} from '../shared/dishes'
const MenuComponent = ({navigation}) => {
    const renderMenuItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            chevron={false}
            leftAvatar={{source:require('./images/uthappizza.png')}}
            onPress={()=>navigation.navigate('Dishdetails',{dishId:item.id})}
            />
        )
    }
    const [dishes, setDishes] = useState(DISHES)
    return (
        <FlatList
        data={dishes}
        renderItem={renderMenuItem}
        keyExtractor={item=>item.id.toString()}
        />
        
    )
}

export default MenuComponent

const styles = StyleSheet.create({})
