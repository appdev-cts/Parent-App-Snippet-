import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

export default class ForgotPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }

  btnSubmitClick = () => {
    var email = this.state.email;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email == '') {
      Alert.alert('Alert', 'Please fill email!');
    } else if (reg.test(email) === false) {
      Alert.alert('Alert', 'Email is not correct!');
    } else {
      Navigation.pop(this.props.componentId);
    }
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={styles.back}>
              <TouchableOpacity
                style={styles.backbtn}
                onPress={() => {
                  Navigation.pop(this.props.componentId);
                }}>
                <Image
                  source={require('../assets/icons/back.png')}
                  style={styles.backImg}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoImg}
                  />

                  <Text style={styles.title}>Forgot Password</Text>

                  <View style={styles.inputView}>
                    <Image
                      source={require('../assets/icons/email.png')}
                      style={styles.userImgIcon}
                    />
                    <TextInput
                      style={styles.textinput}
                      placeholder="Email"
                      onChangeText={email =>
                        this.setState({email})
                      }></TextInput>
                  </View>

                  <TouchableOpacity
                    style={styles.submitButton}
                    underlayColor="#fff"
                    onPress={this.btnSubmitClick}>
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
              <View style={styles.signIn}>
                <Text>Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    Navigation.pop(this.props.componentId);
                  }}>
                  <Text style={{padding: 5}}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  backbtn: {
    marginStart: 10,
    height: 25,
    width: 25,
  },

  backImg: {
    height: 22,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'flex-start',
  },

  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinnerTextStyle: {
    color: '#FFF',
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

  signIn: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});
