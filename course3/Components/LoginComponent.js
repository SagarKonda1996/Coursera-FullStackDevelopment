import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {Card,Icon,Input,CheckBox} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
const Login = () => {
    const [userInput, setUserInput] = useState({
        username:'',
        password:'',
        remember:false
    })
    useEffect(() => {
        SecureStore.getItemAsync('userinfo')
        .then((userdata)=>{
            let userinfo=JSON.parse(userdata)
            console.log(userinfo)

            if(userinfo){
                setUserInput({
                    username:userinfo.username,
                    password:userinfo.password,
                    remember:true
                })
            }
        })
    }, [])
    const handleChange=(key,value)=>{
        setUserInput({...userInput,[key]:value})
    }
    const handleLogin=()=>{
        if(userInput.remember){
            console.log(JSON.stringify(userInput))
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify(userInput)
                )
                .catch((error)=>{
                    console.log('Could Not Save User Info')
                })
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch(error=>console.log('Could Not Delete User Info'))
            .then(r=>console.log("Success Delet"))
            
        }
    }
    return (
        <View style={styles.Container}>
            <Input 
            placeholder="username"
            onChangeText={(username)=>handleChange('username',username)}
            leftIcon={<Icon type="font-awesome" name="user-o"/>}
            value={userInput.username}
            containerStyle={styles.formInput}
            />
            <Input 
            placeholder="password"
            onChangeText={(password)=>handleChange('password',password)}
            leftIcon={<Icon type="font-awesome" name="key"/>}
            value={userInput.password}
            containerStyle={styles.formInput}
            />
            <CheckBox
            title="Remember Me"
            center
            checked={userInput.remember}
            onPress={()=>handleChange('remember',!userInput.remember)}
            containerStyle={styles.formCheckbox}
            />
            <View style={styles.formButton}>
                <Button
                title="Login"
                onPress={handleLogin}
                color="#512DA8"
                />

            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
Container:{
    justifyContent:'center',
    display:'flex',
    flex:1,
    margin:20
},
formInput:{
margin:20
},
formCheckbox:{
    margin:40,
    backgroundColor:null
},
formButton:{
    margin:60
}




})
