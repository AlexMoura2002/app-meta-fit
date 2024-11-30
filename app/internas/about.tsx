import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from 'expo-router';
import { auth } from '../../scripts/firebase-config';
import { signOut } from 'firebase/auth';

export default function About() {
    const router = useRouter();

    // Função de logout
    const logout = () => {
        signOut(auth).then(() => {
            // Logout bem-sucedido, redireciona para a tela inicial
            router.push("/");
        }).catch((error) => {
            console.error("Erro ao sair:", error);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.description}>
                O Meta-Fit é um aplicativo criado para ajudar você a organizar seus treinos e sua dieta, 
                facilitando a evolução no mundo fitness. Alcance seus objetivos com praticidade e foco!
            </Text>

            {/* Opções de Configuração */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/meus-dados")}>
                    <Text style={styles.optionText}>Meus Dados</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/alterar-email")}>
                    <Text style={styles.optionText}>Alterar Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/alterar-senha")}>
                    <Text style={styles.optionText}>Alterar Senha</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/notificacoes")}>
                    <Text style={styles.optionText}>Notificações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => router.push("/preferencias")}>
                    <Text style={styles.optionText}>Preferências</Text>
                </TouchableOpacity>
            </View>

            {/* Botão de Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        flexGrow: 1, // Garantir que o conteúdo ocupe o espaço restante
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinhar ao topo para evitar corte
        backgroundColor: '#1E293B', // Cor de fundo consistente com o resto do app
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    optionButton: {
        padding: 15,
        backgroundColor: '#ffffff',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    logoutButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#009688', // Cor consistente com o tema principal
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
