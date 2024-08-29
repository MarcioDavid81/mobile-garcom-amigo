import { StatusBar } from "react-native";
import Routes from "@/src/routes";
import { AuthProvider } from "@/src/contexts/AuthContext";


export default function Index() {
  return (
    <>
    <AuthProvider>
      <StatusBar backgroundColor="#fffaf2" barStyle="dark-content" translucent={false}/>
      <Routes />
    </AuthProvider>
    </>
  );
}
