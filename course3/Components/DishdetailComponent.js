import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Card,Icon} from 'react-native-elements'
import {DISHES} from '../shared/dishes'
import {COMMENTS} from '../shared/comments'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
const RenderDish=({dish,favorite,toggleFavorite})=>{
    return dish?
    <Card
    featuredTitle={dish.name}
    image={require('./images/uthappizza.png')}
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
const DishdetailComponent = ({route,navigation}) => {
    const [dishes, setDishes] = useState(DISHES)
    const [comments, setComments] = useState(COMMENTS)
    const [favorites, setFavorites] = useState([])
    const {dishId}=route.params
    const toggleFavorite=(dishId)=>{
        if(favorites.includes(dishId)){
            setFavorites(favorites.filter(item=>item!=dishId))
        }
        else{
            setFavorites([...favorites,dishId])
        }
    }
    
    return (
        <ScrollView>
        <RenderDish 
        dish={dishes.filter(dish=>dish.id==parseInt(dishId))[0]}
        favorite={favorites.filter(item=>item==parseInt(dishId)).length>0}
        toggleFavorite={toggleFavorite}
        
        />
        <RenderComments comments={comments.filter(comment=>comment.dishId==parseInt(dishId))}/>
        </ScrollView>
    )
}

export default DishdetailComponent

const styles = StyleSheet.create({})
