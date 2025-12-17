import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { AuthViewModel } from '../viewmodels/authViewModel';
import { useNavigation } from '@react-navigation/native';

const vm = new AuthViewModel();

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center' }}>
      <Text style={{ fontSize:20, marginBottom:12 }}>Login</Text>

      <TextInput 
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth:1, padding:8, marginBottom:8}}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{borderWidth:1, padding:8, marginBottom:8}}
      />

      {vm.loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Iniciar sesión" onPress={() => vm.login(username, password)} />
      )}

      {vm.error ? (
        <Text style={{color:'red', marginTop:8}}>{vm.error}</Text>
      ) : null}

      <Text style={{ marginTop:16 }} onPress={() => navigation.navigate('Register' as never)}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
};

export default LoginScreen;
