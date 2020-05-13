import React from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import {ListItem} from 'react-native-elements'
const MenuComponent = ({dishes=[]}) => {
    const renderMenuItem=({item,index})=>{
        return(
            <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            chevron={false}
            leftAvatar={{source:require('./images/uthappizza.png')}}
            />
        )
    }
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
