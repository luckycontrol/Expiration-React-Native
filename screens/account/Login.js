import React, { useState } from 'react'
import { Input, Pressable } from "native-base"

import { View, Text, SafeAreaView, Alert } from 'react-native'
import { LOGIN } from '../../api/account/accountApi';
import { login as LOGIN_REDUCER } from '../../features/Account/accountSlice';
import { useDispatch } from 'react-redux';
import url from '../../api/url';
import * as Haptics from "expo-haptics"

import db, { saveLoginStatus } from '../../sqlite/sqlite';

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
            saveLoginStatus(db, { email: login.email, name: login.name });
        }
    }

    return (
        <SafeAreaView style={{ width: "100%", height: "100%", justifyContent: "space-between" }}>
            <View>
                <Text style={{ margin: 20, fontSize: 36, fontWeight: "bold" }}>유통기한 관리사</Text>

                <View style={{ margin: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>이메일</Text>
                    <Input height={55} rounded="xl" mt="3" p="2" bg="gray.200" shadow={0.5} borderColor="gray.200" fontSize="md"
                        onChangeText={setEmail} 
                        autoCapitalize="none" 
                    />
                </View>

                <View style={{ margin:20 }}>
                    <Text style={{ fontWeight: "bold" }}>비밀번호</Text>
                    <Input height={55} rounded="xl" mt="3" p="2" bg="gray.200" shadow={0.5} borderColor="gray.200" fontSize="md"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>

                <View style={{ alignItems: "center", marginTop: 50 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>계정이 없으신가요?</Text>
                    <Pressable onPress={() => navigation.navigate("CreateAccount")}>
                        <Text style={{ marginTop: 10, color: 'dodgerblue', fontSize: 16, fontWeight: "bold" }}>계정 생성</Text>
                    </Pressable>
                </View>
            </View>

            <View>
                <Pressable mx="5" justifyContent="center" alignItems="center" h={55} bg="black" rounded="xl" shadow="1"
                    onPress={handleLogin}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>로그인</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default Login
