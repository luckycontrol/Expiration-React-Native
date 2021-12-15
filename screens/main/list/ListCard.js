import React from 'react'
import { View, Text, Image, Pressable } from 'native-base'
import { MotiView } from "moti"
import { 
    useAnimatedGestureHandler,
    useSharedValue,
    withTiming,
    useAnimatedStyle
} from "react-native-reanimated"
import { 
    PanGestureHandler,
} from "react-native-gesture-handler"

const ListCard = ({ navigation, item, deleteProduct }) => {

    const expiration = new Date(item.expiration);

    const checkExpiration = () => {
        const sample_expiration = new Date(expiration.setHours(0, 0, 0, 0));

        const oneLeft = new Date(sample_expiration.setDate(sample_expiration.getDate()));
    
        const three   = new Date(sample_expiration.setDate(sample_expiration.getDate() - 1));

        const week    = new Date(sample_expiration.setDate(sample_expiration.getDate() - 3));

        const now     = new Date(new Date().setHours(0, 0, 0, 0));

        if (now < week) {
            return ["일주일", require("../../../assets/expiration/일주일.png")];
        }
        else if (now < three) {
            return ["사흘", require("../../../assets/expiration/사흘.png")];
        }
        else if (now <= oneLeft) {
            return ["하루", require("../../../assets/expiration/하루.png")];
        }
        else {
            return ["지남", require("../../../assets/expiration/지남.png")];
        }
    }

    const offset = useSharedValue(0)

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
            ctx.x = offset.value
        },
        onActive: ({translationX}, ctx) => {
            if (translationX < 0) {
                offset.value = ctx.x + translationX
                if (ctx.x + translationX < -200) {
                    offset.value = -200
                }
            }
        },
        onEnd: ({translationX}) => {
            if (translationX < -100) {
                offset.value = withTiming(-200, { duration: 200 })
            } else {
                offset.value = withTiming(0, { duration: 200 })
            }
        }
    })

    return (
        <View 
            style={{
                position: "relative", 
                width: "100%", 
                height: 70,
                justifyContent: "center" 
            }}
        >
            {/* ITEM */}
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <MotiView
                    from={{opacity: 0, translateX: 100}}
                    animate={{opacity: 1, translateX: 0}}
                    exit={{opacity: 0, translateX: -100}}
                    transition={{type: "timing", duration: 200}}
                    style={useAnimatedStyle(() => ({
                        width: "100%",
                        height: 70,
                        zIndex: 1,
                        elevation: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        paddingHorizontal: 15,
                        borderBottomWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.02)",
                        transform: [
                            {"translateX": offset.value}
                        ]
                    }))}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Image style={{width: 40, height: 40, borderRadius: 10}} source={ item.image ? { uri: item.image } : require("../../../assets/favicon.png")} alt="" />
                        <View style={{marginLeft: 15}}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{fontSize: 18, fontWeight: "500"}}>{item.name}</Text>
                                <Image 
                                    style={{ width: 10, height: 10, marginLeft: 5 }}
                                    source={checkExpiration()[1]}
                                    alt=""
                                />
                            </View>
                            <Text style={{fontSize:16, fontWeight: "500"}}>{item.type}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: "500"}}>
                            {`${expiration.getFullYear()}년 ${expiration.getMonth() + 1}월 ${expiration.getDate()}일`}
                        </Text>
                    </View>
                </MotiView>
            </PanGestureHandler>
            {/* EDIT, REMOVE */}
            <MotiView
                from={{opacity: 0, translateX: 100}}
                animate={{opacity: 1, translateX: 0}}
                exit={{opacity: 0, translateX: -100 }}
                style={{position: "absolute", right: 0, flexDirection: "row"}}
                transition={{type: "timing", duration: 200}}
            >
                <View
                    style={{
                        width: 100,
                        height: 70,
                        backgroundColor: "orange",
                        position: "relative",
                        right: 0,
                    }}
                >
                    <Pressable
                        style={{
                            width: 100,
                            height: 70,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => navigation.navigate("Edit", {item: item})}
                    >
                        <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>수정</Text>
                    </Pressable>
                </View>
                <View
                    style={{
                        width: 100,
                        height: 70,
                        backgroundColor: "red",
                        position: "relative",
                        right: 0,
                    }}
                >
                    <Pressable
                        style={{
                            width: 100,
                            height: 70,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onPress={() => deleteProduct(item._id)}
                    >
                        <Text style={{color: "white", fontSize: 16, fontWeight: "bold"}}>삭제</Text>
                    </Pressable>
                </View>
            </MotiView>
        </View>
    )
}

export default ListCard
