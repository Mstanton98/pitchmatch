import React, { Component } from 'react';
import ChatView from './ChatView'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Match extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.user.imgUrl}}
       />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    height: 40,
  },
  image: {
    alignSelf: 'flex-start',
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

module.exports = Match;
