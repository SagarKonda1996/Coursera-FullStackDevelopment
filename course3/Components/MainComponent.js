/* tslint:disable */
import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../Shared/dishes.js'
import DishdetailComponent from './DishdetailComponent'
const MainComponent = () => {
    const [dishes, setDishes] = useState(DISHES)
    const [selectedDish, setSelectedDish] = useState(null)
    const onDishSelected=(dishId)=>{
        setSelectedDish(dishId)
    }
    return (
        <>
        <Menu 
        dishes={dishes} 
        onPress={onDishSelected}
        />
        <DishdetailComponent dish={dishes.filter(dish=>dish.id==selectedDish)[0]}/>
        </>
    )
}

export default MainComponent
