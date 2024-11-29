import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* Avatar */} 
                <Image 
                        source={require('../../assets/images/boy.png')} // Caminho para a imagem baixada
                        style={styles.cardIcon} // Ajuste o estilo para melhorar a exibição
                    />
                <Text style={styles.greeting}>Bem-vindo(a), Alex!</Text>
                <Text style={styles.motivation}>Continue se superando!</Text>
            </View>

            <View style={styles.menu}>
                {/* Card com Peso de Academia */}
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/internas/user`)}>
                    <Image 
                        source={require('../../assets/images/dumbbell.png')} // Caminho para a imagem baixada
                        style={styles.cardIcon} // Ajuste o estilo para melhorar a exibição
                    />
                    <Text style={styles.cardText}>Meus Treinos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => alert("Ir para a dieta")}>
                <Image 
                        source={require('../../assets/images/healthy-heart.png')} // Caminho para a imagem baixada
                        style={styles.cardIcon} // Ajuste o estilo para melhorar a exibição
                    />
                    <Text style={styles.cardText}>Minha Dieta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => router.push(`/internas/about`)}>
                <Image 
                        source={require('../../assets/images/setting.png')} // Caminho para a imagem baixada
                        style={styles.cardIcon} // Ajuste o estilo para melhorar a exibição
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
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center', // Centraliza todos os itens no eixo horizontal
        marginBottom: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10, // Espaço entre o avatar e o texto
    },
    motivation: {
        fontSize: 14,
        color: '#777',
        marginTop: 5, // Espaço entre os textos
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#6200ee',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardIcon: {
        width: 50, // Tamanho ajustado da imagem
        height: 35,
        marginBottom: 10,
        resizeMode: 'contain', // Manter a imagem proporcional
    },
});
