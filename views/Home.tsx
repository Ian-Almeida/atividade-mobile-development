import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { HomeScreenProps } from "../types";
import AccountList from "../components/AccountList";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function Home({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <AccountList 
            onEdit={(username) => navigation.navigate("Edit", {username})} 
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
