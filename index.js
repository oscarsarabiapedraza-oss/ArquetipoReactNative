import {AppRegistry} from 'react-native';
import InitialScreen from './src/core/presentation/common/screens/InitialScreen';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => InitialScreen);

