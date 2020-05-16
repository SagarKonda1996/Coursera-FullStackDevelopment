import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import { ListItem } from 'react-native-elements';
import Loading from './LoadingComponent';
import { FlatList } from 'react-native-gesture-handler';
import SwipeOut from 'react-native-swipeout'
import {deleteFavorite} from '../redux/ActionCreators'
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
            onPress:()=>deleteFavorite(item.id)
        }]
        return <SwipeOut right={rightButton} autoClose={true}  >
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        chevron={false}
                        onPress={() => navigation.navigate('Dishdetails', { dishId: item.id })}
                        leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    />
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
