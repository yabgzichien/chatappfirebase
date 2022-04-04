import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header'
import UserContext from '../UserContext'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getCurrentUserData, getAllUsers, getChats } from '../utils/utils'
import { Searchbar, Modal as PaperModal, Portal, Provider } from 'react-native-paper';
import Chat from '../components/Chat'
import AddUserChat from '../components/AddUserChat'
import { Ionicons } from '@expo/vector-icons';
import UserSearch from '../components/UserSearch'
import { FontAwesome5 } from '@expo/vector-icons';
import FriendRequest from '../components/FriendRequest'
import { collection, onSnapshot } from 'firebase/firestore'

const HomeScreen = ({ navigation }) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false)
    }, 1000)
  }, []);


  const { setCurrentUser, setAllUsers, allUsers, currentUser, chats, setChats, setChatsId, chatsId } = useContext(UserContext)
  const [user] = useAuthState(auth)

  useEffect(()=>{
    const abortController = new AbortController()
    getCurrentUserData(user.uid, setCurrentUser, { signal: abortController })
    getAllUsers(setAllUsers, { signal: abortController })
    getChats(user.uid, setChats, setChatsId)

    return () => abortController.abort()
  }, [refreshing])

  const [openModal, setOpenModal] = useState(false) 
  const [openRequestModal, setOpenRequestModal] = useState(false)
  const [searchFriend, setSearchFriend] = useState('')

  const [filteredUsers, setFilteredUsers] = useState([])

  const searchUserFilter = () =>{
    if(searchFriend){

      const filterData = allUsers.filter(user=>{
        const filterUser = user.username.toLowerCase()
        const filterSearch = searchFriend.toLowerCase()
        return filterUser.indexOf(filterSearch) > -1
      })
      setFilteredUsers(filterData)
    }
  }


  return (
    <>
    <Modal visible={openModal} animationType='slide' >
      <TouchableOpacity onPress={()=> setOpenModal(false)}>
        <Ionicons name="close-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Search For a Friend</Text>
      <Searchbar onChange={searchUserFilter} placeholder='Search' onChangeText={setSearchFriend} value={searchFriend} />
      {searchFriend ? <Text>Showing result for { searchFriend }...</Text> : <></>}
    
      <FlatList 
        data={filteredUsers}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=> 
        <UserSearch 
        username={item.username} 
        email={item.email} 
        desc={item?.description} 
        photoURL={item.photoURL} 
        id={item.id}
        navigation={navigation} />}
      />

    </Modal>

    <Modal visible={openRequestModal} animationType='slide'>
      <TouchableOpacity onPress={()=> setOpenRequestModal(false)}>
        <Ionicons name="close-sharp" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Friend Requests</Text>
      
      {
        currentUser?.friendRequest ? 
        <FlatList 
        data={currentUser?.friendRequest}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item})=> 
        <FriendRequest 
        username={item.username}  
        email={item.email}
        id={item.id}
        photoURL={item.photoURL}
        desc={item?.description}
        userObj={item}
        /> }
        /> : 
        <Text>No Friend Request</Text>
      }

    </Modal>
   

    <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />} style={styles.container}>
      <Header />
      <Searchbar placeholder='Search' />

      {/* {
        chats?.filter(chat=>{
          chat.user.map(item=>(
            <Chat 
            username={item?.username} 
            lastText={null} 
            timestamp={null} 
            chatPersonId={item?.id}  
            photoURL={item?.photoURL}
            navigation={navigation}
            chatId={chat?.id}
            />
          ))
        })
      } */}

      {
        chats?.map((item, index)=> (
          <Chat 
          username={item?.username} 
          lastText={null} 
          timestamp={null} 
          chatPersonId={item?.id}  
          photoURL={item?.photoURL}
          navigation={navigation}
          chatId={chatsId[index]}
          />
        ))
      }
      

    </ScrollView>



    <View style={styles.bottomNavigator}>
      <TouchableOpacity  style={styles.addContainer} onPress={()=> setOpenRequestModal(true)}>
        <View style={styles.infoGroup}>
            <Text style={styles.text}>Friend Requests</Text>
            <FontAwesome5 name="user-friends" size={24} color="black" />
        </View>
        {
          currentUser?.friendRequest?.length > 0 ? 
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{currentUser?.friendRequest.length}</Text>
          </View> : null
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setOpenModal(true)}  style={styles.addContainer}>
          <View style={styles.infoGroup}>
              <Text style={styles.text}>Add New Friend</Text>
              <Ionicons name="person-add-sharp" size={24} color="black" />
          </View>
      </TouchableOpacity>
    </View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addContainer:{
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoGroup:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
},
text:{
    fontSize: 16,
    marginLeft: 10,
},
bottomNavigator:{
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  alignItems: 'center',
},
modal: {
  backgroundColor: 'white',
  margin: 15, 
  alignItems: undefined,
  justifyContent: undefined,
},
header:{
  fontSize: 20,
  fontWeight: '700',
  margin: 10,
},
badge:{
  backgroundColor: 'red',
  paddingHorizontal: 6,
  borderRadius: 50,
},
badgeText:{
  color: 'white'
}
})