import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image, 
    TextInput
} from 'react-native'

const ChangePassword = () => {

    const [password, setPassword] = useState("");

    function handleClickBackBtn() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ height: "100%", backgroundColor: "white", justifyContent: "space-between" }} >
            {/* 타이틀 */}
            <View>
                <View style={{ marginHorizontal: 20, marginVertical: 20, alignItems: "center", justifyContent: "center" }} >
                    <TouchableOpacity style={{ position: "absolute", left: 0 }} onPress={handleClickBackBtn} >
                        <Image source={require("../../../assets/left-chevron.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 22, fontWeight: "500" }}>비밀번호 변경</Text>
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 20 }} >
                    <TextInput 
                        placeholder={"새로운 비밀번호를 입력해주세요."}
                        secureTextEntry={true}
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: "#bbb",
                            height: 50,
                        }}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
            </View>
            <View style={{ alignItems: "center" }} >
                <TouchableOpacity style={{ 
                    width: "90%",
                    height: 50,
                    backgroundColor: "orange",
                    borderRadius: 10,
                    shadowOffset: {
                        width: 2,
                        height: 0,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    }} 
                >
                    <Text style={{ color: "white", fontWeight: "500" }} >알림 설정</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword
