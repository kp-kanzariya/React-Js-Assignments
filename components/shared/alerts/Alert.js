import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import Toast from 'react-native-root-toast';

const AlertDanger = msg => {

  setTimeout(function () {
    Toast.hide(toast);
  }, 6000);

  let toast = Toast.show(`${msg}`, {
    duration: 6000,
    position: Toast.positions.TOP,
    // shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:'red',
    
    // shadowColor:'white',
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
  

};

const AlertWarning = (msg) => {
  // showMessage({
  //   message: `${msg}`,
  //   type: 'warning',
  //   hideStatusBar: true,
  // });

  setTimeout(function () {
    Toast.hide(toast);
  }, 5000);

  let toast = Toast.show(`${msg}`, {
    // duration: Toast.durations.LONG,
    duration: 5000,
    position: 50,
    // shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:'#DEC20B',
    opacity:1
    // shadowColor:'black',

  });

};

const AlertSuccess = msg => {
  // showMessage({
  //   message: `${msg}`,
  //   type: 'success',
  //   hideStatusBar: true,
  // });


  setTimeout(function () {
    Toast.hide(toast);
  }, 3000);

  let toast = Toast.show(`${msg}`, {
    duration: 3000,
    position: Toast.positions.TOP,
    // shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:'green',
    // shadowColor:'black',

  
  });


};

const ToastSuccess = msg => {
  // const [showAlert, setShowAlert] = useState(true);

  setTimeout(function () {
    Toast.hide(toast);
  }, 5000);

  let toast = Toast.show(`${msg}`, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:'green',

  });
};

export {AlertDanger, AlertWarning, AlertSuccess, ToastSuccess};
