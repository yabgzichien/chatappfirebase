import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Avatar } from 'react-native-paper';
import UserContext from '../UserContext';
import moment from 'moment';

const Message = ({ username, message, photoURL, email, timestamp }) => {

  const { currentUser } = useContext(UserContext)

  const time = moment(timestamp?.seconds * 1000).calendar()

  return (
    <>
    { currentUser.email === email ? 
    <View style={styles.container} key={timestamp?.seconds} >

        <View style={styles.myMessageContainer}>
            <Text>{time}</Text>
            <View style={styles.myMessage}>
                <Text style={styles.messageText}>{message}</Text>
            </View> 
        </View>   

    </View> :
    <View style={styles.container} key={timestamp?.seconds}>
        { photoURL ? <Avatar.Image size={40} source={{uri: photoURL}} style={styles.avatar} /> :
            <Avatar.Text size={40} label={username[0]} style={styles.avatar} />
        }
        <View style={styles.messageContainer}>
            <View style={styles.message}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
        </View>     
    </View>
    }
    </>
  )
}

export default Message

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginVertical: 10,
    },
    message:{
        backgroundColor: '#a1a1a1',
        padding: 8,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer:{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
        alignItems: 'center'
    },
    messageText:{
        fontSize: 16,
        minWidth: 20,
        textAlign: 'center',
        maxWidth: 150,
    },
    myMessageContainer:{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginRight: 10,
        alignItems: 'center'
    },
    myMessage:{
        backgroundColor: '#4de1ff',
        padding: 8,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    time:{
        marginRight: 10,
    }

})