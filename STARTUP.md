
# Documentação de Configuração e Inicialização da API

Esta documentação fornece orientações sobre como configurar e inicializar a API localmente após clonar o repositório.

## Pré-requisitos

Antes de começar, certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Clonando o Repositório

Clone o repositório para sua máquina local:

```bash
git clone <URL do repositório>
cd projeto-final-dbe-t08-dds-t17
```

## Configurando Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```plaintext
PORT=<porta da API>
POSTGRES_PORT=<porta do PostgreSQL>
POSTGRES_PASSWORD=postgres
POSTGRES_USER=postgres
JWT_SECRET=<seu_secret_para_JWT>
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
ZOHO_MAIL_USER=<seu_email>
ZOHO_MAIL_PASSWORD=<sua_senha>
ZOHO_SMTP_HOST=<host_do_SMTP>
ZOHO_SMTP_PORT=<porta_do_SMTP>
ZOHO_SMTP_SECURE=true
ZOHO_SMTP_TLS=false
supabaseKey=<sua_chave_do_supabase>
```

Certifique-se de substituir os valores entre `< >` pelos seus próprios dados.

## Inicializando o Banco de Dados

1. **Inicie o Docker e o PostgreSQL:**

   Execute o seguinte comando na raiz do projeto para iniciar o banco de dados usando o Docker Compose:

   ```bash
   docker-compose up -d
   ```

   Isso criará um container Docker com o PostgreSQL em execução.

2. **Verifique se o banco de dados está em execução:**

   Você pode verificar se o container está ativo usando:

   ```bash
   docker ps
   ```

   Você deve ver um container chamado `projeto-final` em execução.

## Instalando Dependências

Instale as dependências do projeto com o npm:

```bash
npm install
```

## Compilando o Código TypeScript

Compile o código TypeScript usando o comando:

```bash
npm run build
```

## Inicializando a API em Modo de Desenvolvimento

Para iniciar a API em modo de desenvolvimento, use o seguinte comando:

```bash
npm run dev
```

Esse comando utilizará o `nodemon` para monitorar mudanças no código e reiniciar a aplicação automaticamente.

## Inicializando a API em Modo de Produção

Se você deseja iniciar a API em modo de produção, primeiro compile o código e, em seguida, inicie o servidor:

```bash
npm run build
npm start
```

## Executando Testes

Para executar os testes, use o seguinte comando:

```bash
npm test
```

## Estilos de Código

Para verificar e formatar o código, você pode usar:

```bash
npm run format    # Formatar o código
```

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

```
projeto-final-dbe-t08-dds-t17/
├── dist/               # Código compilado
├── node_modules/       # Dependências do projeto
├── src/                # Código fonte
│   ├── index.ts        # Ponto de entrada da API
│   └── ...             # Outros arquivos e pastas
├── .env                # Variáveis de ambiente
├── package.json        # Configurações do projeto
└── tsconfig.json       # Configurações do TypeScript
```

## Considerações Finais

Caso encontre algum problema ou tenha dúvidas, entre em contato com a equipe de desenvolvimento ou consulte a documentação oficial das ferramentas utilizadas.

