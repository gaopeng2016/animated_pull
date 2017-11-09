import React, {Component} from 'react'
import {View, Text, StyleSheet, Animated, Easing, Image} from 'react-native'

export default class Demo1 extends Component{

    state = {
        bounceValue : new Animated.Value(0),
        height: 100,
        width:100
    }

    componentDidMount() {
        // this.state.bounceValue.setValue(1.5)
        Animated.spring(this.state.bounceValue,{
            toValue:0.8,
            friction:1
        } ).start()
    }

    render () {
        return (
        <View style={styles.container}>
            <Animated.Image
                source={require('./demo.png')}
                style={{height:100, width:100, transform:[{scale:this.state.bounceValue}]}}/>

        </View>



        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})