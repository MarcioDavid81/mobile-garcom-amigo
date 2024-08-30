import React, { useState, useEffect } from "react";
import { Text, 
    View, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet,
    Modal,
    FlatList
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "@/src/services/api";
import { ModalPicker } from "@/src/components/ModalPicker";
import { ListItem } from "@/src/components/ListItem";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "@/src/routes/app.routes";

type RouterDetailParams = {
    Order: {
        number: string | number;
        client: string;
        order_id: string;
    }
}

export type CategoryProps = {
    id: string;
    name: string;
}

type ProductProps = {
    id: string;
    name: string;
}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouterDetailParams, "Order">;

export default function Order() {

    const route = useRoute<OrderRouteProps>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [prodcts, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [observation, setObservation] = useState('');
    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);
    const [modalProductVisible, setModalProductVisible] = useState(false);

    useEffect(() => {
        async function loadCategories() {
            const response = await api.get("/category");

            setCategory(response.data);
            setCategorySelected(response.data[0]);
        }

        loadCategories();
    }, []);

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get("/category/product", {
                params: {
                    category_id: categorySelected?.id
                }
            });

            setProducts(response.data);
            setProductSelected(response.data[0]);
        }

        loadProducts();
    }, [categorySelected]);

    async function handleCloseOrder() {
        try {
            await api.delete("/order", {
                params: {
                    order_id: route.params?.order_id
                }
            });

            navigation.goBack();

        } catch (err) {
            console.log(err);
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeProduct(item: ProductProps) {
        setProductSelected(item);
    }

    async function handleAddItem() {
        const response = await api.post("/order/add", {
            order_id: route.params.order_id,
            product_id: productSelected?.id,
            amount: Number(amount),
            observation: observation
        });

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data]);
        console.log(items);
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete("/order/remove", {
            params: {
                item_id: item_id
            }
        });

        let removeItem = items.filter(item => {
            return (item.id !== item_id);
        });

        setItems(removeItem);
    }

    async function handleFinishOrder() {
        navigation.navigate("FinishOrder", { number: route.params.number, order_id: route.params.order_id });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.table}>Mesa: {route.params.number}</Text>
                <Text style={styles.client}>{route.params.client}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={30} color="#ff3f4b"  />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {prodcts.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                <Text>
                    {productSelected?.name}
                </Text>
            </TouchableOpacity>
            )}

            <TextInput
                style={styles.input}
                placeholder="Observação"
                placeholderTextColor="#c6630047"
                value={observation}
                onChangeText={setObservation}
            />

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                    style={[styles.input, {width: '60%', textAlign: 'center'}]} 
                    value={amount}
                    onChangeText={setAmount}
                    placeholderTextColor="#c6630047"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 20}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListItem
                        data={item}
                        deleteItem={handleDeleteItem}
                    />
                )}
            />

            <Modal
                visible={modalCategoryVisible}
                transparent={true}
                animationType="fade"
            >
                <ModalPicker 
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal
                visible={modalProductVisible}
                transparent={true}
                animationType="fade"
            >
                <ModalPicker 
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={prodcts}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
        backgroundColor: '#fffaf2'
    },
    header:{
        flexDirection: 'row',
        marginBottom: 1,
        alignItems: 'center',
        marginTop: 4,
        gap: 20,
    },
    table:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#292827',
        marginRight: 14,
    },
    client:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#292827',
        flex: 1,
    },
    input:{
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#C66300",
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 2,
        marginTop: 12,
        fontSize: 16,
    },
    qtdContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    qtdText:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#292827',
    },
    actions:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd:{
        backgroundColor: '#c66300',
        padding: 10,
        borderRadius: 8,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        color: '#fff',
        fontSize: 24,
    },
    button:{
        backgroundColor: '#c66300',
        padding: 10,
        borderRadius: 8,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
