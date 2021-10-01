import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  btnSubmitClick = () => {
    var email = this.state.email;
    var pass = this.state.password;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == '') {
      Alert.alert('Alert', 'Please fill email!');
    } else if (pass == '') {
      Alert.alert('Alert', 'Please fill password!');
    } else if (reg.test(email) === false) {
      Alert.alert('Alert', 'Email is not correct!');
    } else {
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: {
                  name: 'Home',
                  options: {
                    topBar: {
                      visible: false,
                    },
                  },
                },
              },
            ],
          },
        },
      });
    }
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.logoImg}
                />

                <Text style={styles.title}>Sign In As Parent</Text>

                <View style={styles.inputView}>
                  <Image
                    source={require('../assets/icons/email.png')}
                    style={styles.userImgIcon}
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}></TextInput>
                </View>

                <View style={styles.inputView}>
                  <Image
                    source={require('../assets/icons/lock.png')}
                    style={styles.userImgIcon}
                  />
                  <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password =>
                      this.setState({password})
                    }></TextInput>
                </View>

                <View style={styles.forgotPass}>
                  <TouchableOpacity
                    onPress={() => {
                      Navigation.push(this.props.componentId, {
                        component: {
                          name: 'ForgotPass',
                          options: {
                            topBar: {
                              visible: false,
                            },
                          },
                        },
                      });
                    }}>
                    <Text>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  underlayColor="#fff"
                  onPress={this.btnSubmitClick}>
                  <Text style={styles.submitText}>SignIn</Text>
                </TouchableOpacity>

                <View style={styles.socialLogin}>
                  <TouchableOpacity
                    style={styles.googleBtn}
                    underlayColor="#fff"
                    onPress={() => {}}>
                    <View style={styles.google}>
                      <Image
                        source={require('../assets/icons/google.png')}
                        style={styles.googleIcon}
                      />
                      <Text>Google</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.facebookBtn}
                    underlayColor="#fff"
                    onPress={() => {}}>
                    <View style={styles.facebook}>
                      <Image
                        source={require('../assets/icons/facebook.png')}
                        style={styles.facebookIcon}
                      />
                      <Text>Facebook</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View style={styles.signUp}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: 'SignUp',
                      options: {
                        topBar: {
                          visible: false,
                        },
                      },
                    },
                  });
                }}>
                <Text style={{padding: 5}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImg: {
    padding: 12,
    height: 200,
    width: 200,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    padding: 12,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 15,
    paddingEnd: 15,
  },

  userImgIcon: {
    padding: 12,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  textinput: {
    width: '100%',
    paddingEnd: 15,
    paddingVertical: 0,
  },

  forgotPass: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '85%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 15,
    paddingEnd: 15,
  },

  submitButton: {
    width: '85%',
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },

  socialLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 10,
    paddingEnd: 10,
  },

  googleBtn: {
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 5,
  },

  facebookBtn: {
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 20,
    margin: 10,
    padding: 5,
  },

  google: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  facebook: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  googleIcon: {
    padding: 12,
    height: 20,
    width: 20,
    marginEnd: 10,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  facebookIcon: {
    padding: 12,
    height: 25,
    width: 25,
    marginEnd: 10,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  signUp: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});
