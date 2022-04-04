import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Avatar } from 'react-native-paper';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import moment from 'moment';
import UserContext from '../UserContext';
import { fetchLastestMessage } from '../utils/utils';

const Chat = ({ username, photoURL, lastText, timestamp, chatPersonId, navigation, chatId }) => {

  const { currentUser } = useContext(UserContext)

  const [chats, setChats] = useState([])
  const [latestMessage, setLatestMessage] = useState('')

  useEffect(()=>{
    fetchLastestMessage(chatId, setLatestMessage)

    if(chatId){
      const q = query(collection(db, 'chats', chatId, 'chat'), orderBy('timestamp', 'asc'))
      const unsub = onSnapshot(q, snapShot=>{

        setChats(snapShot?.docs.map(doc=>doc.data()))

        return unsub
      })
    }
  }, [chatId])

  console.log("Latest Messages: ", latestMessage)

  try{

    console.log("onSnapShot", chats[chats.length - 1].message)
  }catch{}

  

  let latestChatTime = null

  try{
    latestChatTime = chats !== [] ? moment(chats[chats?.length -1].timestamp?.seconds * 1000).calendar() : null    
  }catch{
  }


  const navigateChatScreen = () =>{
    navigation.navigate('ChatScreen', { username, photoURL, chatId, chats })
  }

  return (
    <TouchableOpacity style={styles.container} key={chatId} onPress={navigateChatScreen} >
      { photoURL ? <Avatar.Image size={55} source={{uri: photoURL}} />:
        <Avatar.Text size={55} label={username[0]} />
      }
      <View style={styles.chatInfoContainer}>
        <Text style={styles.username}>{username}</Text>
        <View style={styles.lastTextContainer}>
          {chats? 
          <Text style={styles.lastText} numberOfLines={1} >
          { chats[chats?.length - 1]?.username === currentUser.username ? 
          chats[chats?.length - 1]?.message : "You: "+ chats[chats?.length - 1]?.message } 
          </Text>:
          null
          }
          <View>

            <Text >{latestChatTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Chat

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  username:{
    fontSize: 20
  },
  lastTextContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  chatInfoContainer:{
    flex:1 ,
    marginLeft: 12,
  },
  lastText:{
    width: 170,
    fontWeight: '700',
    textDecorationLine: 'underline'
  }
})