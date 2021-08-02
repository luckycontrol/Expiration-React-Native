import { Result } from 'postcss'
import React, { Component } from 'react'
import { Alert, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import tw from "tailwind-react-native-classnames"

const CreateAccount = ({ navigation }) => {

    const ResultAlert = () => {
        Alert.alert(
            "TITLE",
            "MESSAGE",
            [
                {
                    text: "OK"
                },
                {
                    text: "Cancel",
                    style: "destructive"
                }
            ]
        )
    }

    return (
        <SafeAreaView style={tw`w-full h-full justify-between`}>
            <View>
                <Text style={tw`m-5 text-3xl font-bold`}>회원가입</Text>

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
            </View>
            <View>
                <Pressable 
                    style={tw`mx-5 flex justify-center items-center h-14 bg-black rounded-xl shadow-md`}
                    onPress={ResultAlert}
                >
                    <Text style={tw`text-white text-xl font-medium`}>회원가입</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
    
}

export default CreateAccount
