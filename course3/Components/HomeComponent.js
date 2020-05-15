import React,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import Loading from './LoadingComponent';
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        leaders:state.leaders,
        promotions:state.promotions
    }
}
const RenderItem = ({ item, isLoading, errMess }) => {
    if (isLoading) {
        return <Loading />
    }
    else if (errMess) {
        return <Text>{errMess}</Text>
    }
    else {
        return item ? 
        <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl + item.image }}>
            <Text
                style={{ margin: 10 }}>
                {item.description}</Text>
        </Card> :
        <View>
        </View>
    }
}
const HomeComponent = ({dishes,leaders,promotions}) => {
  
    return (
        <ScrollView>
            <RenderItem 
            item={dishes.dishes.filter((dish) => dish.featured)[0]} 
            isLoading={dishes.isLoading}
            errMess={dishes.errMess}
            
            />
            <RenderItem 
            item={promotions.promotions.filter((promo) => promo.featured)[0]}
            isLoading={promotions.isLoading}
            errMess={promotions.errMess}
            />
            <RenderItem 
            item={leaders.leaders.filter((leader) => leader.featured)[0]} 
            isLoading={leaders.isLoading}
            errMess={leaders.errMess}
            />
        </ScrollView>
    )
}

export default connect(mapStateToProps)(HomeComponent)

const styles = StyleSheet.create({})
