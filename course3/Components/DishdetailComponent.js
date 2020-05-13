import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Card} from 'react-native-elements'
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
const DishdetailComponent = ({dish}) => {
    return (
        <RenderDish dish={dish}/>
    )
}

export default DishdetailComponent

const styles = StyleSheet.create({})
