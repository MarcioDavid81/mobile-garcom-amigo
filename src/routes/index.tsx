import React, { useContext } from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

function Routes() {
    const {isAuthenticated, loading} = useContext(AuthContext);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f5f7fb" }}>
                <ActivityIndicator size="large" color="#000" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
            isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    );
}

export default Routes;

