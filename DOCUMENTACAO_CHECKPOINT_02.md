# Documentação do Checkpoint 02

## Identificação

- **Nome do projeto:** StudyFlow
- **Disciplina:** Programação Mobile
- **Professor:** Lenon Fachiano Silva
- **Integrante:** Diego Santos Farias
- **Checkpoint:** 02
- **Data de entrega:** 20/10/2026

## Objetivo da aplicação

O StudyFlow é um aplicativo de organização acadêmica. Ele permite cadastrar atividades, informar a disciplina e a data de entrega e acompanhar se cada tarefa está pendente ou concluída.

## Evolução em relação ao Checkpoint 01

No Checkpoint 01, as tarefas ficavam somente na memória do aplicativo. Ao fechar ou atualizar a página, as informações eram perdidas.

No Checkpoint 02, foi criada a `StudyFlowAPI`, uma Web API própria desenvolvida em um projeto separado com ASP.NET Core, Entity Framework Core e SQL Server. As funções do primeiro checkpoint foram mantidas e passaram a usar requisições HTTP. Também foram acrescentadas a edição e a alteração de status.

## Navegação e transferência de dados

O aplicativo continua dividido em três telas:

- **Início:** apresenta a quantidade de tarefas pendentes e concluídas;
- **Tarefas:** contém o formulário e a listagem completa;
- **Sobre:** apresenta as informações técnicas do projeto.

O `App.tsx` mantém os estados principais e envia a lista e as funções para as telas por propriedades. A tela de tarefas envia os dados preenchidos de volta para essas funções.

## Web API

- **Nome:** StudyFlowAPI;
- **URL base:** `http://localhost:5288`;
- **Tecnologia:** ASP.NET Core 8;
- **Banco de dados:** SQL Server;
- **Banco criado:** `StudyFlowDB`;
- **Formato das mensagens:** JSON;
- **Recurso principal:** `/api/tarefas`.

### Entidade Tarefa

| Campo | Tipo | Finalidade |
|---|---|---|
| `id` | número | Identificação da tarefa |
| `titulo` | texto | Nome da atividade |
| `disciplina` | texto | Disciplina relacionada |
| `dataEntrega` | data | Prazo da atividade |
| `status` | texto | `Pendente` ou `Concluida` |

### Endpoints

| Método | Endpoint | Função |
|---|---|---|
| GET | `/api/tarefas` | Lista todas as tarefas |
| GET | `/api/tarefas/{id}` | Consulta uma tarefa pelo ID |
| POST | `/api/tarefas` | Cadastra uma tarefa |
| PUT | `/api/tarefas/{id}` | Atualiza todos os dados da tarefa |
| DELETE | `/api/tarefas/{id}` | Exclui uma tarefa |

Exemplo de cadastro:

```json
{
  "titulo": "Entregar o Checkpoint 02",
  "disciplina": "Programação Mobile",
  "dataEntrega": "2026-10-20"
}
```

## Organização do projeto da API

- `Controllers`: endpoints e respostas HTTP;
- `DTO`: formatos usados no cadastro, na atualização e na resposta;
- `Data`: configuração do contexto do Entity Framework;
- `Models`: entidade e enum de status;
- `Migrations`: criação da tabela no banco;
- `Program.cs`: banco, Swagger, CORS e controllers.

A API está no repositório separado `StudyFlowAPI`. Sua organização foi baseada no exemplo desenvolvido em aula e mantida simples para facilitar a leitura.

## Comunicação do aplicativo

O arquivo `services/tarefasApi.ts` concentra as chamadas feitas com `fetch`:

- `buscarTarefas` utiliza GET;
- `cadastrarTarefa` utiliza POST;
- `atualizarTarefa` utiliza PUT;
- `excluirTarefa` utiliza DELETE.

As telas não fazem requisições diretamente. Elas chamam funções recebidas pelo `App.tsx`, mantendo a parte visual separada da comunicação com a API.

## Estados e tratamento de respostas

O aplicativo utiliza os estados `tarefas`, `carregando` e `erro`. O `useEffect` faz a primeira consulta quando o aplicativo abre, e as operações usam `async/await`.

Foram tratados os seguintes casos:

- API disponível com dados;
- API disponível sem dados;
- espera pela resposta;
- falha na comunicação;
- resposta HTTP com erro;
- tentativa de consultar um registro inexistente.

Quando a API está vazia, o formulário continua disponível para o primeiro cadastro. Quando a comunicação falha, aparece uma mensagem e um botão para tentar novamente.

## Uso de Flexbox

O Flexbox foi utilizado no menu inferior, nos cards de resumo, no cabeçalho das tarefas e na organização dos botões de cada card.

## Repositórios

- Aplicativo mobile: <https://github.com/Restartmygame/StudyFlow>
- Web API: <https://github.com/Restartmygame/StudyFlowAPI>
