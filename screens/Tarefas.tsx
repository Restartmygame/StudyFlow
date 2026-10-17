import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Botao from '../components/Botao';
import CardTarefa from '../components/CardTarefa';
import { DadosTarefa, Tarefa } from '../models/Tarefa';

type TarefasProps = {
    tarefas: Tarefa[];
    carregando: boolean;
    erro: string;
    onCadastrar: (dados: DadosTarefa) => Promise<boolean>;
    onAtualizar: (tarefa: Tarefa) => Promise<boolean>;
    onExcluir: (id: number) => Promise<boolean>;
    onRecarregar: () => Promise<boolean>;
};

function colocarMascaraNaData(texto: string) {
    const numeros = texto.replace(/\D/g, '').slice(0, 8);

    if (numeros.length <= 4) {
        return numeros;
    }

    if (numeros.length <= 6) {
        return `${numeros.slice(0, 4)}-${numeros.slice(4)}`;
    }

    return `${numeros.slice(0, 4)}-${numeros.slice(4, 6)}-${numeros.slice(6)}`;
}

function dataValida(data: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        return false;
    }

    const [ano, mes, dia] = data.split('-').map(Number);
    const dataConferida = new Date(ano, mes - 1, dia);

    return (
        dataConferida.getFullYear() === ano &&
        dataConferida.getMonth() === mes - 1 &&
        dataConferida.getDate() === dia
    );
}

export default function Tarefas({
    tarefas,
    carregando,
    erro,
    onCadastrar,
    onAtualizar,
    onExcluir,
    onRecarregar,
}: TarefasProps) {
    const [titulo, setTitulo] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [erroFormulario, setErroFormulario] = useState('');
    const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

    function limparFormulario() {
        setTitulo('');
        setDisciplina('');
        setDataEntrega('');
        setErroFormulario('');
        setTarefaEditando(null);
    }

    function iniciarEdicao(tarefa: Tarefa) {
        setTarefaEditando(tarefa);
        setTitulo(tarefa.titulo);
        setDisciplina(tarefa.disciplina);
        setDataEntrega(tarefa.dataEntrega.split('T')[0]);
        setErroFormulario('');
    }

    async function salvar() {
        if (
            titulo.trim() === '' ||
            disciplina.trim() === '' ||
            dataEntrega.trim() === ''
        ) {
            setErroFormulario('Preencha todos os campos!');
            return;
        }

        if (!dataValida(dataEntrega)) {
            setErroFormulario('Informe uma data válida no formato AAAA-MM-DD.');
            return;
        }

        const dados: DadosTarefa = {
            titulo: titulo.trim(),
            disciplina: disciplina.trim(),
            dataEntrega,
        };

        let sucesso: boolean;

        if (tarefaEditando) {
            sucesso = await onAtualizar({
                ...tarefaEditando,
                ...dados,
            });
        } else {
            sucesso = await onCadastrar(dados);
        }

        if (sucesso) {
            limparFormulario();
        }
    }

    async function excluir(id: number): Promise<boolean> {
        const sucesso = await onExcluir(id);

        if (sucesso && tarefaEditando?.id === id) {
            limparFormulario();
        }

        return sucesso;
    }

    if (carregando) {
        return (
            <View style={styles.estadoCentralizado}>
                <ActivityIndicator size="large" color="#3157d5" />
                <Text style={styles.textoCarregando}>Aguarde, comunicando com a API...</Text>
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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.conteudo}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.tituloTela}>Minhas tarefas</Text>
                        <Text style={styles.subtituloTela}>
                            Dados cadastrados na StudyFlowAPI.
                        </Text>

                        <View style={styles.formulario}>
                            <Text style={styles.tituloFormulario}>
                                {tarefaEditando ? 'Editar tarefa' : 'Nova tarefa'}
                            </Text>

                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: Entregar trabalho"
                                placeholderTextColor="#aab3c7"
                                value={titulo}
                                onChangeText={(texto) => {
                                    setTitulo(texto);
                                    setErroFormulario('');
                                }}
                                maxLength={100}
                            />

                            <Text style={styles.label}>Disciplina</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex.: Programação Mobile"
                                placeholderTextColor="#aab3c7"
                                value={disciplina}
                                onChangeText={(texto) => {
                                    setDisciplina(texto);
                                    setErroFormulario('');
                                }}
                                maxLength={60}
                            />

                            <Text style={styles.label}>Data de entrega</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="AAAA-MM-DD"
                                placeholderTextColor="#aab3c7"
                                value={dataEntrega}
                                onChangeText={(texto) => {
                                    setDataEntrega(colocarMascaraNaData(texto));
                                    setErroFormulario('');
                                }}
                                keyboardType="numeric"
                                maxLength={10}
                            />
                            <Text style={styles.dicaData}>
                                Digite somente os números. Os hífens aparecem automaticamente.
                            </Text>

                            {erroFormulario !== '' && (
                                <Text style={styles.erroFormulario}>{erroFormulario}</Text>
                            )}

                            <Botao
                                titulo={tarefaEditando ? 'Salvar alterações' : 'Adicionar tarefa'}
                                onPress={salvar}
                            />

                            {tarefaEditando && (
                                <Pressable style={styles.cancelar} onPress={limparFormulario}>
                                    <Text style={styles.textoCancelar}>Cancelar edição</Text>
                                </Pressable>
                            )}
                        </View>

                        <View style={styles.cabecalhoLista}>
                            <Text style={styles.tituloLista}>Lista</Text>
                            <Text style={styles.quantidade}>
                                {tarefas.length === 1
                                    ? '1 tarefa'
                                    : `${tarefas.length} tarefas`}
                            </Text>
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <CardTarefa
                        tarefa={item}
                        onEditar={iniciarEdicao}
                        onAtualizar={onAtualizar}
                        onExcluir={excluir}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.listaVazia}>
                        <Text style={styles.tituloVazio}>Nenhuma tarefa cadastrada</Text>
                        <Text style={styles.textoVazio}>
                            A API respondeu corretamente. Use o formulário para cadastrar.
                        </Text>
                    </View>
                }
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

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
        textAlign: 'center',
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

    tituloTela: {
        color: '#1d2a4a',
        fontSize: 28,
        fontWeight: 'bold',
    },

    subtituloTela: {
        color: '#65708a',
        fontSize: 15,
        marginTop: 4,
        marginBottom: 20,
    },

    formulario: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d8deeb',
        borderRadius: 10,
        padding: 16,
    },

    tituloFormulario: {
        color: '#1d2a4a',
        fontSize: 21,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    label: {
        color: '#263557',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#b9c2d6',
        borderRadius: 8,
        padding: 12,
        color: '#1d2a4a',
        fontSize: 16,
    },

    dicaData: {
        color: '#7f899f',
        fontSize: 13,
        marginTop: 5,
    },

    erroFormulario: {
        color: '#c53c3c',
        marginTop: 10,
        fontWeight: 'bold',
    },

    cancelar: {
        alignItems: 'center',
        padding: 11,
    },

    textoCancelar: {
        color: '#65708a',
        fontWeight: 'bold',
    },

    cabecalhoLista: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 12,
    },

    tituloLista: {
        color: '#1d2a4a',
        fontSize: 22,
        fontWeight: 'bold',
    },

    quantidade: {
        color: '#65708a',
        fontWeight: 'bold',
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
