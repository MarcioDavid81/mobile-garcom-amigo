import React from "react";
import { Text, 
    View, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet 
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

type RouterDetailParams = {
    Order: {
        number: string | number;
        client: string;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouterDetailParams, "Order">;

export default function Order() {

    const route = useRoute<OrderRouteProps>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa: {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name="trash-2" size={40} color="#ff3f4b" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text>Pizzas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input}>
                <Text>Pizza de Calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput 
                    style={[styles.input, {width: '60%', textAlign: 'center'}]} 
                    value="1" 
                    placeholderTextColor={"#c6630047"}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        color: '#292827',
        marginRight: 14,
    },
    input:{
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#C66300",
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 12,
        marginTop: 12,
        fontSize: 24,
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
        padding: 16,
        borderRadius: 8,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        color: '#fff',
        fontSize: 30,
    },
    button:{
        backgroundColor: '#c66300',
        padding: 16,
        borderRadius: 8,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
