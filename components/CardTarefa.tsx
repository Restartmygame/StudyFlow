import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Tarefa } from '../models/Tarefa';

type CardTarefaProps = {
    tarefa: Tarefa;
    onEditar: (tarefa: Tarefa) => void;
    onAtualizar: (tarefa: Tarefa) => Promise<boolean>;
    onExcluir: (id: number) => Promise<boolean>;
};

export default function CardTarefa({
    tarefa,
    onEditar,
    onAtualizar,
    onExcluir,
}: CardTarefaProps) {
    function formatarData(data: string) {
        const dataSemHorario = data.split('T')[0];
        const partes = dataSemHorario.split('-');

        if (partes.length !== 3) {
            return data;
        }

        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function alterarStatus() {
        onAtualizar({
            ...tarefa,
            status: tarefa.status === 'Pendente' ? 'Concluida' : 'Pendente',
        });
    }

    return (
        <View style={styles.card}>
            <View style={styles.cabecalho}>
                <Text style={styles.disciplina}>{tarefa.disciplina}</Text>
                <View
                    style={[
                        styles.situacao,
                        tarefa.status === 'Concluida'
                            ? styles.situacaoConcluida
                            : styles.situacaoPendente,
                    ]}
                >
                    <Text
                        style={[
                            styles.textoSituacao,
                            tarefa.status === 'Concluida'
                                ? styles.textoConcluida
                                : styles.textoPendente,
                        ]}
                    >
                        {tarefa.status === 'Concluida' ? 'Concluída' : 'Pendente'}
                    </Text>
                </View>
            </View>

            <Text style={styles.titulo}>{tarefa.titulo}</Text>
            <Text style={styles.data}>
                Entrega: {formatarData(tarefa.dataEntrega)}
            </Text>

            <View style={styles.acoes}>
                <Pressable style={styles.botaoSecundario} onPress={() => onEditar(tarefa)}>
                    <Text style={styles.textoSecundario}>Editar</Text>
                </Pressable>

                <Pressable style={styles.botaoStatus} onPress={alterarStatus}>
                    <Text style={styles.textoStatus}>
                        {tarefa.status === 'Concluida' ? 'Reabrir' : 'Concluir'}
                    </Text>
                </Pressable>

                <Pressable style={styles.botaoExcluir} onPress={() => onExcluir(tarefa.id)}>
                    <Text style={styles.textoExcluir}>Excluir</Text>
                </Pressable>
            </View>
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

    disciplina: {
        color: '#65708a',
        flex: 1,
        fontSize: 14,
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
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 7,
    },

    data: {
        color: '#65708a',
        fontSize: 14,
    },

    acoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 15,
    },

    botaoSecundario: {
        borderWidth: 1,
        borderColor: '#3157d5',
        borderRadius: 6,
        paddingVertical: 7,
        paddingHorizontal: 11,
    },

    textoSecundario: {
        color: '#3157d5',
        fontWeight: 'bold',
    },

    botaoStatus: {
        backgroundColor: '#3157d5',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 11,
    },

    textoStatus: {
        color: '#ffffff',
        fontWeight: 'bold',
    },

    botaoExcluir: {
        borderWidth: 1,
        borderColor: '#c53c3c',
        borderRadius: 6,
        paddingVertical: 7,
        paddingHorizontal: 11,
    },

    textoExcluir: {
        color: '#c53c3c',
        fontWeight: 'bold',
    },
});
