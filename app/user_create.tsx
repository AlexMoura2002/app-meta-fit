import React, { useState } from 'react'
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
        if (nome == "") {
            setErrorCreateUser("Informe o nome");
        } else if (email == "") {
            setErrorCreateUser("Informe o email");
        } else if (password == "") {
            setErrorCreateUser("Informe uma senha");
        } else {
            setErrorCreateUser("");
            createUser();
        }
    }


    const createUser = () => {
        // Função que cria usuário no Firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                set(ref(db, 'user/' + user.uid), {
                    nome: nome,
                    email: email
                })
                router.push('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            {errorCreateUser != null && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}

            <Text style={styles.titulo}>Cadastrar Usuário</Text>

            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Criar usuário</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    titulo: {
        color: "#000",
        fontSize: 32,
        marginBottom: 50
    },
    container: {
        backgroundColor: "#B0BEC5",
        padding: 30,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
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
    }
});