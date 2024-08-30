import React from "react";
import { View, Text,  StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ItemProps {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (id: string) => void;
}

export function ListItem({ data, deleteItem }: ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.itemText}>{data.amount} - {data.name}</Text>

            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" size={25} color="#f00" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 2,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: "#C66300",
    },
    itemText: {
        color: "#292827",
        fontSize: 18,
    }
});