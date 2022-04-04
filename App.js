import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import UserContext from './UserContext';
import { useState } from 'react'
import { Provider as PaperProvider } from 'react-native-paper';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoadingScreen from './screens/LoadingScreen';
import UserProfileScreen from './screens/UserProfileScreen'; // WIP
import ChatScreen from './screens/ChatScreen';


export default function App() {
  // context
  const [currentUser, setCurrentUser] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [chats, setChats] = useState(null)
  const [chatsId, setChatsId] = useState([])

  const Stack = createNativeStackNavigator()
  const [user, loading] = useAuthState(auth)

  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <>
    <PaperProvider>
      {
        loading ? <LoadingScreen /> :
      
      <UserContext.Provider value={
        { currentUser, setCurrentUser, allUsers, setAllUsers, chats, setChats, chatsId, setChatsId }} >
      {
        user ? 
        
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
        </Stack.Navigator>
        </NavigationContainer> :

        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
      }
    </UserContext.Provider >
    }
    </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
