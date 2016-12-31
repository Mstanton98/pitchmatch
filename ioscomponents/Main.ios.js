import React, { Component } from 'react';
import MatchList from './MatchList';
import EditProfile from './EditProfile';
import UserView from './UserView';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Main extends Component {
  render() {
    return (
      <Text>
        <EditProfile />
        <UserView />
        <MatchList />

        Main
      </Text>
    )
  }
}

const styles = StyleSheet.create({

});

module.exports = Main;
