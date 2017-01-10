import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class ChatMessage extends Component {
  render() {
    if (this.props.message.userId === this.props.user.id) {
      <TouchableOpacity style={styles.yourMessage}>
        <Text>{this.props.message}</Text>
      </TouchableOpacity>
    } else return (
      <TouchableOpacity style={styles.message}>
        <Text>{this.props.message}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    flex: 1,
    alignSelf: 'flex-start',
    height: 60,
    width: 100,
    borderWidth: 1,
    borderRadius: 20
  },
  yourMessage: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 60,
    width: 100,
    borderWidth: 1,
    borderRadius: 20
  }
});

module.exports = ChatMessage;
