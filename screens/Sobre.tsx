import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Sobre() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Sobre o StudyFlow</Text>
            <Text style={styles.subtitulo}>Projeto Integrador de Programação Mobile</Text>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>O que é?</Text>
                <Text style={styles.texto}>
                    O StudyFlow é um aplicativo para organizar atividades acadêmicas.
                    Nele, o estudante pode registrar tarefas, disciplinas e datas de
                    entrega, além de acompanhar o que está pendente ou concluído.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>Principais recursos</Text>
                <Text style={styles.item}>• cadastrar, editar e excluir tarefas;</Text>
                <Text style={styles.item}>• marcar uma atividade como concluída;</Text>
                <Text style={styles.item}>• reabrir uma tarefa concluída;</Text>
                <Text style={styles.item}>• visualizar o resumo de tarefas;</Text>
                <Text style={styles.item}>• manter os dados salvos após fechar o aplicativo.</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.tituloCard}>Tecnologias utilizadas</Text>
                <Text style={styles.item}>• React Native e Expo na interface;</Text>
                <Text style={styles.item}>• TypeScript e TSX no desenvolvimento;</Text>
                <Text style={styles.item}>• ASP.NET Core na Web API;</Text>
                <Text style={styles.item}>• Entity Framework Core e SQL Server nos dados.</Text>
            </View>

            <Text style={styles.rodape}>StudyFlow • Programação Mobile • 2026</Text>
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
