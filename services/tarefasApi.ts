import { DadosTarefa, Tarefa } from '../models/Tarefa';

const URL_API = 'http://localhost:5288/api/tarefas';

async function fazerRequisicao(
    url: string,
    opcoes?: RequestInit
): Promise<Response> {
    try {
        const resposta = await fetch(url, opcoes);

        if (!resposta.ok) {
            throw new Error(`A API respondeu com o erro ${resposta.status}.`);
        }

        return resposta;
    } catch (erro) {
        if (erro instanceof TypeError) {
            throw new Error(
                'Não foi possível acessar a API. Confira se ela está em execução.'
            );
        }

        throw erro;
    }
}

export async function buscarTarefas(): Promise<Tarefa[]> {
    const resposta = await fazerRequisicao(URL_API);
    const tarefas: Tarefa[] = await resposta.json();

    return tarefas;
}

export async function cadastrarTarefa(dados: DadosTarefa): Promise<void> {
    await fazerRequisicao(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    });
}

export async function atualizarTarefa(tarefa: Tarefa): Promise<void> {
    await fazerRequisicao(`${URL_API}/${tarefa.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titulo: tarefa.titulo,
            disciplina: tarefa.disciplina,
            dataEntrega: tarefa.dataEntrega,
            status: tarefa.status,
        }),
    });
}

export async function excluirTarefa(id: number): Promise<void> {
    await fazerRequisicao(`${URL_API}/${id}`, {
        method: 'DELETE',
    });
}
