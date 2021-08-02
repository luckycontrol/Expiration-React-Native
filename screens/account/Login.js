import React from 'react'
import { View, Text, SafeAreaView, TextInput, Pressable, Button } from 'react-native'
import tw from "tailwind-react-native-classnames";

const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={tw`w-full h-full justify-between`}>
            <View>
                <Text style={tw`m-5 text-3xl font-bold`}>로그인</Text>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>이메일</Text>
                    <TextInput style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`} />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-base text-base font-medium`}>비밀번호</Text>
                    <TextInput
                        style={tw`h-14 rounded-xl mt-3 p-2 bg-gray-200 border border-gray-200 shadow-sm`}
                        secureTextEntry={true} 
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
                >
                    <Text style={tw`text-white text-xl font-medium`}>로그인</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    )
}

export default Login
