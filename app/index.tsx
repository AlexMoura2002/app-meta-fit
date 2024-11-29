import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const validarCampos = () => {
        if (email == "") {
            setErrorLogin("Informe seu email");
        } else if (password == "") {
            setErrorLogin("Informe sua senha");
        } else {
            setErrorLogin("");
            login();
        }
    }

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    // Signed in 
    const user = userCredential.user;
    setEmail("");
    setPassword("");
    setErrorLogin("");
    router.push("/internas/tasks");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorLogin(errorMessage);
  });

    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/app-meta-fit.png')} />

            {errorLogin != null && (
                <Text style={styles.alert}>{errorLogin}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => router.push('/user_create')}
            >
                <Text style={styles.buttonCreateText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B0BEC5",
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    logo: {
        width: 250, // Reduz a largura da logo (ajuste conforme necessário)
        height: 200, // Reduz a altura da logo (ajuste conforme necessário)
        marginBottom: 5, // Reduz a distância entre a logo e o campo de email
        marginTop: -10, // Ajusta a posição para cima, diminuindo o espaço em relação ao topo
    },
    alert: {
        fontSize: 18,
        color: '#ECEFF1',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#ECEFF1',
        padding: 20,
        marginBottom: 20,
        width: '100%'
    },
    button: {
        backgroundColor: '#FF7043',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#000'
    },
    buttonCreate: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    }
})