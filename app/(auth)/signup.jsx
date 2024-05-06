import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

import { auth } from '../../lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const submit = async () => {
    await createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((authUser) => {
        authUser.user.updateProfile({
          userName: form?.name,
        });
        router.push('/login');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={[styles.loginText, styles.loginLink]} onPress={() => router.push('/login')}>
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8cf078',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    color: '#007BFF',
  },
});

export default SignUp;
