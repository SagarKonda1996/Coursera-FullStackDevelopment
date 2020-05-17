import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import {Card,Icon,Input,CheckBox,Button} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {baseUrl} from '../shared/baseUrl'
import * as Permissions from 'expo-permissions'
import {Notifications} from 'expo'
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from 'expo-image-picker';
import { Asset } from 'expo-asset';

const LoginTab = ({navigation,route}) => {
    const [userInput, setUserInput] = useState({
        username:'',
        password:'',
        remember:false
    })
    const {username,password,remember}=route.params?route.params:{username:'',password:'',remember:''}
    useEffect(() => {
        getUserData()
    }, [username])
    useEffect(() => {
       getUserData()
    }, [])
    const getUserData=()=>{
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
    }
    const handleChange=(key,value)=>{
        setUserInput({...userInput,[key]:value})
    }
    const handleLogin=()=>{
        if(userInput.remember){
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
                title="  Login"
                onPress={handleLogin}
                buttonStyle={{backgroundColor:"#512DA8"}}
                icon={
                    <Icon
                        name='sign-in'
                        type='font-awesome'            
                        size={24}
                        color= 'white'
                    />
                }
                />

            </View>
            <View style={styles.formButton}>
                    <Button
                        onPress={() =>navigation.navigate('Register')}
                        title=" Register"
                        buttonStyle={{backgroundColor:null}}
                        titleStyle={{color:'blue'}}
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color="blue"
                            />

                        }
                        
                        />
                </View>
        </View>
    )
}
const RegisterTab=({navigation})=>{
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        remember: false,
        imageUrl: baseUrl + 'images/logo.png'
    })
    const handleChange=(key,value)=>{
        setUserInput({...userInput,[key]:value})
    }
    const getImageFromCamera=async()=>{
        const cameraPermission=await Permissions.askAsync(Permissions.CAMERA)
        const cameraRoll=await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(cameraPermission.status=='granted' && cameraRoll.status=='granted'){
            let capturedImage=await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            if(!capturedImage.cancelled){
                processImage(capturedImage.uri)
            }

        }
    }
    const processImage=async(imageUri)=>{
        let processedImage=await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize:{width:400}}
            ],
            {format:'png'}
            )
            handleChange('imageUrl',processedImage.uri)

    }
    const handleRegister=()=>{
        console.log(JSON.stringify(userInput))
        if(userInput.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username:userInput.username,password:userInput.password,remember:true})
                )
                .catch((error)=>{
                    console.log('Could Not Save User Info')
                })
           navigation.navigate('Login',{username:userInput.username,password:userInput.password,remember:true}) 
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch(error=>console.log('Could Not Delete User Info'))
            .then(r=>console.log("Success Delete"))
            navigation.navigate('Login',{username:userInput.username,password:userInput.password,remember:true}) 

        }
    }
    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{uri: userInput.imageUrl}} 
                    loadingIndicatorSource={<Icon name="user" type="font-awesome"/>}
                    style={styles.image} 
                    />
                <Button
                    title="Camera"
                    onPress={getImageFromCamera}
                    />
            </View>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => handleChange('username',username)}
                value={userInput.username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => handleChange('password',password)}
                value={userInput.password}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="First Name"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(firstname) => handleChange('firstname',firstname)}
                value={userInput.firstname}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Last Name"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(lastname) => handleChange('lastname',lastname)}
                value={userInput.lastname}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                onChangeText={(email) => handleChange('email',email)}
                value={userInput.email}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={userInput.remember}
                onPress={() => handleChange('remember',!userInput.remember)}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                onPress={handleRegister}
                    title="  Register"
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={24}
                            color= 'white'
                        />
                    }
                    buttonStyle={{
                        backgroundColor: "#512DA8"
                    }}
                    />
            </View>
        </View>
        </ScrollView>
    )
}
const Login=({navigation})=>{
    const Tab = createBottomTabNavigator(); 
    return (
        <Tab.Navigator tabBarOptions={{activeBackgroundColor:'#9575CD',inactiveBackgroundColor:'#D1C4E9',activeTintColor:'#ffffff',inactiveTintColor:'grey'}}>
          <Tab.Screen name="Login" component={LoginTab} options={{tabBarIcon:()=><Icon name="sign-in" type="font-awesome"/>}}/>
          <Tab.Screen name="Register" component={RegisterTab}  options={{tabBarIcon:()=><Icon name="user-plus" type="font-awesome"/>}}/>
        </Tab.Navigator>
      );
}
export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        display:"flex",
        flex:1,
        flexDirection:'column'

    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        marginHorizontal: 5,
        paddingHorizontal:30,
        paddingVertical:0
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        marginHorizontal: 60,
        marginVertical:10
    }
});

