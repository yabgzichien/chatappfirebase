import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button, Dialog, Portal } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')

    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

  const uploadImageToServer = () => {
        console.log('upload image')
  }

  const handleRegister = () =>{
    if(password !== confirmPassword){
        setIsError(true)
        setErrorMsg('Password does not match')
    }else if(!username){
        setIsError(true)
        setErrorMsg('Please Enter a username')
    }else{
        createUserWithEmailAndPassword(auth, email, password).then(userCredential=>{
            const credential = userCredential.user
            console.log(credential.uid)
            const docRef = doc(db, 'users', credential.uid)
            setDoc(docRef, {
                username: username,
                photoURL: credential.photoURL,
                lastSeen: serverTimestamp(),
                email: credential.email,
                id: credential.uid,
                friendRequest: [],
                description: ''
            }, { merge: true })
        }).catch(e=>{
            setIsError(true)
            setErrorMsg(e.message)
        })
    }
  }


  return (
    <View style={styles.loginContainer}>
        <Portal>
        <Dialog visible={isError} onDismiss={()=> setIsError(false)}>
            <Dialog.Actions style={styles.errorContainer}>
            <Text style={styles.errorMsg} >{errorMsg}</Text>
            <Button onPress={() => setIsError(false)}>X</Button>
            </Dialog.Actions>
        </Dialog>
        </Portal>
      <View style={styles.container} >
        <Text style={styles.loginText}>Register</Text>

        <TouchableOpacity style={styles.profilePic} onPress={uploadImageToServer} >

            <Text style={styles.text}>Profile Picture (Optional)</Text>
            <FontAwesome name="upload" size={30} color="black" style={styles.uploadIcon} />
      
        </TouchableOpacity>
        
        <TextInput onChangeText={setUsername}  value={username} style={styles.emailInput} placeholder='Username' />
        <TextInput onChangeText={setEmail}  value={email}  style={styles.emailInput} placeholder='Email' /> 
        <TextInput onChangeText={setPassword}  value={password}  style={styles.emailInput} type='password'  placeholder='Password' secureTextEntry={true} />
        <TextInput onChangeText={setConfirmPassword}  value={confirmPassword}  style={styles.emailInput} type='password'  placeholder='Confirm Password' secureTextEntry={true}/>

        <TouchableOpacity style={styles.login} onPress={handleRegister}>
            <Text style={styles.authText}>Register</Text>
        </TouchableOpacity>

        
      </View>
      <View style={styles.registerMainContainer}>
        <Text>Already have an account?</Text> 
        <Pressable style={{marginLeft: 10}} onPress={()=> navigation.navigate('Login') }>
            <Text style={styles.register}>Login</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 500,
        backgroundColor: '#e6e6e6',
        borderRadius: 20,
        shadowColor: 'red',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    loginContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    loginText:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20,
        marginBottom: 20,
        color: 'black'
    },
    image:{
        width: 250,
        height: 140.625, 
        resizeMode: 'cover',
        marginTop: 20,
        marginBottom: 20,
    },
    emailInput:{
        width: 250,
        height: 50,
        fontSize: 18,
        padding: 3,
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 15,
    },
    authText:{
        fontSize: 20,
        color: 'white',
    },
    login:{
        backgroundColor: '#00345c',
        marginTop: 20,
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 10, 
    },
    registerMainContainer:{
        display: 'flex',
        flexDirection: 'row',
    },
    register:{
        textDecorationLine: 'underline',
        color: 'blue',
        fontSize: 16
    },
    text:{
        fontSize: 16,
        fontWeight: '700',
    },
    profilePic:{
        backgroundColor: '#54b8ff',
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black'
    },
    errorMsg:{
        fontSize: 16,
        color: 'red'
    },
    errorContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    }
})