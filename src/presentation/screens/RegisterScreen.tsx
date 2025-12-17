import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AuthViewModel } from '../viewmodels/authViewModel';
import { useNavigation } from '@react-navigation/native';

const vm = new AuthViewModel();

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const onRegister = async () => {
    try {
      const id = await vm.register(username, password, fullName);
      Alert.alert('Registrado', `Usuario creado con id ${id}`);
      navigation.navigate('Login' as never);
    } catch (e) {
      Alert.alert('Error', vm.error || 'Error al registrar');
    }
  };

  return (
    <View style={{ flex:1, padding:16, justifyContent:'center' }}>
      <Text style={{ fontSize:20, marginBottom:12 }}>Registro</Text>

      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth:1, padding:8, marginBottom:8}}
      />

      <TextInput
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
        style={{borderWidth:1, padding:8, marginBottom:8}}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{borderWidth:1, padding:8, marginBottom:8}}
      />

      <Button title="Registrar" onPress={onRegister} />
    </View>
  );
};

export default RegisterScreen;
