import React, { Component } from 'react';
import MatchList from './MatchList';
import EditProfile from './EditProfile';
import UserView from './UserView';
import Auth from './Auth';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Auth />
        {/* <EditProfile />
        <UserView />
        <MatchList /> */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    marginTop: 15
  }
});

module.exports = Main;
