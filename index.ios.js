/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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
        <Text style={styles.stevenFuckhead}>
          pitchmatch
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  stevenFuckhead: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'purple',
    fontSize: 40
  },
});

AppRegistry.registerComponent('pitchmatch', () => pitchmatch);
