import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,Animated,Easing } from 'react-native'
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
  const animatedValue=new Animated.Value(0)
  const animate=()=>{
      animatedValue.setValue(0)
      Animated.timing(
          animatedValue,{
              toValue:8,
              duration:8000,
              easing:Easing.linear
          }
      ).start(()=>animate())
  }  
  useEffect(() => {
        animate()
    }, [])
    const xpos1=animatedValue.interpolate({
        inputRange:[0,1,3,5,8],
        outputRange:[1200,600,0,-600,-1200]
    })
    const xpos2=animatedValue.interpolate({
        inputRange:[0,2,4,6,8],
        outputRange:[1200,600,0,-600,-1200]
    })
    const xpos3=animatedValue.interpolate({
        inputRange:[0,3,5,7,8],
        outputRange:[1200,600,0,-600,-1200]
    })
    return (
        <View style={styles.viewRow}>
            <Animated.View style={{width:'100%',transform:[{translateX:xpos1}]}}>            
                <RenderItem 
                item={dishes.dishes.filter((dish) => dish.featured)[0]} 
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}    
                />
            </Animated.View>
            <Animated.View style={{width:'100%',transform:[{translateX:xpos2}]}}>
                <RenderItem 
                item={promotions.promotions.filter((promo) => promo.featured)[0]}
                isLoading={promotions.isLoading}
                errMess={promotions.errMess}
                />
            </Animated.View>
            <Animated.View style={{width:'100%',transform:[{translateX:xpos3}]}}>            
                <RenderItem 
                item={leaders.leaders.filter((leader) => leader.featured)[0]} 
                isLoading={leaders.isLoading}
                errMess={leaders.errMess}
                />
            </Animated.View>
        </View>
    )
}

export default connect(mapStateToProps)(HomeComponent)

const styles = StyleSheet.create({
viewRow:{
    display:'flex',
    justifyContent:'center',
    flex:1,
    flexDirection:'row',
}

})
