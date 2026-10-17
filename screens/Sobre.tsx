import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Sobre() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Sobre o projeto</Text>
            <Text style={styles.subtitulo}>Projeto Integrador - Checkpoint 02</Text>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>Evolução do StudyFlow</Text>
                <Text style={styles.texto}>
                    O aplicativo agora consulta tarefas pela internet, transforma a
                    resposta JSON e mostra as informações nas telas.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>Web API utilizada</Text>
                <Text style={styles.item}>Base: jsonplaceholder.typicode.com</Text>
                <Text style={styles.item}>Recurso: /todos</Text>
                <Text style={styles.item}>Método HTTP: GET</Text>
                <Text style={styles.item}>Formato recebido: JSON</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>Tratamentos da tela</Text>
                <Text style={styles.item}>• carregamento dos dados;</Text>
                <Text style={styles.item}>• lista recebida com sucesso;</Text>
                <Text style={styles.item}>• resposta sem tarefas;</Text>
                <Text style={styles.item}>• falha de comunicação ou do servidor.</Text>
            </View>

            <Text style={styles.rodape}>Programação Mobile • 2026</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        paddingTop: 55,
    },

    titulo: {
        color: '#1d2a4a',
        fontSize: 28,
        fontWeight: 'bold',
    },

    subtitulo: {
        color: '#65708a',
        fontSize: 15,
        marginTop: 4,
        marginBottom: 22,
    },

    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d8deeb',
        borderRadius: 10,
        padding: 18,
        marginBottom: 14,
    },

    tituloCard: {
        color: '#1d2a4a',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 9,
    },

    texto: {
        color: '#4d5872',
        fontSize: 16,
        lineHeight: 23,
    },

    item: {
        color: '#4d5872',
        fontSize: 15,
        marginBottom: 7,
    },

    rodape: {
        color: '#65708a',
        textAlign: 'center',
        marginTop: 10,
    },
});
