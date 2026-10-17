export type Tarefa = {
    id: number;
    titulo: string;
    usuarioId: number;
    concluida: boolean;
};

export type TarefaApi = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};
