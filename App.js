import { Navigation } from 'react-native-navigation';
import {Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import ShowListScreen from './src/screens/showListScreen/showListScreen';
import RandomShow from './src/screens/RandomShow/RandomShow';
import Favorites from './src/screens/Favorites/Favorites';
import SwitchButton from './src/screens/ui/switchButton/switchButton';
import SideDrawer from './src/screens/sideDrawer/sideDrawer'
import configureStore from './src/store/configureStore';

const store = configureStore();


//Register screens
Navigation.registerComponent("moviesRadar.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("moviesRadar.ShowList", () => ShowListScreen, store, Provider);
Navigation.registerComponent("moviesRadar.RandomShow", () => RandomShow, store, Provider);
Navigation.registerComponent("moviesRadar.Favorites", () => Favorites, store, Provider);
Navigation.registerComponent('SwitchButton', () => SwitchButton, store, Provider);
Navigation.registerComponent("moviesRadar.SideDrawer", () => SideDrawer );

// Starting App
Navigation.startSingleScreenApp({
    screen:{
        screen: 'moviesRadar.AuthScreen',
        title: "Login"
    }
});
