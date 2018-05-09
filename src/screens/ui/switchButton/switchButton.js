import React from 'react';
import { StyleSheet, View, Switch, Text} from 'react-native';
import {getData} from "../../../store/actions";
import { connect } from 'react-redux';

// Our custom component we want as a button in the nav bar
class SwitchButton  extends React.Component{
    constructor(){
        super();
        this.state={
            switchValue : false,
            titleText: "Movies"
        }
    }

    ShowAlert = (value) =>{

        this.setState({
            switchValue: value
        });

        if(value === true)
        {
            //Perform any task here which you want to execute on Switch ON event.
            this.props.onGetData("tv");
            this.setState({titleText: "TV"});

        }
        else{
            //Perform any task here which you want to execute on Switch OFF event.
            this.props.onGetData("movie");
            this.setState({titleText: "Movies"});


        }

    };


    render() {
        return (



            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>

                <Switch
                    style={styles.switch }
                    onValueChange={(value) => this.ShowAlert(value)}
                    value={this.state.switchValue}
                />
                    <Text style={styles.titleType}>
                        {this.state.titleText}
                    </Text>



            </View>


        )
    }
};
const mapStateToProps = state => {
    return {
        data: state.data,
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onGetData:(value)=>dispatch(getData(value))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SwitchButton);

const styles = StyleSheet.create({
    titleType:{
        fontSize: 16,
        fontWeight: "500",
    },
});
