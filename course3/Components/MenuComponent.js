import React,{useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import {ListItem,Tile} from 'react-native-elements'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
      
    }
}

const MenuComponent = ({navigation,dishes}) => {
    const renderMenuItem=({item,index})=>{
        return(
            <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured={true}
            imageSrc={{uri:baseUrl+item.image}}
            onPress={()=>navigation.navigate('Dishdetails',{dishId:item.id})}
            />
        )
    }
    return (
        <FlatList
        data={dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item=>item.id.toString()}
        />
        
    )
}

export default connect(mapStateToProps)(MenuComponent)

const styles = StyleSheet.create({})
