import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Card,Icon} from 'react-native-elements'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import {postFavorite} from '../redux/ActionCreators'
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        favorites:state.favorites
    }
}
const mapDispatchToProps=(dispatch)=>({
    postFavorite:(dishId)=>dispatch(postFavorite(dishId))
})
const RenderDish=({dish,favorite,toggleFavorite})=>{
    return dish?
    <Card
    featuredTitle={dish.name}
    image={{uri:baseUrl+dish.image}}
    >
        <Text style={{margin:10}}>
            {dish.description}
        </Text>
        <Icon 
        name={favorite?'heart':'heart-o'} 
        raised 
        reverse 
        type="font-awesome"
        color="#f50"
        onPress={()=>toggleFavorite(dish.id)}
        />
    </Card>:
    <View></View>
}

const RenderComments=({comments=[]})=>{
    const RenderCommentItem=({item,index})=>{
        return <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
        <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
    </View>
    }

    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={RenderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
const DishdetailComponent = ({route,navigation,dishes,comments,postFavorite,favorites}) => {
   
    const {dishId}=route.params
    const toggleFavorite=(dishId)=>{
        postFavorite(dishId)
    }
    
    return (
        <ScrollView>
        <RenderDish 
        dish={dishes.dishes.filter(dish=>dish.id==parseInt(dishId))[0]}
        favorite={favorites.filter(item=>item==parseInt(dishId)).length>0}
        toggleFavorite={toggleFavorite}
        
        />
        <RenderComments comments={comments.comments.filter(comment=>comment.dishId==parseInt(dishId))}/>
        </ScrollView>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DishdetailComponent)

const styles = StyleSheet.create({})
