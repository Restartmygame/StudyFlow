import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import { Tarefa } from '../models/Tarefa';

type InicioProps = {
    tarefas: Tarefa[];
    carregando: boolean;
    erro: string;
    onAbrirTarefas: () => void;
};

export default function Inicio({
    tarefas,
    carregando,
    erro,
    onAbrirTarefas,
}: InicioProps) {
    const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
    const pendentes = tarefas.length - concluidas;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>STUDYFLOW</Text>
            <Text style={styles.subtitulo}>Organizador de atividades acadêmicas</Text>

            {carregando ? (
                <View style={styles.cardMensagem}>
                    <ActivityIndicator size="large" color="#3157d5" />
                    <Text style={styles.textoMensagem}>Buscando tarefas na Web API...</Text>
                </View>
            ) : erro !== '' ? (
                <View style={styles.cardErro}>
                    <Text style={styles.tituloErro}>Dados indisponíveis</Text>
                    <Text style={styles.textoErro}>{erro}</Text>
                </View>
            ) : (
                <View style={styles.resumo}>
                    <View style={[styles.cardResumo, styles.cardPendente]}>
                        <Text style={styles.numero}>{pendentes}</Text>
                        <Text style={styles.descricaoNumero}>pendentes</Text>
                    </View>

                    <View style={[styles.cardResumo, styles.cardConcluida]}>
                        <Text style={styles.numero}>{concluidas}</Text>
                        <Text style={styles.descricaoNumero}>concluídas</Text>
                    </View>
                </View>
            )}

            <View style={styles.cardApresentacao}>
                <Text style={styles.tituloCard}>Tarefas da API</Text>
                <Text style={styles.texto}>
                    Nesta versão, o StudyFlow consulta tarefas de uma Web API e
                    mostra os dados recebidos em formato JSON.
                </Text>

                <Botao
                    titulo="Ver tarefas"
                    onPress={onAbrirTarefas}
                />
            </View>
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
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subtitulo: {
        color: '#65708a',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
    },

    resumo: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },

    cardResumo: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 20,
        alignItems: 'center',
    },

    cardPendente: {
        backgroundColor: '#d98218',
    },

    cardConcluida: {
        backgroundColor: '#258552',
    },

    numero: {
        color: '#ffffff',
        fontSize: 38,
        fontWeight: 'bold',
    },

    descricaoNumero: {
        color: '#ffffff',
        fontSize: 15,
    },

    cardMensagem: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
    },

    textoMensagem: {
        color: '#4d5872',
        marginTop: 12,
    },

    cardErro: {
        backgroundColor: '#fff1f1',
        borderWidth: 1,
        borderColor: '#e5b6b6',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
    },

    tituloErro: {
        color: '#a62f2f',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    textoErro: {
        color: '#7c3f3f',
        lineHeight: 21,
    },

    cardApresentacao: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d8deeb',
        borderRadius: 12,
        padding: 20,
    },

    tituloCard: {
        color: '#1d2a4a',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    texto: {
        color: '#4d5872',
        fontSize: 16,
        lineHeight: 23,
    },
});
