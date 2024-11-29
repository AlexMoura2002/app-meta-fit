import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: "#B0BEC5"},   //Cor da barra de cima
                tabBarStyle: {backgroundColor: "#B0BEC5"},   // Cor da barra de baixo
                headerTitleAlign: 'center',
                headerTintColor: '#000',
                tabBarActiveTintColor: "#FF7043", // Defini a cor do menu ativo na tab bar
                tabBarInactiveTintColor: "#000" // Denifi a cor do menu inativo na tabela
            }}
        >
            <Tabs.Screen name="tasks" options={{
                headerTitle: "Início",
                tabBarLabel: "Início",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "home" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="user" options={{
                headerTitle: "Meus treinos",
                tabBarLabel: "Meus treinos",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "dumbbell" color={color} size={32}/>
                )
            }} />
            <Tabs.Screen name="about" options={{
                headerTitle: "Configurações",
                tabBarLabel: "Configurações",
                tabBarIcon: ({color}) => (
                    <MaterialCommunityIcons name = "cog" color={color} size={32}/>
                )
            }} />
        </Tabs>
    );
}
