import { Navigation } from 'react-native-navigation';
import {Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth/Auth';
import ShowListScreen from './src/screens/showList/showList';
import RandomShow from './src/screens/RandomShow/RandomShow';
import Favorites from './src/screens/Favorites/Favorites';
import configureStore from './src/store/configureStore';

const store = configureStore();


//Register screens
Navigation.registerComponent("moviesRadar.AuthScreen", () => AuthScreen, store, Provider);
Navigation.registerComponent("moviesRadar.ShowList", () => ShowListScreen, store, Provider);
Navigation.registerComponent("moviesRadar.RandomShow", () => RandomShow, store, Provider);
Navigation.registerComponent("moviesRadar.Favorites", () => Favorites, store, Provider);

// Starting App
Navigation.startSingleScreenApp({
    screen:{
        screen: 'moviesRadar.AuthScreen',
        title: "Login"
    }
});
