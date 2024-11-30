import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Avatar */}
                <Image
                    source={require('../../assets/images/boy.png')} // Caminho para a imagem
                    style={styles.cardIcon}
                />
                <Text style={styles.greeting}>Bem-vindo(a), Alex!</Text>
                <Text style={styles.motivation}>Continue se superando!</Text>
            </View>

            <View style={styles.menu}>
                {/* Card Meus Treinos */}
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/internas/user`)}>
                    <Image
                        source={require('../../assets/images/dumbbell.png')}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardText}>Meus Treinos</Text>
                </TouchableOpacity>

                {/* Card Minha Dieta */}
                <TouchableOpacity style={styles.card} onPress={() => alert("Ir para a dieta")}>
                    <Image
                        source={require('../../assets/images/healthy-heart.png')}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardText}>Minha Dieta</Text>
                </TouchableOpacity>

                {/* Card Configurações */}
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/internas/about`)}>
                    <Image
                        source={require('../../assets/images/setting.png')}
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardText}>Configurações</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E293B', // Azul escuro para o fundo
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF', // Texto branco
        marginTop: 10,
    },
    motivation: {
        fontSize: 16,
        color: '#CBD5E1', // Cinza claro
        marginTop: 5,
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#3B82F6', // Azul vibrante
        padding: 20,
        borderRadius: 15, // Bordas mais arredondadas
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardText: {
        color: '#FFFFFF', // Texto branco
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardIcon: {
        width: 60, // Tamanho da imagem maior
        height: 50,
        marginBottom: 10,
        resizeMode: 'contain', // Mantém proporção
    },
});
