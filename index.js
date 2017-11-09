import React, {Component} from 'react'
import { AppRegistry, Text } from 'react-native';
import Demo1 from './src/Demo1';
import Pull from './src/pull'


class App extends Component {
    render () {
        return (
            <Pull>
                <Text>hahaha</Text>
            </Pull>
        )
    }
}



AppRegistry.registerComponent('animation_demo', () => App);
