import React, { Component } from 'react';
import Match from './Match';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,

} from 'react-native';

export default class MatchList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(this.props.matches)
    };
  }
  render() {
    return (
      // <Text>
      //   <Match />
      //   MatchList
      // </Text>
      <ScrollView style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Match match={rowData}/>}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

module.exports = MatchList;
