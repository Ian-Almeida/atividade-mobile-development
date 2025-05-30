import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import { LoginScreenProps } from "../types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getAccounts, saveAccount, validateLogin } from "../api";

export function Login({ navigation }: LoginScreenProps) {
  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [saveSuccess, setSaveSuccess] = React.useState(true);
  const [isLoginValid, setIsLoginValid] = React.useState<boolean | null>(null);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Usuário</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Seu Usuário"
        />
        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Sua senha"
        />

        <Text style={{color: saveSuccess ? 'green' : 'red'}}>
          {saveSuccess ? '' : 'Falha ao criar conta'}
        </Text>
        <Text style={{color: isLoginValid ? 'green' : 'red'}}>
          {isLoginValid !== null && <>{isLoginValid ? '' : 'Falha ao realizer login'}</>}
        </Text>

        <View style={styles.buttons}>
          <Button title="Crie sua conta" onPress={async () => {
            const accountSaved = await saveAccount({username, password});
            setSaveSuccess(!!accountSaved);

            setTimeout(() => {
              setSaveSuccess(true);
            }, 1000);
          }}/>
          <Button title="Entrar" onPress={async () => {
            const validLogin = await validateLogin({username, password});

            if(validLogin) {
              navigation.navigate("Home");
              return;
            }

            setIsLoginValid(validLogin);

            setTimeout(() => {
              setIsLoginValid(null);
            }, 1000);
            
          }}/>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  }
});
