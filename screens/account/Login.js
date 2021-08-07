import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, Pressable, Button, Alert } from 'react-native'
import tw from "tailwind-react-native-classnames";
import { LOGIN } from '../../api/account/accountApi';
import { login as LOGIN_REDUCER } from '../../features/Account/accountSlice';
import { useDispatch } from 'react-redux';
import url from '../../api/url';
import * as Haptics from "expo-haptics"

const Login = ({ navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type": "application/json",
                "accept"      : "application/json"
            },
            body: JSON.stringify({
                query: LOGIN,
                variables: {
                    email   : email,
                    password: password
                }
            })
        });

        const { data: { login } } = await result.json();

        if (login === null) {
            Alert.alert(
                "로그인에 문제가 생겼어요!",
                "입력하신 계정이 존재하지 않거나 틀려요.",
                [
                    {
                        text: "알겠어요"
                    }
                ]
            )
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            dispatch(LOGIN_REDUCER(login));
        }
    }

    return (
        <SafeAreaView style={tw`w-full h-full justify-between`}>
            <View>
                <Text style={tw`m-5 text-3xl font-bold`}>로그인</Text>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>이메일</Text>
                    <TextInput style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`} onChangeText={setEmail} />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>비밀번호</Text>
                    <TextInput
                        style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`}
                        secureTextEntry={true} 
                        onChangeText={setPassword}
                    />
                </View>

                <View style={tw`flex items-center mt-10`}>
                    <Text style={tw`text-base font-medium`}>계정이 없으신가요?</Text>
                    <Button title="계정 생성" onPress={() => navigation.navigate("CreateAccount")}></Button>
                </View>
            </View>

            <View>
                <Pressable 
                    style={tw`mx-5 flex justify-center items-center h-14 bg-black rounded-xl shadow-md`}
                    onPress={handleLogin}
                >
                    <Text style={tw`text-white text-xl font-medium`}>로그인</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default Login
