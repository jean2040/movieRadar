import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-home-outline",30),
        Icon.getImageSource("ios-list-box-outline",30),
        Icon.getImageSource("ios-alert-outline",30)
    ]).then(icons => {
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen: "moviesRadar.ShowList",
                    label: "Home",
                    title: "Home",
                    icon: icons[0]
                },
                {
                    screen: "moviesRadar.Favorites",
                    label: "Favorites",
                    title: "Favorites",
                    icon: icons[1]
                },
                {
                    screen: "moviesRadar.RandomShow",
                    label: "Random",
                    title: "Random",
                    icon: icons[2]
                }
            ]
        });
    });


};

export default startTabs



