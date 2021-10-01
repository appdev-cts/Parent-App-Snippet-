import React from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {SwipeListView} from 'react-native-swipe-list-view';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      age: '',
      modalVisible: false,
      storeyJson: [
        {
          id: 0,
          name: 'Child 1',
          age: '20',
        },
        {
          id: 1,
          name: 'Child 2',
          age: '21',
        },
        {
          id: 2,
          name: 'Child 3',
          age: '25',
        },
        {
          id: 3,
          name: 'Child 4',
          age: '18',
        },
        {
          id: 4,
          name: 'Child 5',
          age: '16',
        },
      ],
    };
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  btnSubmitClick = () => {
    var name = this.state.name;
    var age = this.state.age;

    if (name == '') {
      Alert.alert("Alert",'Please fill name!');
    } else if (age == '') {
      Alert.alert("Alert",'Please fill age!');
    } else {
      const newData = [...this.state.storeyJson];
      newData.push({
        id: newData.length,
        name: name,
        age: age,
      });
      this.setState({
        storeyJson: newData,
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
          <View style={{flex: 1}}>
            <View style={styles.appbar}>
              <Text style={styles.appbarTitle}>Home</Text>
            </View>

            <View style={{flex: 1}}>
              <SwipeListView
                data={this.state.storeyJson}
                renderItem={({item}) => (
                  <View
                    style={{
                      padding: 10,
                      marginStart: 15,
                      marginEnd: 15,
                      marginTop: 10,
                      borderRadius: 5,
                      backgroundColor: '#f4f2f2',
                    }}>
                    <TouchableOpacity
                      style={styles.rowView}
                      onPress={() => {
                        Navigation.push(this.props.componentId, {
                          component: {
                            name: 'ViewChild',
                            options: {
                              topBar: {
                                visible: false,
                              },
                            },
                          },
                        });
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          width: '80%',
                        }}
                        numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          width: '20%',
                          fontSize: 12,
                          color: '#5a5a5a',
                          textAlign: 'right',
                        }}
                        numberOfLines={1}>
                        {item.age} Y
                      </Text>
                    </TouchableOpacity>
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
                onRowDidOpen={()=>{}}
              />
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
                <Text style={styles.modalTitle}>Add New Child</Text>

                <View style={styles.inputView}>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Name"
                    onChangeText={name => this.setState({name})}></TextInput>
                </View>

                <View style={styles.inputView}>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Age"
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={age => this.setState({age})}></TextInput>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    underlayColor="#fff"
                    onPress={() => {
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
          </Modal>

          <View style={styles.roundButtonView}>
            <TouchableOpacity
              style={styles.roundButton}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Image
                source={require('../assets/icons/plus.png')}
                style={{
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  appbar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  appbarTitle: {
    fontSize: 20,
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
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },

  textinput: {
    width: '75%',
    paddingVertical:0
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

  roundButtonView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 30,
    marginBottom: 50,
  },

  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'orange',
  },
});
