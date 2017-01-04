import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import { LoginButton, AccessToken } from 'react-native-fbsdk';

let STORAGE_KEY = 'id_token';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async _onValueChange(item, selectedValue) {
   try {
    await AsyncStorage.setItem(item, selectedValue);
   } catch (error) {
     console.log('AsyncStorage error: ' + error.message);
   }
 }

  render() {
    return (
      <View
        style={styles.container}
        >
          <Text style={styles.title}>pitchmatch</Text>
          <Text style={styles.description}>Musical collaboration a few taps away.</Text>
          <Image
            style={styles.logo}
            source={require('./img/logo.png')}
          />
          <LoginButton
            publishPermissions={["publish_actions"]}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("login has error: " + result.error);
                } else if (result.isCancelled) {
                  alert("login is cancelled.");
                } else {
                  AccessToken.getCurrentAccessToken().then(
                    (res) => {

                      let token = res.accessToken;
                      console.log(token);
                      fetch('http://localhost:8000/api/auth', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          accessToken: token,
                        })
                      })
                      .then(response => response.json())
                      .then((res) => {
                        if (res.token) {
                          
                        this._onValueChange(STORAGE_KEY, res.token);
                        }
                      })
                      .catch((err) => {
                        alert(err);
                      })
                    }
                  )
                }
              }
            }
            onLogoutFinished={() => console.log('done')}/>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      title: {
        fontSize: 48,
        color: '#70587B'
      },
      description: {
        fontSize: 12,
        color: 'grey',
      },
      logo: {
        alignItems: 'center',
        height: 300,
        width: 300,
        marginBottom: 10,
      }
    });

    module.exports = Auth;
