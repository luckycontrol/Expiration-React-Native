import React, { useState, useEffect } from 'react'
import { 
    View, 
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import { BarCodeScanner } from "expo-barcode-scanner"
import * as Haptics from "expo-haptics"

const BarCodeScannerView = ({ navigation }) => {

    const [isScan, setIsScan] = useState(false);

    useEffect(() => {
        async () => {
            // 카메라 사용 허용 여부 확인
            const { status } = await BarCodeScanner.requestPermissionsAsync();

            if (status !== "granted") {
                navigation.goBack();
            }
        }
    }, [])

    function handleBarCodeScan({ data, target }) {
        setIsScan(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log(data, target);

        navigation.goBack();
    }

    return (
        <BarCodeScanner
            onBarCodeScanned={isScan ? undefined : handleBarCodeScan}
            style={{ flex: 1, flexDirection: "column" }}
        >
            <View style={{ flex: 1.5, backgroundColor: opacity, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }} >영역안에서 바코드를 스캔해주세요.</Text>
            </View>
            <View style={{ flex: 0.5, flexDirection: "row" }}>
                <View style={{ flex: 0.5, backgroundColor: opacity }} />
                <View style={{ flex: 2 }} />
                <View style={{ flex: 0.5, backgroundColor: opacity }} />
            </View>
            <View style={{ flex: 1.5, backgroundColor: opacity }} />

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", top: 0, left: 0, marginTop: 50, marginLeft: 30 }} >
                <Image source={require("../../../assets/close.png")} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
        </BarCodeScanner>
    )
}

const opacity = 'rgba(0, 0, 0, .6)';

export default BarCodeScannerView
