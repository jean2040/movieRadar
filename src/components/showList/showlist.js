import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View, Text, Image} from 'react-native';

class showList extends React.Component{
    constructor(props){
        super(props);
        this.renderItem = this.renderItem.bind(this);

    }

    render(){
        return (
               <FlatList
                    ref='listRef'
                    data={this.props.data}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
        )
    };

    renderItem({item}){
        const image = 'https://image.tmdb.org/t/p/w154' + item.poster_path;
        return(
            <TouchableOpacity onPress={() => this.props.onItemSelected(item, "shows")}>
                <View style={styles.row}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Image
                        style={styles.poster}
                        source={{uri: image }} />
                    <Text numberOfLines={3} ellipsizeMode ={'tail'} style={styles.description}>
                        {item.overview}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    }


export default showList

const styles = StyleSheet.create({
    listContainer:{
        width: '90%'
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title:{
        fontSize: 20,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    },
    poster:{
        width: 150,
        height: 250,
        alignItems: 'center'
    }
});
