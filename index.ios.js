/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import StatusBar from './ioscomponents/StatusBar'
import Main from './ioscomponents/Main';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class pitchmatch extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Main />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('pitchmatch', () => pitchmatch);
