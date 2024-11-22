import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

export default function Dashboard() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Bem-vindo(a), Alex!</Text>
                <Text style={styles.motivation}>Continue se superando!</Text>
                {/* Avatar */} 
                <Image 
                    source={{ uri: 'https://via.placeholder.com/50' }} // Substitua pelo link da sua imagem
                    style={styles.avatar}
                />
            </View>

            <View style={styles.menu}>
                {/* Card com Peso de Academia */}
                <TouchableOpacity style={styles.card} onPress={() => alert("Ir para os treinos")}>
                    <Image 
                        source={require('../../assets/images/dumbbell.png')} // Caminho para a imagem baixada
                        style={styles.cardIcon} // Ajuste o estilo para melhorar a exibição
                    />
                    <Text style={styles.cardText}>Meus Treinos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => alert("Ir para a dieta")}>
                    <Image 
                        source={{ uri: 'https://via.placeholder.com/30.png' }} // Ícone de comida saudável
                        style={styles.cardIcon}
                    />
                    <Text style={styles.cardText}>Minha Dieta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => alert("Ir para configurações")}>
                    <Image 
                        source={{ uri: 'https://via.placeholder.com/30.png' }} // Ícone de configurações
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
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    motivation: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
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
        width: 50, // Reduzir o tamanho da imagem para 70x70 pixels
        height: 30, // Reduzido de 100 para 70
        marginBottom: 10,
        resizeMode: 'contain', // Manter a imagem proporcional
    },
});
