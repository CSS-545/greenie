import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        router.push('/dashboard');
      }
    });

    return unsubscribe;
  }, []);

  const submit = async () => {
    await signInWithEmailAndPassword(auth, form.email, form.password)
      .then((authUser) => {
        router.push('/dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Text style={[styles.signupText, styles.signupLink]} onPress={() => router.push('/signup')}>
              Sign Up
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: '#666',
  },
  signupLink: {
    color: '#007BFF',
  },
});

export default Login;
