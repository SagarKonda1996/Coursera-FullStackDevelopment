import React,{useState} from 'react'
import { View, Text } from 'react-native'
import Menu from './MenuComponent'
import {DISHES} from '../Shared/dishes.js'
const MainComponent = () => {
    const [dishes, setDishes] = useState(DISHES)
    return (
        <Menu dishes={dishes}/>
    )
}

export default MainComponent
