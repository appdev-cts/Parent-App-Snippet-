/**
 * @format
 */

// import App from './App';
// import {name as appName} from './app.json';
// import { AppRegistry } from 'react-native';
// AppRegistry.registerComponent(appName, () => App);

import {Navigation} from 'react-native-navigation';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Home from './screens/home';
import ForgotPass from './screens/forgotpass';
import { LogBox } from 'react-native';
import ViewChild from './screens/viewchild';

LogBox.ignoreAllLogs(true);

Navigation.registerComponent('SignIn', () => SignIn);
Navigation.registerComponent('SignUp', () => SignUp);
Navigation.registerComponent('ForgotPass', () => ForgotPass);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('ViewChild', () => ViewChild);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "SignIn",
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
});
