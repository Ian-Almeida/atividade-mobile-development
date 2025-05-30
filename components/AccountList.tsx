import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { Account } from '../types';
import { getAccounts, saveAccounts } from '../api';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  onEdit: (username: string) => void;
}

const AccountList = (props: Props) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      getAccounts().then((accs) => setAccounts(accs || []));
      console.log("Get accounts")
    }, [])
  );

  const removeUser = (username: string) => {
    setAccounts((prevAccounts) => prevAccounts.filter(acc => acc.username !== username));
  };

  useEffect(() => {
    saveAccounts(accounts);
  }, [accounts])

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.username}</Text>
            <Button title="Editar" onPress={() => props.onEdit(item.username)} />
            <Button title="Remover" color="red" onPress={() => removeUser(item.username)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  editContainer: { marginTop: 20 },
  input: { borderWidth: 1, padding: 5, marginBottom: 10 }
});

export default AccountList;
