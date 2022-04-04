import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { acceptFriendRequest, getCurrentUserData } from '../utils/utils';
import UserContext from '../UserContext';

const FriendRequest = ({ username, email, id, photoURL, desc, userObj }) => {
  
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const [refresh, setRefresh] = useState(0)

  const acceptRequest = () =>{
      acceptFriendRequest(currentUser, userObj)
      getCurrentUserData(currentUser.id, setCurrentUser)
      alert(`${currentUser.username}, is now your friend`)
      setRefresh(refresh + 1)
  }

  return (
    <TouchableOpacity style={styles.container} key={id} >
        {
            photoURL ?  <Avatar.Image size={50} source={{uri: photoURL}} /> :
            <Avatar.Text size={50} label={username[0]} />
        }
        <View style={styles.userInfoContainer}>
            <View>
                <Text style={styles.username}>{username}</Text>
                <Text>email: {email}</Text>
                <Text>description: {desc? desc : 'none'}</Text>
            </View>
            <TouchableOpacity onPress={acceptRequest}>
             <AntDesign name="pluscircle" size={24} color="black" style={styles.acceptIcon} />
            </TouchableOpacity>
        </View>
     
    </TouchableOpacity>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
    },
    userInfoContainer:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        flex:1 ,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    username:{
        fontSize: 20,
        fontWeight: '700',
    },
    acceptIcon:{
        marginRight: 10,
    }
})