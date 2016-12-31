import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class StatusBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>
          pitchmatch
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#70587B',
    height: 50,
  },
  logo: {
    marginTop: 15,
    fontSize: 28,
    color: '#2C0735',
  },
});

module.exports = StatusBar;
