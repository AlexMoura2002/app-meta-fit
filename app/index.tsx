import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { auth } from '../scripts/firebase-config';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Index() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const validarCampos = () => {
        if (email === "") {
            setErrorLogin("Por favor, informe seu email.");
        } else if (password === "") {
            setErrorLogin("Por favor, informe sua senha.");
        } else {
            setErrorLogin("");
            login();
        }
    };

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setErrorLogin("");
                router.push("/internas/tasks");
            })
            .catch(() => {
                setErrorLogin("Email ou senha incorretos. Tente novamente.");
            });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/images/novalogo.png')} />

            {errorLogin !== "" && (
                <Text style={styles.alert}>{errorLogin}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#B0BEC5"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#B0BEC5"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={validarCampos}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCreate} onPress={() => router.push('/user_create')}>
                <Text style={styles.buttonCreateText}>Criar Conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E293B", // Azul escuro moderno
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 220,
        height: 180,
        marginBottom: 30,
    },
    alert: {
        fontSize: 16,
        color: "#FF7043", // Laranja vibrante para chamar atenção
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        backgroundColor: "#374151", // Azul acinzentado para contraste moderno
        color: "#FFFFFF", // Texto branco
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: "#FF7043", // Laranja vibrante
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    textButton: {
        fontSize: 18,
        color: "#FFFFFF", // Branco para contraste
        fontWeight: 'bold',
    },
    buttonCreate: {
        width: '100%',
        backgroundColor: "#4F83CC", // Azul vibrante para destaque
        padding: 15,
        borderRadius: 50, // Bordas arredondadas modernas
        alignItems: 'center',
        shadowColor: "#000", // Sombra sutil
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Para Android
    },
    buttonCreateText: {
        fontSize: 18,
        color: "#FFFFFF", // Branco para contraste
        fontWeight: 'bold',
    },
});
