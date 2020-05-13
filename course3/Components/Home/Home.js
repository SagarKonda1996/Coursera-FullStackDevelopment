import React from 'react'
import { View, Text } from 'react-native'

const Home = ({username=''}) => {
    return (
        <View>
            <Text>{username} </Text>
        </View>
    )
}

export default Home
