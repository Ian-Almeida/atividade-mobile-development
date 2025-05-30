import { useEffect, useState } from "react";
import { Account, EditScreenProps } from "../types";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { getAccountByUsername, updateAccount } from "../api";

export function EditScreen({ navigation, route }: EditScreenProps) {

    const [editedAccount, setEditedAccount] = useState<Account | undefined>(undefined);

  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    getAccountByUsername(route.params.username).then((acc) => {
        setEditedAccount(acc);
      setEditedUsername(acc?.username || "");
      setEditedPassword(acc?.password || "");
      setLoaded(true);
    });
  }, [loaded]);

  const saveEdit = () => {
    if(!editedAccount) return;

    updateAccount(editedAccount.username, { username: editedUsername, password: editedPassword });
  };

  return (
    <View style={styles.editContainer}>
      <TextInput
        style={styles.input}
        value={editedUsername}
        onChangeText={setEditedUsername}
      />
      <TextInput
        style={styles.input}
        value={editedPassword}
        onChangeText={setEditedPassword}
      />
      <Button title="Salvar" onPress={saveEdit} />
      <Button
        title="Cancelar"
        color="gray"
        onPress={() => {
          setEditedUsername("");
          setEditedPassword("");
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  editContainer: { marginTop: 20 },
  input: { borderWidth: 1, padding: 5, marginBottom: 10 },
});
