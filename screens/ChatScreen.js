import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import ChatHeader from '../components/ChatHeader'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { sendMessage } from '../utils/utils';
import Message from '../components/Message';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import UserContext from '../UserContext'
import { useCollection } from 'react-firebase-hooks/firestore';


const ChatScreen = ({ route, navigation }) => {

  const { currentUser } = useContext(UserContext)

  const [chat, setChat] = useState([])

    
  useEffect(()=>{
    const q = query(collection(db, 'chats', route.params.chatId, 'chat'), orderBy('timestamp', 'asc'))
    const unsub = onSnapshot(q, (snapShot)=>{
      setChat(snapShot?.docs?.map(doc=> doc.data()))
    })

    return unsub
  }, [])

  let { username, photoURL, chatId, chats } = route.params

  const [message, setMessage] = useState('')

  const handleSendMessage = async () =>{
    await sendMessage(chatId, message, username, photoURL, currentUser.email)
    setMessage('')
  }


  return (
    <>
    <View style={styles.container}>
      
     <ChatHeader navigation={navigation} username={username} photoURL={photoURL} />
     <FlatList 
      data={chat}
      renderItem={({ item })=> (
      <Message 
      username={item.username} 
      message={item.message} 
      photoURL={item.photoURL} 
      email={item.email} 
      timestamp={item.timestamp} />)}
     />

     {/* {showMessage()} */}
  
    </View>
    <View style={styles.inputContainer}>
      <Entypo name="emoji-happy" size={24} color="black" style={styles.icon} />
      <TextInput onChangeText={setMessage} value={message}  style={styles.input} placeholder='Message' />
      {message ? 
      <TouchableOpacity onPress={handleSendMessage}>
        <FontAwesome name="send" size={30} color="black" style={styles.icon}/>
      </TouchableOpacity>:
      <>
        <FontAwesome name="microphone" size={24} color="black" style={styles.icon} />
        <MaterialIcons name="photo-album" size={24} color="black" style={styles.icon} />
      </>
     }
    </View>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  inputContainer:{
    backgroundColor: 'white',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input:{
    fontSize: 18,
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
  },
  icon:{
    marginHorizontal: 5,
  }
})