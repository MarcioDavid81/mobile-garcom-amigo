import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        if (email === "" || password === "") {
            return;
        }

        await signIn({ email, password });
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} />

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="E-mail"
                    style={styles.input}
                    placeholderTextColor="#c663003a"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    placeholderTextColor="#c663003a"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.touchable}
                >
                    {loadingAuth? (
                        <ActivityIndicator size={25} color="#fff" />
                    ) : (
                            <Text style={styles.textButton}>Entrar</Text>
                        )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFAF2"
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 16,
    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C66300",
        borderRadius: 8,
        margin: 10,
        padding: 10
    },
    touchable: {
        width: "95%",
        height: 40,
        backgroundColor: "#C66300",
        color: "#fff",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    textButton: {
        color: "#fff",
        fontSize: 22
    }
});