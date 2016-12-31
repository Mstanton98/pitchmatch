import React, { Component } from 'react';
import Match from './Match';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class MatchList extends Component {
  render() {
    return (
      <Text>
        <Match />
        MatchList
      </Text>
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = MatchList;
