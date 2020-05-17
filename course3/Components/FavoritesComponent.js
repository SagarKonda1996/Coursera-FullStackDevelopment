import React from 'react'
import { StyleSheet, Text, View,Alert } from 'react-native'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import { ListItem } from 'react-native-elements';
import Loading from './LoadingComponent';
import { FlatList } from 'react-native-gesture-handler';
import SwipeOut from 'react-native-swipeout'
import {deleteFavorite} from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'

const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        favorites:state.favorites

    }
}
const mapDispatchToProps=(dispatch)=>({
    deleteFavorite:(dishId)=>dispatch(deleteFavorite(dishId))
})
const FavoritesComponent = (
    {
        dishes,
        favorites=[],
        navigation,
        deleteFavorite    
    }) => {
    
    const RenderMenuItem=({item,index})=>{
        const rightButton=[{
            text:'Delete',
            type:'delete',
            onPress:()=>{
                Alert.alert(
                    'Delete Favorite',
                    'Are you sure you wish to delete the favorite dish '+ item.name +' ? ',
                    [
                        {
                         text:'Cancel',
                         onPress:()=>{},
                         style:'cancel'  
                        },
                        {
                        text:'OK',
                        onPress:()=>deleteFavorite(item.id),
                        }
                    ],
                    {
                        cancelable:false,
                    }
                )
            }
        }]
        return <SwipeOut right={rightButton} autoClose={true}  >
                    <Animatable.View animation="fadeInRightBig" duration={2000} >
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        chevron={false}
                        onPress={()=>navigation.navigate('Dishdetails',{dishId:item.id})}
                        leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    />
                    </Animatable.View>
        </SwipeOut>
    }
    if(dishes.isLoading){
        return <Loading/>
    }
    else if(dishes.errMess){
        return <View>
            <Text>
                {dishes.errMess}
            </Text>
        </View>
    }
    else{
        return <FlatList
        data={dishes.dishes.filter(dish=>favorites.some((favorite)=>favorite==dish.id))}
        renderItem={RenderMenuItem}
        keyExtractor={item=>item.id.toString()}
        />
    }
}

// return (
//     <View>
//         {
//             dishes.dishes.map((dish,index)=>{
//                 if(favorites.includes(dish.id)){
//                 return <RenderMenuItem 
//                         item={dish}
//                         index={index}
//                         />
//                 }
//             })
//         }
//     </View>
// )
export default  connect(mapStateToProps,mapDispatchToProps)(FavoritesComponent)

const styles = StyleSheet.create({})
