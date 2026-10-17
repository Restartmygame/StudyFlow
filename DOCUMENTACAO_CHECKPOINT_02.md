# Documentação do Checkpoint 02

## Identificação

- **Nome do projeto:** StudyFlow
- **Disciplina:** Programação Mobile
- **Professor:** Lenon Fachiano Silva
- **Integrante(s):** preencher antes da entrega
- **Checkpoint:** 02

## Objetivo da aplicação

O StudyFlow é um aplicativo de organização acadêmica. Ele ajuda o estudante a visualizar tarefas e acompanhar quais estão pendentes ou concluídas.

## Evolução em relação ao Checkpoint 01

No Checkpoint 01, as tarefas eram criadas pelo formulário e ficavam apenas na memória do aplicativo. No Checkpoint 02, a lista é recebida de uma Web API por uma requisição HTTP. Também foram adicionados os estados de carregamento, lista vazia e erro.

Foram mantidas as três telas e a navegação simples do projeto anterior:

- **Início:** apresenta a quantidade de tarefas pendentes e concluídas;
- **Tarefas:** mostra os dados recebidos da Web API e permite atualizar a consulta;
- **Sobre:** explica a API utilizada e os tratamentos implementados.

O componente principal guarda a lista e envia os dados para as telas por propriedades. A função de recarregar também é passada por propriedade para a tela de tarefas.

## Web API

- **Web API:** JSONPlaceholder;
- **URL base:** `https://jsonplaceholder.typicode.com`;
- **Recurso utilizado:** `/todos`;
- **Endpoint:** `GET /todos`;
- **Método HTTP:** GET;
- **Formato da resposta:** JSON.

Cada objeto recebido possui os campos `userId`, `id`, `title` e `completed`. O serviço usa as 12 primeiras tarefas e converte esses nomes para `usuarioId`, `id`, `titulo` e `concluida` antes de enviar a lista para as telas.

Exemplo resumido de resposta:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

## Organização do código

- `components`: componentes visuais reutilizados;
- `models`: tipos da tarefa interna e da resposta da API;
- `screens`: telas principais do aplicativo;
- `services/tarefasApi.ts`: comunicação com a Web API;
- `App.tsx`: navegação, estados e chamada inicial dos dados.

A comunicação HTTP foi colocada na pasta `services` para não misturar a requisição com a parte visual.

## Estados e tratamento de respostas

O `App.tsx` usa os estados `tarefas`, `carregando` e `erro`. O `useEffect` chama a função assíncrona quando o aplicativo é aberto, e a função usa `async/await` para esperar a resposta.

Foram tratados os casos solicitados:

- **API disponível com dados:** os cards das tarefas são mostrados;
- **API disponível sem dados:** aparece a mensagem de lista vazia;
- **Aguardando resposta:** aparece o indicador de carregamento;
- **Falha de comunicação:** aparece uma mensagem para conferir a conexão;
- **Erro no servidor:** aparece o código HTTP retornado;
- **JSON inválido:** aparece uma mensagem informando que o formato não pôde ser lido.

Nas situações de erro e lista vazia, o usuário pode fazer uma nova tentativa pelo botão da tela.

## Uso de Flexbox

O Flexbox foi usado no menu inferior, nos cards de resumo, no cabeçalho dos cards de tarefa e no alinhamento das informações da lista.

## Como executar

```bash
npm install
npm run web
```

Também é possível executar com `npm start` e abrir o aplicativo pelo Expo Go ou por um emulador.

## Repositório

<https://github.com/Restartmygame/StudyFlow>
