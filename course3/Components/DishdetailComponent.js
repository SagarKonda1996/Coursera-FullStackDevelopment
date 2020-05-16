import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Card,Icon,Rating,Input,Button} from 'react-native-elements'
import { ScrollView, FlatList } from 'react-native-gesture-handler'
import { connect } from "react-redux";
import {baseUrl} from '../shared/baseUrl'
import {postFavorite,postComment,deleteFavorite} from '../redux/ActionCreators'
import { Modal } from 'react-native';
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        favorites:state.favorites
    }
}
const mapDispatchToProps=(dispatch)=>({
    postFavorite:(dishId)=>dispatch(postFavorite(dishId)),
    postComment:(dishId,rating,author,comment)=>dispatch(postComment(dishId,rating,author,comment)),
    deleteFavorite:(dishId)=>dispatch(deleteFavorite(dishId))
})

const CommentForm=({dishId,postComment})=>{
    const [userInput, setUserInput] = useState({
        rating:'',
        author:'',
        comment:'',
        showModal:false
    })
    const handleChange=(key,value)=>{
        setUserInput ({...userInput,[key]:value})
    }
    const resetForm=()=>{
        setUserInput({
            rating:0,
            author:'',
            comment:'',
            showModal:false 
        })
    }
    const SubmitForm=()=>{
        const {rating,author,comment,showModal}=userInput
        postComment(dishId,rating,author,comment)
        resetForm()
    }
    return <>
            <Icon 
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            raised
            reverse
            onPress={()=>handleChange('showModal',true)}
            />
            <Modal
            animationType='fade'
            transparent={false}
            visible={userInput.showModal}
            onDismiss={resetForm}
            onRequestClose={resetForm}
            >

                <View style={styles.modal}>
                <Rating
                showRating
                startingValue={userInput.rating}
                onFinishRating={(rating)=>handleChange('rating',rating)}                
                />
                <Input
                placeholder='Author'
                value={userInput.author}
                onChangeText={(value)=>handleChange('author',value)}
                leftIcon={
                    <Icon
                    name="user-o"
                    type="font-awesome"
                    />
                }
                />
                <Input
                placeholder='Comment'
                value={userInput.comment}
                onChangeText={(value)=>handleChange('comment',value)}
                leftIcon={
                    <Icon
                    name="comment-o"
                    type="font-awesome"
                    />
                }
                />

                <Button
                title="Submit"
                onPress={SubmitForm}
                buttonStyle={styles.submitButton}
                />
                <Button
                title="Cancel"
                buttonStyle={styles.cancelButton}
                onPress={resetForm}
                />
                </View>
                

            </Modal>
        </>
}

const RenderDish=({dish,favorite,toggleFavorite,postComment})=>{
    return dish?
    <Card
    featuredTitle={dish.name}
    image={{uri:baseUrl+dish.image}}
    >
        <Text style={{margin:10}}>
            {dish.description}
        </Text>
        <View style={styles.dishActions}>
        <Icon 
        name={favorite?'heart':'heart-o'} 
        raised 
        reverse 
        type="font-awesome"
        color="#f50"
        onPress={()=>toggleFavorite(dish.id)}
        />
        <CommentForm 
        dishId={dish.id}
        postComment={postComment}
        />
        </View>
        
        
    </Card>:
    <View></View>
}

const RenderComments=({comments=[]})=>{
    const RenderCommentItem=({item,index})=>{
        return <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        {/* <Text style={{fontSize: 12}}>{item.rating} Stars</Text> */}
        <Rating
        readonly
        startingValue={item.rating}
        imageSize={12}
        style={{disply:'flex',alignItems:'flex-start'}}
        />
        <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
    </View>
    }

    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={RenderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}
const DishdetailComponent = (
    {
        route,
        navigation,
        dishes,
        comments,
        postFavorite,
        favorites,
        postComment,
        deleteFavorite
    }) => {
   
    const {dishId}=route.params
    const toggleFavorite=(dishId)=>{
        if(favorites.filter(item=>item==parseInt(dishId)).length==0)
        postFavorite(dishId)
        else
        deleteFavorite(dishId)
    }
    
    return (
        <ScrollView>
        <RenderDish 
        dish={dishes.dishes.filter(dish=>dish.id==parseInt(dishId))[0]}
        favorite={favorites.filter(item=>item==parseInt(dishId)).length>0}
        toggleFavorite={toggleFavorite}
        postComment={postComment}
        
        />
        <RenderComments 
        comments={comments.comments.filter(comment=>comment.dishId==parseInt(dishId))}
        />
        </ScrollView>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(DishdetailComponent)

const styles = StyleSheet.create({
    dishActions:{
        display:"flex",
        justifyContent:"center",
        flex:1,
        flexDirection:'row',
        alignItems:"center"
        },
        formRow:{
            alignItems:"center",
            justifyContent:'center',
            flex:1,
            flexDirection:'row',
            margin:20
        },
        formLabel:{
            fontSize:18,
            flex:2
        },
        formItem:{
            flex:1
        },
        modal:{
            justifyContent:"center",
            margin:20
        },
        submitButton:{
            marginBottom:10,
            backgroundColor:'#512DA8'
        },
        cancelButton:{
            backgroundColor:'grey'
        }


})
