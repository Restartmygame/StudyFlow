import { Pressable, StyleSheet, Text } from "react-native";

type BotaoProps = {
    titulo: string,
    onPress: () => void
}

export default function Botao({
    titulo,
    onPress
}: BotaoProps) {

    return (
        <Pressable
            style={styles.botao}
            onPress={ onPress }
        >
            <Text style={styles.texto}>
                { titulo }
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        backgroundColor: '#3157d5',
        borderRadius: 8,
        padding: 13,
        alignItems: 'center',
        marginTop: 12,
    },

    texto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
