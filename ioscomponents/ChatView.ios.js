import React, { Component } from 'react';
import ChatMessage from './ChatMessage';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ChatView extends Component {
  render() {
    return (
      <Text>
        <ChatMessage />
        ChatView
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = ChatView;
