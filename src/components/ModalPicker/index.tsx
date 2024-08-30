import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native";
import { CategoryProps } from "@/src/pages/Order";

interface ModalPickerProps {
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem(item: CategoryProps) {
        selectedItem(item);
        handleCloseModal();
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))

    return(
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#C66300",
    },
    option:{
        alignItems: "flex-start",
        borderTopWidth: 1,
        borderTopColor: "#C66300",
    },
    item: {
        margin: 18,
        fontSize: 20,
        color: "#292827",
        fontWeight: "bold",
    }


});