import React,{useState} from 'react'
import { StyleSheet, Text, View,FlatList } from 'react-native'
import {ListItem,Tile} from 'react-native-elements'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable'

const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
      
    }
}

const MenuComponent = ({navigation,dishes}) => {
    const renderMenuItem=({item,index})=>{
        return(
            <Animatable.View animation="fadeInRightBig" duration={3000} >
            <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured={true}
            imageSrc={{uri:baseUrl+item.image}}
            onPress={()=>navigation.navigate('Dishdetails',{dishId:item.id})}
            />
            </Animatable.View>
        )
    }
    if(dishes.isLoading){
        return <Loading/>
    }
    else if(dishes.errMess){
        return <View>
            <Text>{dishes.errMess}</Text>
        </View>
    }
    else{
        return (
            <FlatList
            data={dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item=>item.id.toString()}
            />
            
        )
    }
    
}

export default connect(mapStateToProps)(MenuComponent)

const styles = StyleSheet.create({})
