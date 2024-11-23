import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { auth } from '../../scripts/firebase-config';
import { signOut } from 'firebase/auth';

export default function About() {
    const router = useRouter();

    const logout = () => {
        signOut(auth).then(() => {
            // Logout bem-sucedido, redireciona para a tela inicial
            router.push("/");
        }).catch((error) => {
            console.error("Erro ao sair:", error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre o App</Text>
            <Text style={styles.description}>
                O Meta-Fit é um aplicativo criado para ajudar você a organizar seus treinos e sua dieta, 
                facilitando a evolução no mundo fitness. Alcance seus objetivos com praticidade e foco!
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#e74c3c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
