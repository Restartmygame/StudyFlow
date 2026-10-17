# StudyFlow

Projeto da disciplina de Desenvolvimento Mobile. Esta versão corresponde ao **Checkpoint 02** e possui um aplicativo React Native integrado à API própria do StudyFlow.

## Tecnologias

### Aplicativo

- React Native;
- Expo;
- TypeScript e TSX.

## Funcionalidades

- Navegação entre Início, Tarefas e Sobre;
- Cadastro de tarefas com POST;
- Consulta das tarefas com GET;
- Edição e alteração de status com PUT;
- Exclusão com DELETE;
- Dados armazenados pela API no banco `StudyFlowDB`;
- Estados de carregamento, sucesso, lista vazia e erro;
- Comunicação com a API separada dos componentes visuais;
- Layout organizado com Flexbox.

## API utilizada

A Web API está em um projeto separado:

<https://github.com/Restartmygame/StudyFlowAPI>

Antes de abrir o aplicativo, execute a API seguindo as instruções do repositório dela. O endereço esperado pelo aplicativo é `http://localhost:5288/api/tarefas`.

## Executar o aplicativo

Mantenha a API funcionando e abra outro terminal na pasta do aplicativo:

```cmd
npm install
npm run web
```

Depois, abra no navegador o endereço mostrado pelo Expo.

## Endpoints

| Método | Endpoint | Operação |
|---|---|---|
| GET | `/api/tarefas` | Listar tarefas |
| GET | `/api/tarefas/{id}` | Consultar por ID |
| POST | `/api/tarefas` | Cadastrar |
| PUT | `/api/tarefas/{id}` | Editar ou alterar status |
| DELETE | `/api/tarefas/{id}` | Excluir |

Mais detalhes estão em [DOCUMENTACAO_CHECKPOINT_02.md](./DOCUMENTACAO_CHECKPOINT_02.md).
