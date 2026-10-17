import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Menu, { Tela } from './components/Menu';
import Inicio from './screens/Inicio';
import Tarefas from './screens/Tarefas';
import Sobre from './screens/Sobre';
import { Tarefa } from './models/Tarefa';
import { buscarTarefas } from './services/tarefasApi';

export default function App() {
    const [telaAtual, setTelaAtual] = useState<Tela>('inicio');
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    async function carregarTarefas() {
        setCarregando(true);
        setErro('');

        try {
            const tarefasRecebidas = await buscarTarefas();
            setTarefas(tarefasRecebidas);
        } catch (erroRecebido) {
            setTarefas([]);

            if (erroRecebido instanceof Error) {
                setErro(erroRecebido.message);
            } else {
                setErro('Ocorreu um erro inesperado.');
            }
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        // busca as tarefas quando o aplicativo abre
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
