import { Tarefa, TarefaApi } from '../models/Tarefa';

const URL_BASE = 'https://jsonplaceholder.typicode.com';

export async function buscarTarefas(): Promise<Tarefa[]> {
    let resposta: Response;

    try {
        resposta = await fetch(`${URL_BASE}/todos`);
    } catch {
        throw new Error(
            'Não foi possível se comunicar com a Web API. Verifique sua conexão.'
        );
    }

    if (!resposta.ok) {
        throw new Error(`O servidor respondeu com o erro ${resposta.status}.`);
    }

    let dados: TarefaApi[];

    try {
        // transforma a resposta da API em um objeto que o aplicativo consegue usar
        dados = await resposta.json();
    } catch {
        throw new Error('A Web API retornou um JSON inválido.');
    }

    if (!Array.isArray(dados)) {
        throw new Error('A Web API retornou os dados em um formato inesperado.');
    }

    return dados.slice(0, 12).map((item) => ({
        id: item.id,
        titulo: item.title,
        usuarioId: item.userId,
        concluida: item.completed,
    }));
}
