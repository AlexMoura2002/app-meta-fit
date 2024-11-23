import { useRouter } from 'expo-router';
import { auth } from '../../scripts/firebase-config';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { useState } from 'react';

export default function User() {
    const router = useRouter();

    // Intervalos de tempo e dias da semana
    const [selectedRange, setSelectedRange] = useState("0-3");
    const [selectedDay, setSelectedDay] = useState("segunda");

    // Dados dos exercícios
    const workoutPlan = {
        "0-3": {
            segunda: [
                { id: '1', exercise: "Supino reto", series: "3x12", tips: "Use carga moderada." },
                { id: '2', exercise: "Supino inclinado", series: "3x10", tips: "Controle o movimento." },
                { id: '3', exercise: "Crucifixo", series: "3x12", tips: "Evite esticar totalmente os braços." },
                { id: '4', exercise: "Desenvolvimento com halteres", series: "3x10", tips: "Postura ereta." },
                { id: '5', exercise: "Tríceps pulley", series: "3x15", tips: "Evite usar os ombros." },
            ],
            terça: [
                { id: '1', exercise: "Agachamento livre", series: "4x12", tips: "Mantenha a coluna reta." },
                { id: '2', exercise: "Leg press", series: "4x10", tips: "Abaixe controladamente." },
                { id: '3', exercise: "Cadeira extensora", series: "3x12", tips: "Pause no topo do movimento." },
                { id: '4', exercise: "Mesa flexora", series: "3x12", tips: "Evite levantar o quadril." },
                { id: '5', exercise: "Panturrilha no leg press", series: "3x15", tips: "Use amplitude total." },
            ],
            quarta: [
                { id: '1', exercise: "Rosca direta", series: "3x12", tips: "Evite balançar os braços." },
                { id: '2', exercise: "Rosca martelo", series: "3x12", tips: "Segure firme os halteres." },
                { id: '3', exercise: "Barra fixa", series: "3x10", tips: "Controle o movimento." },
                { id: '4', exercise: "Remada curvada", series: "3x12", tips: "Mantenha as costas retas." },
                { id: '5', exercise: "Pulldown na polia", series: "3x12", tips: "Evite balançar o tronco." },
            ],
            quinta: [
                { id: '1', exercise: "Supino reto", series: "3x12", tips: "Use carga moderada." },
                { id: '2', exercise: "Desenvolvimento militar", series: "3x10", tips: "Controle a descida." },
                { id: '3', exercise: "Elevação lateral", series: "3x12", tips: "Evite movimentos bruscos." },
                { id: '4', exercise: "Crucifixo", series: "3x12", tips: "Mantenha os cotovelos levemente flexionados." },
                { id: '5', exercise: "Tríceps coice", series: "3x12", tips: "Não mova os ombros." },
            ],
            sexta: [
                { id: '1', exercise: "Agachamento no Smith", series: "4x12", tips: "Use carga moderada e boa postura." },
                { id: '2', exercise: "Leg press", series: "4x10", tips: "Abaixe controladamente." },
                { id: '3', exercise: "Cadeira extensora", series: "3x12", tips: "Pause no topo do movimento." },
                { id: '4', exercise: "Mesa flexora", series: "3x12", tips: "Evite levantar o quadril." },
                { id: '5', exercise: "Afundo com halteres", series: "3x12", tips: "Mantenha os pés firmes." },
            ],
        },
        "3-6": {
            segunda: [
                { id: '1', exercise: "Supino reto com barra", series: "4x8", tips: "Use uma carga mais pesada." },
                { id: '2', exercise: "Desenvolvimento com barra", series: "4x8", tips: "Mantenha as costas retas." },
                { id: '3', exercise: "Crucifixo inclinado com halteres", series: "4x8", tips: "Controle o movimento na descida." },
                { id: '4', exercise: "Elevação lateral com halteres", series: "4x12", tips: "Levante até a linha dos ombros." },
                { id: '5', exercise: "Tríceps testa", series: "4x10", tips: "Evite esticar completamente os cotovelos." },
                { id: '6', exercise: "Tríceps mergulho", series: "4x10", tips: "Use uma amplitude completa." },
            ],
            terça: [
                { id: '1', exercise: "Agachamento com barra", series: "4x8", tips: "Mantenha a postura ereta." },
                { id: '2', exercise: "Leg press 45°", series: "4x10", tips: "Desça até 90°." },
                { id: '3', exercise: "Cadeira extensora", series: "4x12", tips: "Evite esticar totalmente as pernas." },
                { id: '4', exercise: "Stiff com halteres", series: "4x10", tips: "Mantenha as costas retas durante todo o movimento." },
                { id: '5', exercise: "Panturrilha sentado", series: "4x15", tips: "Mantenha o movimento controlado." },
                { id: '6', exercise: "Afundo com barra", series: "4x10", tips: "Cuidado com a postura do joelho." },
            ],
            quarta: [
                { id: '1', exercise: "Puxada no pulley", series: "4x8", tips: "Evite usar impulso." },
                { id: '2', exercise: "Rosca direta com barra", series: "4x10", tips: "Controle o movimento na subida e descida." },
                { id: '3', exercise: "Barra fixa pronada", series: "4x6", tips: "Puxe com força, sem balançar o corpo." },
                { id: '4', exercise: "Remada com barra T", series: "4x8", tips: "Mantenha a postura ereta." },
                { id: '5', exercise: "Puxada frontal aberta", series: "4x8", tips: "Traga o cabo até o peito." },
                { id: '6', exercise: "Rosca martelo", series: "4x10", tips: "Mantenha os cotovelos imóveis." },
            ],
            quinta: [
                { id: '1', exercise: "Levantamento terra com barra", series: "4x8", tips: "Mantenha a postura e a carga controladas." },
                { id: '2', exercise: "Barra fixa", series: "4x10", tips: "Controle o movimento." },
                { id: '3', exercise: "Remada curvada", series: "4x10", tips: "Postura correta durante todo o movimento." },
                { id: '4', exercise: "Puxada atrás da nuca", series: "4x8", tips: "Mantenha o tronco fixo." },
                { id: '5', exercise: "Remada baixa com barra", series: "4x10", tips: "Postura ereta." },
                { id: '6', exercise: "Encolhimento de ombros com halteres", series: "4x12", tips: "Evite movimentar os braços." },
            ],
            sexta: [
                { id: '1', exercise: "Barra fixa", series: "3x10", tips: "Controle o movimento." },
                { id: '2', exercise: "Remada curvada", series: "4x12", tips: "Mantenha as costas retas." },
                { id: '3', exercise: "Puxada atrás da nuca", series: "3x12", tips: "Postura ereta." },
                { id: '4', exercise: "Levantamento terra", series: "4x10", tips: "Mantenha os joelhos alinhados." },
                { id: '5', exercise: "Remada baixa", series: "3x12", tips: "Evite arqueamento das costas." },
                { id: '6', exercise: "Encolhimento de ombros", series: "3x15", tips: "Evite movimentar os braços." },
            ],
        },
        "6-9": {
            segunda: [
                { id: '1', exercise: "Supino reto com barra", series: "4x6", tips: "Aumente a carga gradualmente." },
                { id: '2', exercise: "Desenvolvimento militar com barra", series: "4x6", tips: "Mantenha a postura ereta." },
                { id: '3', exercise: "Crucifixo inclinado", series: "4x8", tips: "Desça até o ponto onde o ombro se sinta confortável." },
                { id: '4', exercise: "Desenvolvimento com halteres", series: "4x8", tips: "Evite usar impulso." },
                { id: '5', exercise: "Tríceps testa com barra", series: "4x8", tips: "Controle o movimento durante a execução." },
                { id: '6', exercise: "Tríceps mergulho", series: "4x10", tips: "Use a amplitude máxima." },
            ],
            terça: [
                { id: '1', exercise: "Agachamento com barra", series: "4x6", tips: "Aumente o peso progressivamente." },
                { id: '2', exercise: "Leg press 45°", series: "4x8", tips: "Abaixe até 90°." },
                { id: '3', exercise: "Cadeira extensora", series: "4x10", tips: "Controle a descida do movimento." },
                { id: '4', exercise: "Stiff com barra", series: "4x8", tips: "Mantenha as costas retas." },
                { id: '5', exercise: "Afundo com barra", series: "4x8", tips: "Mantenha o joelho alinhado com o pé." },
                { id: '6', exercise: "Panturrilha no leg press", series: "4x12", tips: "Use toda a amplitude do movimento." },
            ],
            quarta: [
                { id: '1', exercise: "Puxada no pulley", series: "4x8", tips: "Aumente a carga gradualmente." },
                { id: '2', exercise: "Rosca direta com barra", series: "4x8", tips: "Controle o movimento." },
                { id: '3', exercise: "Barra fixa", series: "4x6", tips: "Evite usar impulso." },
                { id: '4', exercise: "Remada com barra T", series: "4x8", tips: "Postura ereta durante o exercício." },
                { id: '5', exercise: "Remada baixa com halteres", series: "4x10", tips: "Traga os cotovelos para trás." },
                { id: '6', exercise: "Puxada frontal", series: "4x10", tips: "Mantenha o tronco fixo." },
            ],
            quinta: [
                { id: '1', exercise: "Levantamento terra", series: "4x6", tips: "Mantenha as costas retas." },
                { id: '2', exercise: "Barra fixa com pegada aberta", series: "4x6", tips: "Puxe com força, sem impulso." },
                { id: '3', exercise: "Remada curvada com barra", series: "4x8", tips: "Postura controlada durante a execução." },
                { id: '4', exercise: "Puxada atrás da nuca", series: "4x8", tips: "Mantenha o tronco fixo." },
                { id: '5', exercise: "Encolhimento de ombros com halteres", series: "4x10", tips: "Use a amplitude completa." },
                { id: '6', exercise: "Face pull", series: "4x12", tips: "Mantenha os ombros relaxados durante o movimento." },
            ],
            sexta: [
                { id: '1', exercise: "Barra fixa pronada", series: "4x8", tips: "Controle o movimento." },
                { id: '2', exercise: "Remada com barra", series: "4x8", tips: "Mantenha a postura ereta." },
                { id: '3', exercise: "Puxada frontal aberta", series: "4x8", tips: "Evite puxar com o tronco." },
                { id: '4', exercise: "Levantamento terra com barra", series: "4x6", tips: "Atenção à postura da coluna." },
                { id: '5', exercise: "Remada baixa com barra", series: "4x8", tips: "Evite arqueamento das costas." },
                { id: '6', exercise: "Rosca martelo", series: "4x10", tips: "Controle o movimento na descida." },
            ],
        },
        "9-12": {
            segunda: [
                { id: '1', exercise: "Supino reto com barra", series: "5x5", tips: "Aumente a carga progressivamente." },
                { id: '2', exercise: "Desenvolvimento militar com barra", series: "5x5", tips: "Postura ereta e controle do movimento." },
                { id: '3', exercise: "Crucifixo inclinado", series: "4x8", tips: "Controle a descida do movimento." },
                { id: '4', exercise: "Desenvolvimento com halteres", series: "4x8", tips: "Atenção ao movimento do ombro." },
                { id: '5', exercise: "Tríceps testa com barra", series: "4x8", tips: "Evite que os cotovelos se movam durante o exercício." },
                { id: '6', exercise: "Mergulho entre bancos", series: "4x10", tips: "Controle o movimento e evite sobrecarregar os ombros." },
            ],
            terça: [
                { id: '1', exercise: "Agachamento com barra", series: "5x5", tips: "Mantenha os pés alinhados com os ombros." },
                { id: '2', exercise: "Leg press 45°", series: "5x6", tips: "Postura ereta e controle durante a descida." },
                { id: '3', exercise: "Cadeira extensora", series: "4x10", tips: "Pause no topo do movimento." },
                { id: '4', exercise: "Stiff com barra", series: "5x6", tips: "Mantenha as costas retas e evite curvar-se." },
                { id: '5', exercise: "Afundo com barra", series: "4x8", tips: "Evite que o joelho passe da linha dos pés." },
                { id: '6', exercise: "Panturrilha no leg press", series: "4x12", tips: "Mantenha a amplitude completa do movimento." },
            ],
            quarta: [
                { id: '1', exercise: "Puxada no pulley", series: "5x5", tips: "Puxe com os cotovelos, não com as mãos." },
                { id: '2', exercise: "Rosca direta com barra", series: "5x5", tips: "Evite movimentos bruscos e controle o peso." },
                { id: '3', exercise: "Barra fixa", series: "4x6", tips: "Não balance o corpo, foco na força." },
                { id: '4', exercise: "Remada curvada com barra", series: "5x6", tips: "Mantenha o tronco firme durante o movimento." },
                { id: '5', exercise: "Remada baixa com halteres", series: "4x8", tips: "Mantenha os cotovelos fixos." },
                { id: '6', exercise: "Puxada frontal", series: "4x10", tips: "Mantenha o tronco estável durante a puxada." },
            ],
            quinta: [
                { id: '1', exercise: "Levantamento terra", series: "5x5", tips: "Fique com os pés alinhados e postura ereta." },
                { id: '2', exercise: "Barra fixa com pegada aberta", series: "5x5", tips: "Controle a descida e evite usar impulso." },
                { id: '3', exercise: "Remada curvada com barra", series: "5x6", tips: "Fique com os joelhos levemente flexionados." },
                { id: '4', exercise: "Puxada atrás da nuca", series: "4x8", tips: "Mantenha o controle total sobre o movimento." },
                { id: '5', exercise: "Encolhimento de ombros com halteres", series: "4x12", tips: "Mantenha o movimento controlado." },
                { id: '6', exercise: "Face pull", series: "4x12", tips: "Mantenha os cotovelos alinhados com os ombros." },
            ],
            sexta: [
                { id: '1', exercise: "Barra fixa pronada", series: "5x5", tips: "Evite impulsionar o corpo para cima." },
                { id: '2', exercise: "Remada com barra", series: "5x5", tips: "Mantenha a postura do corpo alinhada." },
                { id: '3', exercise: "Puxada frontal aberta", series: "5x6", tips: "Mantenha o tronco firme durante o movimento." },
                { id: '4', exercise: "Levantamento terra com barra", series: "5x5", tips: "Fique com as costas retas e evite curvaturas." },
                { id: '5', exercise: "Remada baixa com barra", series: "5x6", tips: "Mantenha os ombros para trás e o peito aberto." },
                { id: '6', exercise: "Rosca martelo", series: "4x8", tips: "Controle o movimento durante todo o exercício." },
            ],
        },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Dados do Usuário</Text>

            {/* Menu de intervalos de meses */}
            <View style={styles.menu}>
                {["0-3", "3-6", "6-9", "9-12"].map(range => (
                    <TouchableOpacity
                        key={range}
                        style={[
                            styles.menuButton,
                            selectedRange === range && styles.selectedMenuButton,
                        ]}
                        onPress={() => setSelectedRange(range)}
                    >
                        <Text style={styles.menuText}>{range}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Menu de dias da semana */}
            <View style={styles.daysMenu}>
                {["segunda", "terça", "quarta", "quinta", "sexta"].map(day => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            selectedDay === day && styles.selectedDayButton,
                        ]}
                        onPress={() => setSelectedDay(day)}
                    >
                        <Text style={styles.dayText}>{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Lista de exercícios */}
            <FlatList
                data={workoutPlan[selectedRange]?.[selectedDay] || []}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.exerciseCard}>
                        <Text style={styles.exerciseText}>
                            {item.exercise} - {item.series}
                        </Text>
                        <Text style={styles.tipsText}>{item.tips}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    menuButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: "#ddd",
        alignItems: "center",
    },
    selectedMenuButton: {
        backgroundColor: "#6200ee",
    },
    menuText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
    daysMenu: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    dayButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 15,
        backgroundColor: "#ddd",
        alignItems: "center",
    },
    selectedDayButton: {
        backgroundColor: "#6200ee",
    },
    dayText: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
    exerciseCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 3,
    },
    exerciseText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    tipsText: {
        fontSize: 14,
        color: "#777",
    },
});