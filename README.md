# StudyFlow

Projeto da disciplina de Desenvolvimento Mobile. Esta versão corresponde ao **Checkpoint 02** e possui um aplicativo React Native integrado a uma Web API própria.

## Tecnologias

### Aplicativo

- React Native;
- Expo;
- TypeScript e TSX.

### Web API

- ASP.NET Core 8;
- Entity Framework Core;
- SQL Server;
- Swagger.

## Funcionalidades

- Navegação entre Início, Tarefas e Sobre;
- Cadastro de tarefas com POST;
- Consulta das tarefas com GET;
- Edição e alteração de status com PUT;
- Exclusão com DELETE;
- Dados armazenados no banco `StudyFlowDB`;
- Estados de carregamento, sucesso, lista vazia e erro;
- Comunicação com a API separada dos componentes visuais;
- Layout organizado com Flexbox.

## Preparar o banco de dados

A conexão padrão está configurada para um SQL Server local:

```text
Server=.;Database=StudyFlowDB;Trusted_Connection=True;TrustServerCertificate=True
```

Se o seu SQL Server utilizar a instância `SQLEXPRESS`, altere o início da conexão em `api/appsettings.json` para:

```text
Server=.\SQLEXPRESS
```

## Executar a API

Abra o primeiro terminal na pasta do projeto:

```cmd
cd api
dotnet restore
dotnet tool install --global dotnet-ef --version 8.*
dotnet ef database update
dotnet run --launch-profile http
```

O comando de instalação do `dotnet-ef` só precisa ser executado uma vez. Se ele já estiver instalado, siga para o próximo comando.

Com a API aberta, acesse:

- Swagger: <http://localhost:5288/swagger>
- Tarefas: <http://localhost:5288/api/tarefas>

## Executar o aplicativo

Mantenha a API funcionando e abra um segundo terminal na pasta principal:

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
