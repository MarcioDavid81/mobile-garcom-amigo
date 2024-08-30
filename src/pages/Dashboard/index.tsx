import React, { useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "@/src/services/api";

export default function Dashboard() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState("");

    const [client, setClient] = useState("");

    async function handleOpenTable() {
        if(number === ""){
            
            return;
        }

        const response = await api.post("/order", {
            table: Number(number),
            name: client,
        });

        navigation.navigate("Order", {
            number: number,
            client: client,
            order_id: response.data.id,
        });

        setNumber("");
        setClient("");

    }

  

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>
            <TextInput
                placeholder="Número da Mesa"
                placeholderTextColor="#c6630047"
                style={styles.input}
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />
            <TextInput
                placeholder="Nome do Cliente"
                placeholderTextColor="#c6630047"
                style={styles.input}
                value={client}
                onChangeText={setClient}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpenTable}
            >
                <Text style={styles.textButton}>
                    Abrir Mesa
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
        backgroundColor: "#fffaf2"
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: "#292827",
        marginBottom: 24,
    },
    input:{
        backgroundColor: "#fff",
        width: "85%",
        height: 60,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#C66300",
        textAlign: "center",
        fontSize: 24,
    },
    button:{
        backgroundColor: "#c66300",
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
        width: "85%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    textButton:{
        color: "#fff",
        fontSize: 24,
    },
    logOutButton: {
        backgroundColor: "tomato",
        padding: 16,
        borderRadius: 50,
        marginTop: 32,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    }
});