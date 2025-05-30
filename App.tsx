import { Home } from './views/Home';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Login } from './views/Login';
import { RootStackParamList } from './types';
import { EditScreen } from './views/EditScreen';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
                color="blue"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{title: 'Editar Conta'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


