import React from 'react';
import { StyleSheet,View, Switch, Text} from 'react-native';
import {getData} from "../../../store/actions";
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    switch: {
        overflow: 'hidden',
        width: 40,
        height: 34,
        borderRadius: 34 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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
            this.setState({titleText: "TV Shows"});

        }
        else{
            //Perform any task here which you want to execute on Switch OFF event.
            this.props.onGetData("movie");
            this.setState({titleText: "Movies"});


        }

    };


    render() {
        return (

            <View>
                <Switch
                    style={styles.switch}
                    onValueChange={(value) => this.ShowAlert(value)}
                    value={this.state.switchValue}
                />
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
