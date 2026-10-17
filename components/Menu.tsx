import { Pressable, StyleSheet, Text, View } from "react-native";

export type Tela = 'inicio' | 'tarefas' | 'sobre';

type MenuProps = {
    telaAtual: Tela,
    onMudarTela: (tela: Tela) => void
}

export default function Menu({
    telaAtual,
    onMudarTela
}: MenuProps) {

    return (
        <View style={styles.menu}>
            <Pressable
                style={[
                    styles.opcao,
                    telaAtual === 'inicio' && styles.opcaoSelecionada
                ]}
                onPress={() => onMudarTela('inicio')}
            >
                <Text style={styles.texto}>Início</Text>
            </Pressable>

            <Pressable
                style={[
                    styles.opcao,
                    telaAtual === 'tarefas' && styles.opcaoSelecionada
                ]}
                onPress={() => onMudarTela('tarefas')}
            >
                <Text style={styles.texto}>Tarefas</Text>
            </Pressable>

            <Pressable
                style={[
                    styles.opcao,
                    telaAtual === 'sobre' && styles.opcaoSelecionada
                ]}
                onPress={() => onMudarTela('sobre')}
            >
                <Text style={styles.texto}>Sobre</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#d8deeb',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 10,
    },

    opcao: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 18,
    },

    opcaoSelecionada: {
        backgroundColor: '#dfe6ff',
    },

    texto: {
        color: '#263557',
        fontWeight: 'bold',
    },
});
