import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#1E293B" }, // Azul escuro moderno
                headerShadowVisible: false,
                headerTintColor: "#FFFFFF", // Texto do header em branco
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false, // Oculta o header para a tela de login
                }}
            />
            <Stack.Screen
                name="user_create"
                options={{
                    headerTitle: 'Cadastro', // Mostra um título simples para a tela de cadastro
                    headerTitleStyle: {
                        color: "#FFFFFF", // Cor do texto branco
                        fontSize: 20, // Tamanho do texto
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="internas"
                options={{
                    headerShown: false, // Oculta o header para telas internas
                }}
            />
        </Stack>
    );
}
