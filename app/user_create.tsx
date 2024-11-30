import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { auth, db } from '../scripts/firebase-config';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

export default function CreateUser() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCreateUser, setErrorCreateUser] = useState("");

    const validarCampos = () => {
        if (nome === "") {
            setErrorCreateUser("Informe o nome");
        } else if (email === "") {
            setErrorCreateUser("Informe o email");
        } else if (password === "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    };

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email,
                });
                router.push('/');
            })
            .catch((error) => {
                setErrorCreateUser("Erro ao criar o usuário. Verifique os dados.");
            });
    };

    return (
        <View style={styles.container}>
            {errorCreateUser !== "" && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}

            <Text style={styles.titulo}>Criar Conta</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#B0BEC5"
                value={nome}
                onChangeText={setNome}
            />

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
                <Text style={styles.textButton}>Cadastrar</Text>
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
    titulo: {
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    alert: {
        fontSize: 16,
        color: "#FF7043", // Laranja vibrante para erros
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: "#374151", // Azul acinzentado
        color: "#FFFFFF", // Texto branco
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: "#4F83CC", // Azul vibrante
        padding: 15,
        borderRadius: 50, // Bordas arredondadas modernas
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    textButton: {
        fontSize: 18,
        color: "#FFFFFF", // Branco para contraste
        fontWeight: 'bold',
    },
});
