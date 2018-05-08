import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, ScrollView } from 'react-native';

const FavoriteDetails = (props) => {

    const onDeleteFavorites = () => {

        props.onDeleteShow(props.selectedItem.id)
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


    return(

        <Modal onRequestClose={props.onModalClose} visible={props.selectedItem != null} animationType={'slide'}>
            <View style={styles.modal}>
                {modalContent}
                <Button onPress={onDeleteFavorites} style={styles.buttons} title={"Remove from My List"} color={'#33ADFF'}/>
                <Button style={styles.buttons} title={"Close"} color={"red"} onPress={props.onModalClose}/>
            </View>
        </Modal>


    )
};

export default FavoriteDetails;

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
