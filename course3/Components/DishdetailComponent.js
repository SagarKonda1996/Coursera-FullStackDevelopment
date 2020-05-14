import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Card} from 'react-native-elements'
import {DISHES} from '../Shared/dishes'

const RenderDish=({dish})=>{
    return dish?
    <Card
    featuredTitle={dish.name}
    image={require('./images/uthappizza.png')}
    >
        <Text style={{margin:10}}>
            {dish.description}
        </Text>

    </Card>:
    <View></View>
}
const DishdetailComponent = ({route,navigation}) => {
    const [dishes, setDishes] = useState(DISHES)
    const {dishId}=route.params
    
    return (
        <RenderDish dish={dishes[+dishId]}/>
    )
}

export default DishdetailComponent

const styles = StyleSheet.create({})
