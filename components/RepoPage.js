import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../resources/colors.js'
import styles from '../resources/stylesRepo.js'

const RepoPage = ({ route, navigation }) => {
  //states
  const [loading, setLoading] = useState(false);
  const [dataRepo, setDataRepo] = useState([]);
  const [dataCommits, setDataCommits] = useState([]);
  const [error, setError] = useState(null);

  const {repoLink} = route.params;

  //updates and re-renders page, fetches data
  useEffect(() => {
    setLoading(true);
    loadApiData(repoLink, setDataRepo)
    loadApiData(`${repoLink}/commits`, setDataCommits)
  }, []);

  //Fetches results from GitHub API
  function loadApiData(apiLink, stateUpdater) {
    fetch(apiLink)
      .then(response => response.json())
      .then(response => {
        stateUpdater(response);
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

  //Main view
  return (
    <View style={styles.repoPage}>

      <View style={styles.repoHeading}>
        <Text style={styles.repoName}>{dataRepo.name}</Text>
        <Text style={styles.repoDesc}>{dataRepo.description}</Text>
      </View>

      <Text style={styles.breakText} >Commits</Text>

      <FlatList
        data={dataCommits}
        keyExtractor={item => item.sha}
        renderItem={({ item }) => (
          <View style={styles.commitList}>
            <View style={styles.commitHead}>
              <Text style={styles.commitAuthor}>{item.commit.author.name}</Text>
              <Text style={styles.commitAuthor}>{item.commit.author.date.substring(0,10)}</Text>
            </View>

            <View style={styles.commitMsg}>
              <View style={styles.commitColor}><Text> </Text></View>
              <Text style={styles.commitInfo}>{item.commit.message}</Text>
            </View>


            <Text style={styles.commitInfo}>{item.sha}</Text>
          </View>
        )}
      />

    </View>
  );
};

export default RepoPage;
