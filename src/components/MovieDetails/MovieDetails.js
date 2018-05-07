import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, ScrollView } from 'react-native';

const itemDetails = (props) => {

    const onAddFavorites = () => {

        const myFavorite = {
                movieTitle: props.selectedItem.title,
                poster_path: props.selectedItem.poster_path,
                vote: props.selectedItem.vote_average,
                release_date: props.selectedItem.release_date,
                overview: props.selectedItem.overview
        };

        props.onAddFavorite(myFavorite)

        /*fetch("https://movieradar-b41ec.firebaseio.com/favorites.json", {
            method: "POST",
            body: JSON.stringify(myFavorite)
        })
            .catch(err => console.log(err))
            .then(res => res.json())
            .then(parsedRef => {
                console.log(parsedRef)
            });*/

    };
    let modalContent = null;
    if(props.selectedItem){
        const image = 'https://image.tmdb.org/t/p/w154' + props.selectedItem.poster_path;
        modalContent = (
            <ScrollView>
            <View>
                <Text style={styles.movieName}>{props.selectedItem.title}</Text>
                <Image
                    style={styles.poster}
                    source={{uri: image }} />
                <Text>Rating {props.selectedItem.vote_average}</Text>
                <Text>Release Date {props.selectedItem.release_date}</Text>
                <Text>{props.selectedItem.overview}</Text>
            </View>
            </ScrollView>
        );
    }
    let buttonContent = null;

    if(props.modalType === "shows"){
        buttonContent = (
            <Button onPress={onAddFavorites} style={styles.buttons} title={"Add to My List"} color={'#33ADFF'}/>
        )
    }else{
        buttonContent = (
            <Button onPress={onAddFavorites} style={styles.buttons} title={"Remove from My List"} color={'#33ADFF'}/>
        )
    }
    return(

        <Modal onRequestClose={props.onModalClose} visible={props.selectedItem != null} animationType={'slide'}>
            <View style={styles.modal}>
                {modalContent}
                {buttonContent}
                <Button style={styles.buttons} title={"Close"} color={"red"} onPress={props.onModalClose}/>
            </View>
        </Modal>


    )
};

export default itemDetails;

const styles = StyleSheet.create({

    poster:{
        alignSelf: 'center',
        width: 150,
        height: 250,
        margin: 20

    },

    buttons:{
        width: '90%',
        marginTop: 15
    },
    movieName:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25
    },
    modal:{
        padding: 20
    }
});
