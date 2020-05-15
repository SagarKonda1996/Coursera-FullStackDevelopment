import React,{useState} from 'react'
import { View, Text,ScrollView,StyleSheet, Picker,Switch, Button, Modal } from 'react-native'
import { Card } from "react-native-elements";
import DatePicker from 'react-native-datepicker'
const Reservation = () => {
    const [userInput, setUserInput] = useState({
        guests:1,
        smoking:false,
        date:'',
        showModal:false
    })
    const handleChange=(key,value)=>{
        setUserInput({...userInput,[key]:value})
    }
    const handleReservation=()=>{
        handleChange('showModal',!userInput.showModal)
       
    }
    const resetForm=()=>{
        setUserInput({
            guests:1,
            smoking:false,
            date:'',
            showModal:false
        })
    }
    return (
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Number of Guests
                </Text>
                <Picker
                style={styles.formItem}
                selectedValue={userInput.guests}
                onValueChange={(itemValue,itemIndex)=>handleChange('guests',itemValue)}
                >
                    <Picker.Item label="1" value="1"/>
                    <Picker.Item label="2" value="2"/>
                    <Picker.Item label="3" value="3"/>
                    <Picker.Item label="4" value="4"/>
                    <Picker.Item label="5" value="5"/>
                    <Picker.Item label="6" value="6"/>
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Smoking/Non-Smoking?
                </Text>
                <Switch 
                style={styles.formItem}
                value={userInput.smoking} 
                onValueChange={(value)=>handleChange('smoking',value)}
                trackColor='#512DA8'
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>
                    Date and Time
                </Text>
                <DatePicker
                style={{flex:2,marginRight:20}}
                date={userInput.date}
                format=''
                mode='datetime'
                placeholder='Select Date and Time'
                minDate='2017-01-01'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                customStyles={{
                    dateIcon:{
                        position:"absolute",
                        left:0,
                        top:4,
                        marginLeft:0
                    },
                    dateInput:{
                        marginLeft:36
                    }
                }}
                onDateChange={(date)=>handleChange('date',date)}
                />
            </View>
            <View style={styles.formRow}>
                <Button
                title="Reserve"
                color='#512DA8'
                onPress={handleReservation}
                accessibilityLabel='Learn More About this'
                />
            </View>
            <Modal
            animationType='slide'
            transparent={false}
            visible={userInput.showModal}
            onDismiss={resetForm}
            onRequestClose={resetForm}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                            Your Reservation
                    </Text>
                    <Text style={styles.modalText}>
                            Number of Guests :{userInput.guests}
                    </Text>
                    <Text style={styles.modalText}>
                            Smoking :{userInput.smoking?'YES':'NO'}
                    </Text>
                    <Text style={styles.modalText}>
                            Date and Time :{userInput.date}
                    </Text>

                    <Button
                    title="Close"
                    onPress={resetForm}
                    color='#512DA8'
                    />
                </View>

            </Modal>
            
        </ScrollView>
    )
}

export default Reservation
const styles=StyleSheet.create({
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
    modalTitle:{
        backgroundColor:'#512DA8',
        fontSize:24,
        fontWeight:"bold",
        textAlign:"center",
        color:'white',
        marginBottom:20
    },
    modalText:{
        fontSize:18,
        margin:10
    }
})