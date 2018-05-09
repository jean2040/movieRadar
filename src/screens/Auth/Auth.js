import React , { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Dimensions } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import Inputs from '../../components/UIComponents/Inputs/inputs';
import validate from "../../utility/validation";
import { tryAuth } from "../../store/actions/index";
import { connect } from "react-redux";

class AuthScreen extends Component{

    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    };

    loginHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs();
    };

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            };
        });
    };



    render(){
        let confirmPasswordControl = null;
        let switchFormButton = null;

        if (this.state.authMode === "signup") {

            confirmPasswordControl = (
                <View>
                    <Inputs
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        }

        if (this.state.authMode === "signup"){
            switchFormButton = (
                <Button onPress={this.switchAuthModeHandler} title={"Switch to Login"} />
            );
        } else {
            switchFormButton = (
                <Button onPress={this.switchAuthModeHandler} title={"Switch to Register"} />
            );
        }

        return(
            <View style={styles.container}>
                <Text style={styles.textHeading}>Please Log in</Text>
                {switchFormButton}
                <View style={styles.inputContainer}>
                    <Inputs
                        placeholder={"E-mail address"}
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText={val => this.updateInputState("email", val)}
                        valid={this.state.controls.email.valid}
                        touched={this.state.controls.email.touched}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                    <Inputs
                        placeholder="Password"
                        style={styles.input}
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState("password", val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                        secureTextEntry
                    />
                    {confirmPasswordControl}
                </View>

                <Button
                    title={"Submit"}
                    onPress={this.loginHandler}
                    disabled={
                        !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
                        !this.state.controls.email.valid ||
                        !this.state.controls.password.valid
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: "80%"
    },
    input:{
        width: "100%",
        padding: 5,
        margin: 5
    },
    textHeading:{
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: authData => dispatch(tryAuth(authData))
    };
};

export default connect(null, mapDispatchToProps)(AuthScreen);
