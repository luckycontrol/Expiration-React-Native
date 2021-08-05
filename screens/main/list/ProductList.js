import React, { useRef, useState, useEffect } from 'react'
import { 
  TouchableOpacity,
  Image, 
  SafeAreaView,
  View,
  Text,
  Animated,
} from 'react-native'
import {
    SwipeableFlatList,
    SwipeableQuickActions,
    SwipeableQuickActionButton 
} from 'react-native-swipe-list' 
import { useSelector, useDispatch } from "react-redux"
import * as Haptics from "expo-haptics"
import ListCard from "./ListCard"
import { 
    getProducts     as GET_PRODUCT,
    deleteProduct   as DELETE_PRODUCT,
} from '../../../api/product/productApi'
import { productUpdate } from '../../../features/ProductUpdate/productUpdateSlice'
import url from '../../../api/url'

const ProductList = ({ navigation, menu, scaleValue, offsetValue, ScaleTransitionEffect }) => {

    const selectedCategory   = useSelector((state) => state.category.value);
    const productUpdateState = useSelector((state) => state.productUpdate.value);
    const dispatch           = useDispatch();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const LoadData = async () => {
            const result = await fetch(url, {
                method: "post",
                headers: {
                    "content-type"  : "application/json",
                    "accept"        : "application/json"
                },
                body: JSON.stringify({
                    query: GET_PRODUCT,
                    variables: {
                        email   : "cho",
                        type    : selectedCategory
                    }
                })
            })

            const { data: { getProducts } } = await result.json();
            setProduct(getProducts);
            
            if (productUpdateState == true) {
                dispatch(productUpdate(false));
            }
        }
        
        LoadData();
        

    }, [selectedCategory, productUpdateState])

    const deleteProduct = async (productId) => {
        const result = await fetch(url, {
            method: "post",
            headers: {
                "content-type"  : "application/json",
                "accept"        : "application/json"
            },
            body: JSON.stringify({
                query: DELETE_PRODUCT,
                variables: {
                    email   : "cho",
                    _id     : productId
                }
            })
        });

        const { data: { deleteProduct: { _id } } } = await result.json();
        
        if (!_id) {
            const newProduct = product.filter((product) => product._id !== productId);
            setProduct(newProduct);
        }
    }

    return (
        <Animated.View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                transform: [
                    { scale: scaleValue }, { translateX: offsetValue.x }, { translateY: offsetValue.y }
                ],
                borderRadius: menu ? 15 : 0,
            }}
        >
            <SafeAreaView>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 30,
                        marginTop: menu ? 30 : 0
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        ScaleTransitionEffect();
                        }}
                    >
                        <Image source={require("../../../assets/menu.png")} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 24, fontWeight: "500" }}>{selectedCategory}</Text>

                    <TouchableOpacity
                        onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        navigation.navigate("Add");
                        }}
                    >
                        <Image source={require("../../../assets/plus.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
                <SwipeableFlatList 
                    data={product}
                    renderItem={ListCard}
                    keyExtractor={item => item._id}
                    style={{ height: "100%", marginTop: 20 }}
                    refreshing={false}
                    onRefresh={() => {}}
                    renderRightActions={({ item }) => (
                        <SwipeableQuickActions style={{ alignItems: "center" }}>
                            <SwipeableQuickActionButton 
                                onPress={() => navigation.navigate("Edit", { item: item })} 
                                text="수정" 
                                style={{ width: 60, height: 80, backgroundColor: "orange" }} textStyle={{ color: "white", fontWeight: "bold"}} 
                            />
                            <SwipeableQuickActionButton 
                                onPress={() => deleteProduct(item._id)} 
                                text="삭제" 
                                style={{ width: 60, height: 80, backgroundColor: "red" }} textStyle={{ color: "white", fontWeight: "bold"}} 
                            />
                        </SwipeableQuickActions>
                    )}
                />
            </SafeAreaView>
        </Animated.View>
    )
}

export default ProductList
