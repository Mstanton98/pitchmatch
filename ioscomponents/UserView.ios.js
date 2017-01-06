import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class UserView extends Component {
  render() {
    
    console.log(this.props);

    return (
      <Text>
        UserView
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = UserView;
