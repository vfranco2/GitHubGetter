import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'
import styles from '../resources/stylesMain.js'

const MainPage = ({ navigation }) => {

  //states
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const apiSearchLink = 'https://api.github.com/search/users?q=';
  const allUsersLink = 'https://api.github.com/users';

  //updates and re-renders page, fetches data
  useEffect(() => {
    loadApiData(allUsersLink)
  }, []);

  //Handle submit from search bar
  const handleSubmit = (text) => {
    console.log(text)
    fetch(`${apiSearchLink}${text}+in:user`)
      .then(response => response.json())
      .then(results => {
        setData(results.items);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }

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

  //Load spinny thing
  if (loading) {
    return (
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.textPri} />
      </View>
    );
  }

  //Navigates to selected profile page
  function navToProfile(url){
    navigation.navigate('Profile', { profileLink: url })
  }

  //Main view
  return (
    <View style={styles.mainPage}>
      <FlatList
        ListHeaderComponent={searchBar}
        data={data}
        keyExtractor={item => item.login}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userList} onPress={() => navToProfile(item.url)}>
            <Image style={styles.userImage} source={{ uri: item.avatar_url }} />
            <Text style={styles.userName}>{item.login}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  //Returns the search bar
  function searchBar() {
    return(
      <View style={{backgroundColor: colors.textPri, padding: 10,}}>
        <TextInput style={{backgroundColor: colors.bg, paddingHorizontal: 20,
                      borderColor: colors.border, borderWidth: 2, borderRadius:20/2}}
                   placeholder="Search all GitHub users"
                   onSubmitEditing={event => {const text = event.nativeEvent.text;
                      handleSubmit(text)}}/>
      </View>
    )
  }
};

export default MainPage;
