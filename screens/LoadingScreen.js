import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{uri: 'https://icon-library.com/images/loading-gif-icon/loading-gif-icon-9.jpg'}} style={styles.loading} />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    loading: {
        width: 300,
        height: 300
    },
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})