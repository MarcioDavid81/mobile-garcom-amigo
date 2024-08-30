import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { api } from "@/src/services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "@/src/routes/app.routes";

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export default function FinishOrder () {

    const route = useRoute<FinishOrderRouteProp>();

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleSendOrder() {
        try {
            await api.put("/order/send", {
                order_id: route.params?.order_id,
            })

            navigation.popToTop();
            
        } catch (error) {
            alert("Erro ao finalizar pedido, tente novamente.");
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.alert}>Deseja finalizar o pedido?</Text>
            <Text style={styles.title}>
                Mesa: {route.params?.number}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSendOrder}>
                <Text style={styles.buttonText}>Finalizar</Text>
                <Feather name="shopping-cart" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffaf2",
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        fontSize: 20,
        color: "#292827",
        fontWeight: "bold",
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        color: "#292827",
        fontWeight: "bold",
        marginBottom: 12,
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#C66300",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
    },
});