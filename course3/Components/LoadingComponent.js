import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#512DA8"/>
            <Text style={styles.loadingText}>Loading ...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    loadingView:{
        alignItems:"center",
        justifyContent:'center',
        flex:1,
    },
    loadingText:{
        color:'#512DA8',
        fontSize:14,
        fontWeight:'bold'
    }

})
