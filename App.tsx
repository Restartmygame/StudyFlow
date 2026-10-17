import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu, { Tela } from './components/Menu';
import Inicio from './screens/Inicio';
import Tarefas from './screens/Tarefas';
import Sobre from './screens/Sobre';
import { DadosTarefa, Tarefa } from './models/Tarefa';
import {
    atualizarTarefa,
    buscarTarefas,
    cadastrarTarefa,
    excluirTarefa,
} from './services/tarefasApi';

export default function App() {
    const [telaAtual, setTelaAtual] = useState<Tela>('inicio');
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    function mostrarErro(erroRecebido: unknown) {
        if (erroRecebido instanceof Error) {
            setErro(erroRecebido.message);
        } else {
            setErro('Ocorreu um erro inesperado.');
        }
    }

    async function carregarTarefas(): Promise<boolean> {
        setCarregando(true);
        setErro('');

        try {
            const tarefasRecebidas = await buscarTarefas();
            setTarefas(tarefasRecebidas);
            return true;
        } catch (erroRecebido) {
            setTarefas([]);
            mostrarErro(erroRecebido);
            return false;
        } finally {
            setCarregando(false);
        }
    }

    async function cadastrar(dados: DadosTarefa): Promise<boolean> {
        setCarregando(true);
        setErro('');

        try {
            await cadastrarTarefa(dados);
            return await carregarTarefas();
        } catch (erroRecebido) {
            mostrarErro(erroRecebido);
            setCarregando(false);
            return false;
        }
    }

    async function atualizar(tarefa: Tarefa): Promise<boolean> {
        setCarregando(true);
        setErro('');

        try {
            await atualizarTarefa(tarefa);
            return await carregarTarefas();
        } catch (erroRecebido) {
            mostrarErro(erroRecebido);
            setCarregando(false);
            return false;
        }
    }

    async function excluir(id: number): Promise<boolean> {
        setCarregando(true);
        setErro('');

        try {
            await excluirTarefa(id);
            return await carregarTarefas();
        } catch (erroRecebido) {
            mostrarErro(erroRecebido);
            setCarregando(false);
            return false;
        }
    }

    useEffect(() => {
        // carrega os dados da API quando o aplicativo abre
        carregarTarefas();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.conteudo}>
                {telaAtual === 'inicio' && (
                    <Inicio
                        tarefas={tarefas}
                        carregando={carregando}
                        erro={erro}
                        onAbrirTarefas={() => setTelaAtual('tarefas')}
                    />
                )}

                {telaAtual === 'tarefas' && (
                    <Tarefas
                        tarefas={tarefas}
                        carregando={carregando}
                        erro={erro}
                        onCadastrar={cadastrar}
                        onAtualizar={atualizar}
                        onExcluir={excluir}
                        onRecarregar={carregarTarefas}
                    />
                )}

                {telaAtual === 'sobre' && <Sobre />}
            </View>

            <Menu
                telaAtual={telaAtual}
                onMudarTela={setTelaAtual}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6fa',
    },

    conteudo: {
        flex: 1,
    },
});
