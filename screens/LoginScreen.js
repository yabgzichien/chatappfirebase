import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper';

import { auth, db } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const login = () =>{
    signInWithEmailAndPassword(auth, email, password).then(userCredential=>{
        const credential = userCredential.user
        const docRef = doc(db, 'users', credential.uid)
        setDoc(docRef, {
            lastSeen: serverTimestamp(),
        }, { merge: true })
    }).catch(e=>{
        setIsError(true)
        setErrorMsg(e.message)
        console.log(e.message)
    })
  }

  const navigateRegister = () =>{
    navigation.navigate('Register')
  }


  return (
    <View style={styles.loginContainer}>
    <Portal>
      <Dialog visible={isError} onDismiss={()=>setIsError(false)}>
        <Dialog.Actions style={styles.errorContainer}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>
          <Button onPress={() => setIsError(false)}>X</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
      <View style={styles.container} >
        <Text style={styles.loginText}>Login</Text>
        <Image  style={styles.image} source={{uri: "https://i.kym-cdn.com/entries/icons/mobile/000/030/642/60secondsafrica1minute.jpg"}} />
        <TextInput value={email}  onChangeText={setEmail}  style={styles.emailInput} placeholder='Email' /> 
        <TextInput value={password} onChangeText={setPassword} style={styles.emailInput} secureTextEntry={true} placeholder='Password'/>

        <TouchableOpacity style={styles.login} onPress={login} >
            <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>

        
      </View>
      <View style={styles.registerMainContainer}>
        <Text>Don't have an account?</Text> 
        <Pressable style={{marginLeft: 10}} onPress={navigateRegister}>
            <Text style={styles.register}>Register</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginScreen

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
        marginRight: 120,
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