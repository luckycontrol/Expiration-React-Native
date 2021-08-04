import React, { useState, useRef } from 'react'
import { View, Text, SafeAreaView, Animated } from 'react-native'
import ProductList from './list/ProductList'
import Menu from './menu/Menu'

const Main = ({ navigation }) => {

    const [menu, setMenu] = useState(false);

    const offsetValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const ScaleTransitionEffect = () => {
        Animated.timing(scaleValue, {
            toValue: menu ? 1 : 0.78,
            duration: 300,
            useNativeDriver: true 
        }).start();

        Animated.timing(offsetValue, {
            toValue: menu ? { x: 0, y: 0 } : { x: 220, y: 0 },
            duration: 300,
            useNativeDriver: true
        }).start()

        setMenu(!menu);
    }

    return (
        <View>
            <Menu setMenu={setMenu} ScaleTransitionEffect={ScaleTransitionEffect} />
            <ProductList navigation={navigation} menu={menu} setMenu={setMenu} scaleValue={scaleValue} offsetValue={offsetValue} ScaleTransitionEffect={ScaleTransitionEffect} />
        </View>
    )
}

export default Main
