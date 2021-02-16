import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity,
   ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'
import styles from '../resources/stylesProfile.js'

const ProfilePage = ({ route, navigation }) => {
  //states
  const [loading, setLoading] = useState(false);
  const [dataProfile, setDataProfile] = useState([]);
  const [dataRepos, setDataRepos] = useState([]);
  const [error, setError] = useState(null);

  const {profileLink} = route.params;

  //updates and re-renders page, fetches data
  useEffect(() => {
    setLoading(true);
    loadApiData(profileLink, setDataProfile)
    loadApiData(`${profileLink}/repos`, setDataRepos)
  }, []);

  //Fetches results from GitHub API
  function loadApiData(apiLink, stateUpdater) {
    fetch(apiLink)
      .then(response => response.json())
      .then(response => {
        if(response.message != 'Not Found'){
          stateUpdater(response);
          setLoading(false);
        }
        else{
          setError('GitHub API query error. Reload the page and try again.')
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        setError('Connection error. Reload the page and try again.');
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

  if (error) {
    Alert.alert(
      "Error",
      error,
      [ { text: "OK", onPress: () => setError(null) } ]
    );
  }

  function navToRepo(url){
    navigation.navigate('Repo', { repoLink: url})
  }


  function onRefresh() {
    setLoading(true);
    loadApiData(`${profileLink}/repos`, setDataRepos)
    setLoading(false);
  }

  //Main view
  return (
    <View style={styles.profilePage}>
      <View style={styles.userProfile}>
        <Image source={{ uri: dataProfile.avatar_url }} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{dataProfile.login}</Text>
            <View style={styles.userInfo}>
              <View style={{flex:1}}>
                <Text style={styles.userDetailsLeft} numberOfLines={1}>{dataProfile.company}</Text>
                <Text style={styles.userDetailsLeft}>{dataProfile.blog}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.userDetailsRight}>Public Repos: {dataProfile.public_repos}</Text>
                <Text style={styles.userDetailsRight}>Followers: {dataProfile.followers}</Text>
              </View>
            </View>
          </View>
      </View>

      <Text style={styles.breakText} >Repositories</Text>

      <FlatList
        data={dataRepos}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.repoList} onPress={() => navToRepo(item.url)}>
            <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Image style={{marginHorizontal: 4}} source={require('../resources/icons/octiconrepo.png')}/>
                <Text style={styles.repoName}>{item.name}</Text>
              </View>
              <Text style={styles.repoYear}>{item.created_at.substring(0,10)}</Text>
            </View>
            <Text style={styles.repoDesc}>{item.description}</Text>
          </TouchableOpacity>
        )}
        refreshControl={ <RefreshControl refreshing={loading} onRefresh={onRefresh} /> }
      />

    </View>
  );

};



export default ProfilePage;
