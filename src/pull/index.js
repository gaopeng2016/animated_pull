import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing, PanResponder } from 'react-native';


const zu = 0.9;
export default class Pull extends Component {

    xx = 0;

    constructor(props){
        super(props)
        this.translateY = new Animated.Value(0)

    }

    componentDidMount() {

    }

    test = (evt,gestureState) => {
        console.log(gestureState.dy, 'params');
    }

    componentWillMount() {

            this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => {
                // console.log(evt, 'evt');
                // console.log(gestureState.dy, 'gestureState');
                return true;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                return true
            },

            onPanResponderGrant: (evt, gestureState) => {

            },
            // onPanResponderMove: Animated.event(
            //     [null, { dy : this.translateY.y }], // map gesture to leader
            //
            //
            // ),
            onPanResponderMove: (evt, gestureState) => {
                if(gestureState.dy < 0)
                    return;
                this.xx += gestureState.dy;

                let y = gestureState.dy;
                // this.translateY.setValue(y);
                Animated.spring(this.translateY, {
                    toValue: y,
                    // tension: 80,
                }).start()

            },

            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: () => {
                Animated.spring(
                    this.translateY,         // Auto-multiplexed
                    {
                        toValue: 0,
                        friction:100,
                        tension: 80,        //拉力
                    } // Back to zero
                ).start();
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return true;
            },
        });

    }




    render () {
        return (
            <Animated.View  style={[styles.container, {
                transform:[{
                    translateY: this.translateY
                }]
            }]} {...this._panResponder.panHandlers}>
                {this.props.children}
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red'
    }
});