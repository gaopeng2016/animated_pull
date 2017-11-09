import React, { Component } from 'react';
import { Dimensions , StyleSheet, Animated, Easing, PanResponder } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
export default class Pull extends Component {

    xx = 0;
    constructor(props){
        super(props)
        this.translateY = new Animated.Value(0)

    }

    componentDidMount() {

    }

    componentWillMount() {

            this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => {
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

                let dy = gestureState.dy;
                let y0 = gestureState.y0;
                let moveY = gestureState.moveY;
                let b =  y0 / deviceHeight;
                let y = y0 - y0 * b; // 表示视图y轴坐标

                console.log(dy, 'dy')
                console.log(deviceHeight, 'deviceHeight')
                console.log(b, 'b')
                console.log(gestureState.y0, 'y0')
                console.log(gestureState.moveY, 'moveY')
                console.log('------------------------------')

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