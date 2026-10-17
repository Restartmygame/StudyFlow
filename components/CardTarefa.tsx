import { StyleSheet, Text, View } from 'react-native';
import { Tarefa } from '../models/Tarefa';

type CardTarefaProps = {
    tarefa: Tarefa;
};

export default function CardTarefa({ tarefa }: CardTarefaProps) {
    return (
        <View style={styles.card}>
            <View style={styles.cabecalho}>
                <Text style={styles.codigo}>Tarefa #{tarefa.id}</Text>
                <View
                    style={[
                        styles.situacao,
                        tarefa.concluida
                            ? styles.situacaoConcluida
                            : styles.situacaoPendente,
                    ]}
                >
                    <Text
                        style={[
                            styles.textoSituacao,
                            tarefa.concluida
                                ? styles.textoConcluida
                                : styles.textoPendente,
                        ]}
                    >
                        {tarefa.concluida ? 'Concluída' : 'Pendente'}
                    </Text>
                </View>
            </View>

            <Text style={styles.titulo}>{tarefa.titulo}</Text>
            <Text style={styles.usuario}>Usuário da API: {tarefa.usuarioId}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d8deeb',
        borderRadius: 10,
        padding: 16,
        marginBottom: 12,
    },

    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    codigo: {
        color: '#65708a',
        fontSize: 13,
        fontWeight: 'bold',
    },

    situacao: {
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    situacaoConcluida: {
        backgroundColor: '#dff4e7',
    },

    situacaoPendente: {
        backgroundColor: '#fff0d5',
    },

    textoSituacao: {
        fontSize: 12,
        fontWeight: 'bold',
    },

    textoConcluida: {
        color: '#19733d',
    },

    textoPendente: {
        color: '#9b6200',
    },

    titulo: {
        color: '#1d2a4a',
        fontSize: 17,
        fontWeight: 'bold',
        lineHeight: 23,
        marginBottom: 9,
    },

    usuario: {
        color: '#65708a',
        fontSize: 14,
    },
});
