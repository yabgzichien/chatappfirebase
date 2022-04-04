import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const AddUserChat = () => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.infoGroup}>
            <Ionicons name="person-add-sharp" size={24} color="black" />
            <Text style={styles.text}>Add New Friend</Text>
        </View>
    </TouchableOpacity>
  )
}

export default AddUserChat

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 20,
    },
    infoGroup:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        fontSize: 18,
        marginLeft: 10,
    }
})