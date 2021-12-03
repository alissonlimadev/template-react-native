/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Remote debugger is in a background',
  'Non-serializable',
  'Node of type',
  'Failed prop type',
  'Module RNRSA',
  'Module RNRSAKeychain',
  'VirtualizedLists',
  'Node of type rule not supported as an inline style',
  'Encountered two',
  "Can't perform a React state update",
  'Task orphaned',
  'Require cycle',
  //temp
  'Possible Unhandled Promise',
  'Required dispatch_sync to',
  'RCTBridge required',
  '@platformbuilders/react-native-ui: received',
]);

AppRegistry.registerComponent(appName, () => App);
