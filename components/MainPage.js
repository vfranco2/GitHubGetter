import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'
import styles from '../resources/stylesMain.js'

const MainPage = ({ navigation }) => {

  //states
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const allUsersLink = 'https://api.github.com/users';

  //updates and re-renders page, fetches data
  useEffect(() => {
    loadApiData(allUsersLink)
  }, []);

  //Fetches results from GitHub API
  function loadApiData(apiLink) {
    fetch(apiLink)
      .then(response => response.json())
      .then(response => {
        setData(response);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

  //Navigates to selected profile page
  function navToProfile(){
    navigation.navigate('Profile', { profileLink: 'https://api.github.com/users/vfranco2' })
  }

  //Main view
  return (
    <View style={styles.mainPage}>
      <FlatList
        data={data}
        keyExtractor={item => item.login}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userList} onPress={() => navToProfile()}>
            <Image style={styles.userImage} source={{ uri: item.avatar_url }} />
            <Text style={styles.userName}>{item.login}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};



export default MainPage;
