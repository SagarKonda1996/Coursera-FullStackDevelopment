import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import {Card,Button,Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer';

const ContactComponent = () => {
    const sendEmail=()=>{
        MailComposer.composeAsync({
            recipients:['sagar@kk.com','snk@yahoo.in'],
            subject:'Enquiry',
            body:'To Whom it may concern'
        })
    }
    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    title="Contact us"
                >
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>HONG KONG</Text>
                    <Text>Tel: +852 1234 5678</Text>
                    <Text>Fax: +852 8765 4321</Text>
                    <Text>Email:confusion@food.net</Text>
                    <Button
                title="Send Email"
                icon={<Icon name='envelope-o' type='font-awesome' color='white' style={{color:'white',marginRight:5}}/>}
                onPress={sendEmail}
                buttonStyle={{backgroundColor:'#512DA8'}}
                />
                </Card>
                
            </Animatable.View>
        </ScrollView>
       
    )
}

export default ContactComponent

const styles = StyleSheet.create({})
