import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../UserContext';
import { sendFriendRequest } from '../utils/utils';

const UserSearch = ({ username, email, desc, photoURL, id, navigation }) => {

  const { currentUser } = useContext(UserContext)  

  const handleFriendRequest = () =>{
    sendFriendRequest(id, currentUser)
    alert("Friend Request sent successfully")
  }
  
  return (
    <>
    {currentUser.id === id ? null :
    <TouchableOpacity style={styles.container}>
      { photoURL ? 
        <Avatar.Image size={50} source={{uri: photoURL}} />:
        <Avatar.Text size={50} label={username[0]} style={styles.avatar} />
      }
      <View style={styles.usernameContainer}>
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text>email: {email}</Text>
          <Text>description: {desc? desc : 'none'}</Text>
        </View>

        <View></View> 
        <TouchableOpacity onPress={handleFriendRequest}>
          <Ionicons name="person-add" size={24} color="black" style={{marginRight: 10}} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    }
    </>
  )}

export default UserSearch

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  usernameContainer:{
    display: 'flex',
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center'
  },
  avatar:{

  },
  username:{
    fontSize: 20,
  }
})