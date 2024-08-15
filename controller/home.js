import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [ip, setIp] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(username !== '' && ip !== '');
  }, [username, ip]);

  const handleLogin = () => {
    if (isButtonEnabled) {
      navigation.navigate('Controller', { username, ip });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter PlayerName:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <Text style={styles.label}>Enter IPv4 address:</Text>
      <TextInput
        style={styles.input}
        value={ip}
        onChangeText={setIp}
        placeholder="IPv4"
        autoCapitalize="none"
      />
      <Button title="Submit" onPress={handleLogin}
        disabled={!isButtonEnabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default Home;
