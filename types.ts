import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Edit: {username: string};
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

export type EditScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Edit"
>;

export interface Account {
    username: string;
    password: string;
}
