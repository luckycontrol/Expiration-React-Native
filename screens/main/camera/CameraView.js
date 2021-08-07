import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import { Camera } from 'expo-camera'

const CameraView = ({ navigation, route }) => {

    const [isCameraReady, setIsCameraReady] = useState(false);
    const [captureImage, setCaptureImage] = useState(null);
    const cameraRef = useRef();

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestPermissionsAsync();
          if (status !== "granted") {
            navigation.goBack();
          }
        })();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCaptureImage(photo.uri);
        }
    }


    return (
        <>
        {
            captureImage == null ? (
                <Camera 
                    style={{ height: "100%" }}
                    onCameraReady={onCameraReady}
                    ref={cameraRef}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Image source={require("../../../assets/close.png")} style={{ position: "absolute", top: 40, right: 40, width: 20, height: 20, }} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ position: "absolute", bottom: 60, alignSelf: "center" }}
                        onPress={takePicture}
                    >
                        <View style={{ width: 60, height: 60, backgroundColor: "white", borderRadius: 50 }} ></View>
                    </TouchableOpacity>
                </Camera>
            ) : (
                <View>
                    <Image source={{ uri: captureImage, height: "90%" }} />
                    <View style={{ height: "10%", backgroundColor: "black", flexDirection: "row", justifyContent: 'space-around', paddingTop: 20 }}>
                        <TouchableOpacity onPress={() => {
                            const path = route.params.path;

                            navigation.navigate(path, {
                                image: captureImage,
                                item: route.params.item
                            })
                        }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>사진 사용</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setCaptureImage(null)} >
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        </>
    )
}

export default CameraView
