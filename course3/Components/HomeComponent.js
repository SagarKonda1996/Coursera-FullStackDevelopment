import React,{useState} from 'react'
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders'

const  RenderItem=({item})=>{
    return  item? <Card
    featuredTitle={item.name}
    featuredSubtitle={item.designation}
    image={require('./images/uthappizza.png')}>
    <Text
        style={{margin: 10}}>
        {item.description}</Text>
</Card>:
<View></View>

}
const HomeComponent = () => {
    const [dishes, setDishes] = useState(DISHES)
    const [promotions, setPromotions] = useState(PROMOTIONS)
    const [leaders, setLeaders] = useState(LEADERS)
    return (
        <ScrollView>
        <RenderItem item={dishes.filter((dish) => dish.featured)[0]} />
        <RenderItem item={promotions.filter((promo) => promo.featured)[0]} />
        <RenderItem item={leaders.filter((leader) => leader.featured)[0]} />
    </ScrollView>
    )
}

export default HomeComponent

const styles = StyleSheet.create({})
