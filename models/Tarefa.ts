export type StatusTarefa = 'Pendente' | 'Concluida';

export type Tarefa = {
    id: number;
    titulo: string;
    disciplina: string;
    dataEntrega: string;
    status: StatusTarefa;
};

export type DadosTarefa = {
    titulo: string;
    disciplina: string;
    dataEntrega: string;
};
