import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';

import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class Auth extends Component {
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
                    (data) => {
                      let token = data.accessToken;

                      fetch('http://localhost:8000/api/auth', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          accessToken: token,
                        })
                      })
                      .then((res) => {
                        console.log(res);
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
        justifyContent: 'center',
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
