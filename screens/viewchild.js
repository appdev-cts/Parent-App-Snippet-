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
  Modal,
  Alert,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SwipeListView} from 'react-native-swipe-list-view';
import MonthPicker from 'react-native-month-year-picker';

export default class ViewChild extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      number: '',
      exp: '',
      code: '',
      modalVisible: false,

      storeyJson: [
        {
          id: 0,
          number: '3625142536145654',
          exp: '08/2022',
        },
        {
          id: 1,
          number: '1245256365541232',
          exp: '02/2025',
        },
        {
          id: 2,
          number: '5555256365541232',
          exp: '06/2023',
        },
      ],
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  btnSubmitClick = () => {
    var number = this.state.number;
    var exp = this.state.exp;
    var code = this.state.code;

    if (number.length != 16) {
      Alert.alert('Alert', 'Please fill valid card number!');
    } else if (exp == '') {
      Alert.alert('Alert', 'Please fill expiry date!');
    } else if (code.length != 3) {
      Alert.alert('Alert', 'Please fill valid code!');
    } else {
      const newData = [...this.state.storeyJson];
      newData.push({
        id: newData.length,
        number: number,
        exp: exp,
      });
      this.setState({
        storeyJson: newData,
        show: false,
        exp: '',
      });
      this.setModalVisible(!this.state.modalVisible);
    }
  };

  deleteItem = index => {
    const newData = [...this.state.storeyJson];
    newData.splice(index, 1);
    this.setState({
      storeyJson: newData,
    });
  };

  render() {
    return (
      <>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <SafeAreaView style={{flex: 1}}>
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
          <View>
            <ScrollView>
              <View
                style={{
                  marginStart: 20,
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Name :
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: '#343434',
                      marginStart: 10,
                    }}>
                    Child 1
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Age :
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginStart: 10,
                      color: '#343434',
                    }}>
                    20 Y
                  </Text>
                </View>
              </View>
            </ScrollView>
            <SwipeListView
              style={{
                marginTop: 20,
              }}
              data={this.state.storeyJson}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 5,
                    marginStart: 15,
                    marginEnd: 15,
                    marginTop: 10,
                    borderRadius: 5,
                    backgroundColor: '#f4f2f2',
                  }}>
                  <View style={styles.rowView}>
                    <Text
                      style={{
                        width: '80%',
                        color: '#5a5a5a',
                        fontSize: 14,
                      }}
                      numberOfLines={1}>
                      {item.number.substring(0, 2) +
                        '**********' +
                        item.number.substring(12, 16)}
                    </Text>

                    <Text
                      style={{
                        width: '20%',
                        fontSize: 12,
                        color: '#5a5a5a',
                        textAlign: 'right',
                      }}
                      numberOfLines={1}>
                      {item.exp}
                    </Text>
                  </View>
                </View>
              )}
              renderHiddenItem={(data, rowMap) => (
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    marginEnd: 15,
                    borderRadius: 5,
                    alignItems: 'center',
                    bottom: 0,
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    width: 75,
                    backgroundColor: 'red',
                    right: 0,
                  }}
                  onPress={() => {
                    this.deleteItem(data.index);
                  }}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              )}
              rightOpenValue={-80}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={() => {}}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                margin: 20,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    marginEnd:5,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'orange',
                  }}>
                  <Image
                    source={require('../assets/icons/plus.png')}
                    style={{
                      height: 15,
                      width: 15,
                      resizeMode: 'stretch',
                      alignItems: 'flex-start',
                    }}
                  />
                </View>

                <Text>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    margin: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 22,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    Add Card
                  </Text>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Text>Card Number</Text>
                    <View style={styles.inputView}>
                      <TextInput
                        style={styles.textinput}
                        keyboardType="numeric"
                        maxLength={16}
                        onChangeText={number =>
                          this.setState({number})
                        }></TextInput>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <View
                      style={{
                        flex: 0.5,
                        marginEnd: 10,
                      }}>
                      <Text>Exp. Date</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            show: true,
                          });
                        }}>
                        <View style={styles.inputView}>
                          <TextInput
                            editable={false}
                            style={styles.textinput}
                            value={this.state.exp}
                            onChangeText={code =>
                              this.setState({code})
                            }></TextInput>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flex: 0.5,
                        marginStart: 10,
                      }}>
                      <Text>Code</Text>
                      <View style={styles.inputView}>
                        <TextInput
                          style={styles.textinput}
                          keyboardType="numeric"
                          maxLength={3}
                          onChangeText={code =>
                            this.setState({code})
                          }></TextInput>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.submitButton}
                      underlayColor="#fff"
                      onPress={() => {
                        this.setState({
                          show: false,
                          exp: '',
                        });
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.submitText}>Cancle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.submitButton}
                      underlayColor="#fff"
                      onPress={this.btnSubmitClick}>
                      <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            {this.state.show && (
              <MonthPicker
                onChange={(event, newDate) => {
                  if (newDate) {
                    const date = new Date(newDate);

                    const m = date.getMonth() + 1;
                    const y = date.getFullYear();

                    this.setState({
                      show: false,
                      exp: m + '/' + y,
                    });
                  }
                }}
                value={new Date()}
                minimumDate={new Date()}
                maximumDate={new Date(2050, 5)}
              />
            )}
          </Modal>
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

  rowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView: {
    flexDirection: 'row',
    width: '100%',
    borderColor: '#FF5722',
    borderBottomWidth: 2,
    padding: 5,
  },
  textinput: {
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: 1,
    color:'#000000'
  },

  submitButton: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    marginStart: 10,
    marginEnd: 10,
  },

  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    paddingStart: 15,
    paddingEnd: 15,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
