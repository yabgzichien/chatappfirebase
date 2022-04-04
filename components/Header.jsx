import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, TouchableRipple } from 'react-native-paper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import UserContext from '../UserContext';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Header = () => {
  
  const { currentUser } = useContext(UserContext)

  return (
    <View style={styles.container}>
        <View style={styles.userInfoContainer}>
            {
                currentUser?.photoURL ? 
                <Avatar.Image size={45} source={{uri: currentUser?.photoURL }} style={styles.avatar} /> :
                <Avatar.Text size={45} label={currentUser?.username} />
            }
            <Text style={styles.chats}>
                Chats
            </Text>

        </View>

        <TouchableOpacity style={styles.icons} onPress={()=>signOut(auth)}>
            <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>

    </View>
  )
}

export default Header

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
    headerText:{
        fontSize: 22,
        marginLeft: 15,
        fontWeight: '700'
    },
    avatar:{
        marginLeft: 20,
    },
    userInfoContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    chats:{
        fontSize: 20,
        marginLeft: 10,
        fontWeight: '700'
    },
    icons:{
        marginRight: 10,
    }

})