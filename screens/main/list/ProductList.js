import React, { useRef, useState, useEffect } from 'react'
import { 
  TouchableOpacity,
  Image, 
  SafeAreaView,
  View,
  Text,
  Animated,
} from 'react-native'
import { FlatList, Center } from "native-base"
import { AnimatePresence } from "moti"
import { useSelector, useDispatch } from "react-redux"
import * as Haptics from "expo-haptics"
import ListCard from "./ListCard"
import { productAPI } from '../../../api'
import { productUpdate } from '../../../features/ProductUpdate/productUpdateSlice'
import Loading from '../../loading/Loading'
 
const ProductList = ({ navigation, menu, scaleValue, offsetValue, ScaleTransitionEffect }) => {

    const login              = useSelector((state) => state.account.info);
    const selectedCategory   = useSelector((state) => state.category.value);
    const productUpdateState = useSelector((state) => state.productUpdate.value);
    const dispatch           = useDispatch();

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // 서버에서 저장된 품목 로드
        const LoadData = async () => {
            setLoading(true)

            const {data: {data: {getProducts}}} = await productAPI.getProducts(login, selectedCategory)
            setProduct(getProducts);
            
            if (productUpdateState === true) {
                dispatch(productUpdate(false));
            }

            setLoading(false)
        }
        
        LoadData();
        
    }, [selectedCategory, productUpdateState])

    // 저장된 품목 삭제
    const deleteProduct = async (productId) => {
        const {data: {data: {deleteProduct: {_id}}}} = await productAPI.deleteProduct(login, productId)

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
                {/* 상단 */}
                <View
                    style={{
                        alignItems: "center",
                        marginHorizontal: 30,
                        marginVertical: menu ? 30 : 10
                    }}
                >
                    {/* 메뉴 버튼 */}
                    <TouchableOpacity
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            ScaleTransitionEffect();
                        }}

                        style={{ position: "absolute", left: 0 }}
                    >
                        <Image source={require("../../../assets/menu.png")} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>

                    {/* 선택된 카테고리 이름 */}
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{selectedCategory}</Text>

                    {/* 도움말 버튼, 추가 버튼 */}
                    <View style={{ position: "absolute", right: 0, flexDirection: "row", alignItems: "center" }} >
                        <TouchableOpacity>
                            <Image source={require("../../../assets/question-mark.png")} style={{ width: 17, height: 17, marginRight: 20 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                            navigation.navigate("Add");
                            }}
                        >
                            <Image source={require("../../../assets/plus.png")} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 저장된 품목들을 출력할 리스트 */}
                {
                    loading && (
                        <Loading />
                    )
                }
                {
                    !loading && (
                        <AnimatePresence>
                            <FlatList 
                                data={product}
                                renderItem={({item}) => (
                                    <ListCard 
                                        navigation={navigation} 
                                        item={item} 
                                        deleteProduct={deleteProduct} 
                                    />
                                )}
                            />
                        </AnimatePresence>
                    )
                }
                {
                    !loading && product.length === 0 && (
                        <Center h="full" pb={100}>
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>아무것도 없어요..!</Text>
                        </Center>
                    )
                }
            </SafeAreaView>
        </Animated.View>
    )
}

export default ProductList
