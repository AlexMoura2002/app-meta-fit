import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { 
                    backgroundColor: "#1E293B", // Cor consistente com o tema principal
                },
                tabBarStyle: {
                    backgroundColor: "#1E293B", // Cor consistente com o tema principal
                },
                headerTitleAlign: 'center',
                headerTintColor: '#FFFFFF', // Cor do texto do header em branco
                tabBarActiveTintColor: "#FF7043", // Cor da tab ativa
                tabBarInactiveTintColor: "#FFFFFF", // Cor da tab inativa
            }}
        >
            <Tabs.Screen 
                name="tasks" 
                options={{
                    headerTitle: "Início",
                    tabBarLabel: "Início",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={32} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="user" 
                options={{
                    headerTitle: "Meus treinos",
                    tabBarLabel: "Meus treinos",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="dumbbell" color={color} size={32} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="about" 
                options={{
                    headerTitle: "Configurações",
                    tabBarLabel: "Configurações",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cog" color={color} size={32} />
                    ),
                }} 
            />
        </Tabs>
    );
}
