import { View, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import React from 'react';
import ImgToBase64 from 'react-native-image-base64';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import FA from 'react-native-vector-icons/FontAwesome';
import { ImageHeight, ImageWidth } from '../../../helper/constant/constant';

export default function Attachment(props) {
  const [filePath, setFilePath] = React.useState('');

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        // alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type, mediaby) => {
    let options = {
      mediaType: type,
      maxWidth: ImageWidth,
      maxHeight: ImageHeight,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      selectionLimit: 3,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      mediaby(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response);
        response.assets.map(i => {
          ImgToBase64.getBase64String(`${i.uri}`).then(base64String => {
            props.onPress(base64String);
            props.setImageURL(base64String)
            let body = {
              imgurl: base64String,
              id: i.fileName,
            };
            dispatch({
              type: 'ADD_TICKET_IMAGES',
              payload: [i.fileName, body],
            });
            setRefresh(!refresh);
            setTemparr(temparr + response.assets.length);
          });
        });
      });
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => captureImage('photo', launchCamera)}>
        <View>
          <FA name="camera" size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
Attachment.defaultProps = {
  left: 0,
  top: 10,
  margin: 0,
  right: 0,
};
