import React,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        leaders:state.leaders,
        promotions:state.promotions
    }
}
const  RenderItem=({item})=>{
    return  item? <Card
    featuredTitle={item.name}
    featuredSubtitle={item.designation}
    image={{uri:baseUrl+item.image}}>
    <Text
        style={{margin: 10}}>
        {item.description}</Text>
</Card>:
<View></View>

}
const HomeComponent = ({dishes,leaders,promotions}) => {
  
    return (
        <ScrollView>
        <RenderItem item={dishes.dishes.filter((dish) => dish.featured)[0]} />
        <RenderItem item={promotions.promotions.filter((promo) => promo.featured)[0]} />
        <RenderItem item={leaders.leaders.filter((leader) => leader.featured)[0]} />
    </ScrollView>
    )
}

export default connect(mapStateToProps)(HomeComponent)

const styles = StyleSheet.create({})
