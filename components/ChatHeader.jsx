import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const ChatHeader = ({ username, photoURL, navigation }) => {
  

  return (
    <View style={styles.container}>
      <View style={styles.userContainer} >
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        { photoURL ? <Avatar.Image size={40} source={{uri: photoURL}} style={styles.avatar} /> :
            <Avatar.Text size={40} label={username[0]} style={styles.avatar} />
        }
        <Text style={styles.username}>{username}</Text>
      </View>

      <View style={styles.iconsContainer}>
        <FontAwesome name="phone" size={26} color="black" />
        <FontAwesome5 name="video" size={24} color="black" />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingTop: 50,
        paddingBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    username: {
        fontSize: 18,
        fontWeight: '700'
    },
    iconsContainer:{
        display: 'flex',
        flexDirection: 'row',
        width: 120,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    avatar:{
        marginHorizontal: 10
    }
})