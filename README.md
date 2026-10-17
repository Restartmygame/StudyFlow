# StudyFlow

Projeto mobile da disciplina de Desenvolvimento Mobile. Esta versão corresponde ao **Checkpoint 02** e foi desenvolvida com React Native, Expo, TypeScript e TSX.

## O que foi implementado

- Navegação entre Início, Tarefas e Sobre;
- Consulta de tarefas da Web API JSONPlaceholder;
- Requisição HTTP GET com `async/await`;
- Conversão da resposta JSON para o modelo usado pelo aplicativo;
- Estados de carregamento, sucesso, lista vazia e erro;
- Botão para repetir a consulta;
- Componentes visuais separados do serviço da API;
- Layout organizado com Flexbox.

## Executar o projeto

```bash
npm install
npm run web
```

Depois, abra no navegador o endereço mostrado pelo Expo no terminal.

Para executar pelo Expo Go ou emulador:

```bash
npm start
```

## API

O aplicativo faz uma requisição GET para:

```text
https://jsonplaceholder.typicode.com/todos
```

Mais detalhes estão em [DOCUMENTACAO_CHECKPOINT_02.md](./DOCUMENTACAO_CHECKPOINT_02.md).
