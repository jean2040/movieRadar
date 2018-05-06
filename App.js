import { Navigation } from 'react-native-navigation'
import AuthScreen from './src/screens/Auth/Auth'

//Register screens
Navigation.registerComponent("moviesRadar.AuthScreen", () => AuthScreen);

// Starting App
Navigation.startSingleScreenApp({
    screen:{
        screen: 'moviesRadar.AuthScreen',
        title: "Login"
    }
});
