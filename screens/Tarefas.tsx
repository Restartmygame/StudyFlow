import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/Botao';
import CardTarefa from '../components/CardTarefa';
import { Tarefa } from '../models/Tarefa';

type TarefasProps = {
    tarefas: Tarefa[];
    carregando: boolean;
    erro: string;
    onRecarregar: () => void;
};

export default function Tarefas({
    tarefas,
    carregando,
    erro,
    onRecarregar,
}: TarefasProps) {
    if (carregando) {
        return (
            <View style={styles.estadoCentralizado}>
                <ActivityIndicator size="large" color="#3157d5" />
                <Text style={styles.textoCarregando}>Carregando tarefas...</Text>
            </View>
        );
    }

    if (erro !== '') {
        return (
            <View style={styles.estadoCentralizado}>
                <View style={styles.cardErro}>
                    <Text style={styles.tituloErro}>Não foi possível carregar</Text>
                    <Text style={styles.textoErro}>{erro}</Text>
                    <Botao titulo="Tentar novamente" onPress={onRecarregar} />
                </View>
            </View>
        );
    }

    return (
        <FlatList
            data={tarefas}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.conteudo}
            ListHeaderComponent={
                <View style={styles.cabecalhoLista}>
                    <Text style={styles.tituloTela}>Tarefas da API</Text>
                    <Text style={styles.subtituloTela}>
                        Dados recebidos com uma requisição HTTP GET.
                    </Text>

                    <View style={styles.linhaQuantidade}>
                        <Text style={styles.quantidade}>
                            {tarefas.length === 1
                                ? '1 tarefa encontrada'
                                : `${tarefas.length} tarefas encontradas`}
                        </Text>
                        <Text style={styles.origem}>JSONPlaceholder</Text>
                    </View>

                    <Botao titulo="Atualizar lista" onPress={onRecarregar} />
                </View>
            }
            renderItem={({ item }) => <CardTarefa tarefa={item} />}
            ListEmptyComponent={
                <View style={styles.listaVazia}>
                    <Text style={styles.tituloVazio}>Nenhuma tarefa encontrada</Text>
                    <Text style={styles.textoVazio}>
                        A API respondeu corretamente, mas não retornou dados.
                    </Text>
                    <Botao titulo="Buscar novamente" onPress={onRecarregar} />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    estadoCentralizado: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },

    textoCarregando: {
        color: '#4d5872',
        fontSize: 16,
        marginTop: 12,
    },

    cardErro: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: '#fff1f1',
        borderWidth: 1,
        borderColor: '#e5b6b6',
        borderRadius: 10,
        padding: 20,
    },

    tituloErro: {
        color: '#a62f2f',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    textoErro: {
        color: '#7c3f3f',
        fontSize: 15,
        lineHeight: 21,
    },

    conteudo: {
        padding: 24,
        paddingTop: 45,
        paddingBottom: 30,
        flexGrow: 1,
    },

    cabecalhoLista: {
        marginBottom: 22,
    },

    tituloTela: {
        color: '#1d2a4a',
        fontSize: 28,
        fontWeight: 'bold',
    },

    subtituloTela: {
        color: '#65708a',
        fontSize: 15,
        marginTop: 4,
        marginBottom: 18,
    },

    linhaQuantidade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    quantidade: {
        color: '#263557',
        fontWeight: 'bold',
    },

    origem: {
        color: '#65708a',
        fontSize: 13,
    },

    listaVazia: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d8deeb',
        borderRadius: 10,
        padding: 22,
        alignItems: 'center',
    },

    tituloVazio: {
        color: '#1d2a4a',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    textoVazio: {
        color: '#65708a',
        textAlign: 'center',
        lineHeight: 21,
    },
});
