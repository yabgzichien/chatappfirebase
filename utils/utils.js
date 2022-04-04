import { doc, getDoc, collection, getDocs, query, where, setDoc, addDoc, serverTimestamp, orderBy } from "firebase/firestore"
import { db } from "../firebase"
import uuid from 'react-native-uuid';

const getCurrentUserData = async (id, setData, abort) => {
    const docRef = doc(db, 'users', id)
    await getDoc(docRef).then(snapShot=>{
        setData(snapShot.data())
    })
}

const getAllUsers = async (setData, abort) =>{
    let data = []
    const collectionRef = collection(db, 'users')
    await getDocs(collectionRef).then(snapShots=>{
        snapShots.docs.forEach(snapShot=>{
            data.push(snapShot.data())
        })
    })
    setData(data)
}

const acceptFriendRequest = async (currentUserObj, userObj, abort)=>{

    // add new chat
    const chatsDocRef = doc(db, 'chats', uuid.v4())
    await setDoc(chatsDocRef, { users: [currentUserObj, userObj] })
    console.log('chats doc set')
    
    // remove friend request array
    let newFriendRequestArray = []
    const userDocRef = doc(db, 'users', currentUserObj.id)
    await getDoc(userDocRef).then(snapShot=>{
        let currentRequestArray  = snapShot.data().friendRequest
        const index = currentRequestArray.findIndex(user=>(
            user.id === userObj.id
        ))
        currentRequestArray.splice(index, 1)
        newFriendRequestArray = currentRequestArray
        const docRef = doc(db, 'users', currentUserObj.id)
        setDoc(docRef, { friendRequest: currentRequestArray }, { merge: true})
    })

}

const sendFriendRequest = async (id, friendObj, abort) => {
    const docRef = doc(db, 'users', id)
    await setDoc(docRef, {friendRequest: [friendObj]}, {merge: true})
}

const getChats = async (currentUserId, setData, setChatID) =>{
    let chats = []
    let chatId = []
    const collectionRef = collection(db, 'chats')
    await getDocs(collectionRef).then(snapShots=>{
        snapShots.docs.forEach(chat=>{
            let users = chat.data().users
            
            users.forEach(user=>{
                if(user.id === currentUserId){
                    const index = users.findIndex(user=>{
                        return user.id === currentUserId
                    })
                    
                    users.splice(index, 1)
                    chats.push(users[0])
                    chatId.push(chat.id)
                    // chats.push({user: users[0], chatId: chat.id})
                }
            })
        })
    })
    setData(chats)
    setChatID(chatId)
}

const sendMessage =  async (chatId, message, username, photoURL, email ) =>{
    const collectionRef = collection(db, 'chats', chatId, 'chat')
    await addDoc(collectionRef, { username, message, photoURL, email, timestamp: serverTimestamp() })
}

const fetchLastestMessage = async (chatId, setData) =>{
    const q = query(collection(db, 'chats', chatId, 'chat'), orderBy('timestamp', 'asc')) 
    getDocs(q).then(snapShot=>{
        const docsArray = snapShot.docs
        setData(docsArray[docsArray.length - 1].data().message) 
    })
}

export { getCurrentUserData, getAllUsers, sendFriendRequest, acceptFriendRequest, getChats, sendMessage, fetchLastestMessage }