import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';

const ModalRoot = props => {
  const { isMobile } = useSelector(state => state.isLandscape);
  return (
    <>
      {props.showModal && (
        <Modal
          testID={props.testID}
          // statusBarTranslucent={true}
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {

            if (props.disableBackPress) {
            } else {
              props.setShowModal(false);
            }
          }}
        >

          <KeyboardAvoidingView behavior= {isMobile? 'height':'padding'} enabled={props.enabled} style={{ flex: 1 }}>

            <View
              // onPress={()=>{props.setShowModal(!props.showModal);}}
              style={{
                ...styles.centeredView,
                backgroundColor: props.backgroundColor,
              }}>

              <View
                style={{
                  ...styles.modalView,
                  padding: props.padding,
                  width: props.width,
                  height: props.height,
                  maxHeight: '90%',
                  // overflow: 'hidden',
                  borderRadius: props.borderRadius,
                }}>
                {props.content}
              </View>

            </View>
          </KeyboardAvoidingView>

        </Modal>
      )}

    </>
  );
};

ModalRoot.defaultProps = {
  showModal: false,
  setShowModal: () => { },
  width: '90%',
  height: 'auto',
  borderRadius: 20,
  content: (
    <View>
      <Text>Please Add content</Text>
    </View>
  ),
  padding: 25,
  backgroundColor: 'rgba(0,0,0,0.4)',
  disableBackPress: false,
  enabled: true,
  testID:'modalRoot'
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',

    // borderRadius: 20,

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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalRoot;
