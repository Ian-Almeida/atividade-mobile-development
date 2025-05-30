import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account } from './types';

export const saveAccount = async (acc: Account) => {
    try {
        const existingAccount = await getAccountByUsername(acc.username);
        if(existingAccount) throw "Conta já cadastrada.";
        
        let toSave: Account[] = [];

        const savedAccounts = await getAccounts();
        if(savedAccounts) {
            toSave = [...savedAccounts, acc];
        } else {
            toSave = [acc];
        }
        
        await AsyncStorage.setItem('accounts', JSON.stringify(toSave));
        console.log("created account: ", acc);
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const saveAccounts = async (accs: Account[]) => {
    try {
        await AsyncStorage.setItem('accounts', JSON.stringify(accs));
        console.log("updated accounts:  ", accs);
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

export const updateAccount = async (username: string, acc: Account) => {
    const accounts = await getAccounts() || [];

    const newAccounts = accounts.filter((val) => val.username !== username);
    newAccounts.push(acc);

    await saveAccounts(newAccounts);
}

export const getAccounts = async () => {
    try {
        const json = await AsyncStorage.getItem('accounts');
        if(!json) throw 'Não foi possível encontrar a chave com contas';
        console.log(json)
        return JSON.parse(json) as Account[];
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

export const getAccountByUsername = async (username: string) => {
    const accounts = await getAccounts();

    if(!accounts) return undefined;

    return accounts.find((account: Account) => account.username === username);
}

export const validateLogin = async (acc: Account) => {
    try {
        const foundAccount = await getAccountByUsername(acc.username);
        if(!foundAccount) throw `Username (${acc.username}) não encontrado.`;

        if(foundAccount.password !== acc.password) throw `Senha incorreta.`;

        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}