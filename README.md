# FinTrack AI

Aplicação de controle financeiro pessoal desenvolvida com Next.js e TypeScript. Registre entradas, despesas e investimentos, acompanhe seu resumo mensal e obtenha análises com inteligência artificial.

## Funcionalidades

- Cadastro e login com e-mail e senha.
- Dashboard com saldo, entradas, despesas e investimentos por mês.
- Gráficos e distribuição das despesas por categoria.
- Listagem de transações e visualização dos registros recentes.
- Criação, edição e exclusão de transações do usuário autenticado.
- Classificação por categoria, forma de pagamento, tipo e data.
- Análises financeiras em português com integração à OpenAI.
- Validação de formulários com Zod.

O saldo mensal é calculado como **entradas − despesas − investimentos**. Os valores são exibidos em reais (BRL).

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Next.js 16 e React 19 | Páginas, componentes, Server Actions e rotas de API |
| TypeScript | Tipagem do código |
| Tailwind CSS 4, Radix UI e shadcn/ui | Estilização e componentes de interface |
| PostgreSQL e Prisma ORM 7 | Armazenamento, modelagem e acesso aos dados |
| Better Auth | Autenticação e sessões |
| React Hook Form e Zod | Formulários e validação |
| Recharts | Gráficos do dashboard |
| SDK da OpenAI | Geração das análises financeiras |

As versões declaradas estão em [package.json](./package.json).

## Como executar localmente

### 1. Pré-requisitos

- Node.js compatível com as dependências: `^20.19`, `^22.12` ou `>=24.0`.
- npm.
- Um banco PostgreSQL disponível e sua URL de conexão.
- Uma chave da API da OpenAI para utilizar as análises com IA.

### 2. Instale as dependências

No terminal, dentro da pasta do projeto:

```bash
npm ci
```

Esse comando instala as dependências usando as versões registradas em `package-lock.json`.

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```dotenv
DATABASE_URL="postgresql://usuario:senha@localhost:5432/fintrack?schema=public"
BETTER_AUTH_SECRET="substitua-por-um-segredo-aleatorio"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
OPENAI_API_KEY="sua-chave-da-api"
```

| Variável | Finalidade |
| --- | --- |
| `DATABASE_URL` | Conexão com o PostgreSQL, usada pela aplicação e pelo Prisma CLI |
| `BETTER_AUTH_SECRET` | Segredo utilizado pela autenticação |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação, usada pelo cliente e pelo servidor de autenticação |
| `OPENAI_API_KEY` | Chave utilizada no servidor para gerar análises com IA |

Para gerar um segredo aleatório, execute e copie o resultado para `BETTER_AUTH_SECRET`:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Substitua os exemplos pelos seus dados. O `.env` já está ignorado pelo Git; não publique suas credenciais. A variável com prefixo `NEXT_PUBLIC_` fica disponível no navegador e deve conter apenas a URL pública.

Sem `OPENAI_API_KEY`, o recurso de análise retorna um erro de configuração. O cadastro e o gerenciamento de transações não dependem dessa chave.

### 4. Prepare o banco

Com o banco indicado em `DATABASE_URL` disponível, aplique as migrations existentes e gere o Prisma Client:

```bash
npx prisma migrate deploy --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

O primeiro comando aplica o histórico de criação e alteração das tabelas em `prisma/migrations`. O segundo gera os arquivos de acesso ao banco em `src/generated/prisma`, que não são versionados.

**A configuração do Prisma deste projeto se chama `prisma7.config.ts`.** Informe `--config prisma7.config.ts` nos comandos que precisam dela.

### 5. Inicie a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000), crie uma conta em `/sign-up` e registre suas primeiras transações.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o Prisma Client e compila a aplicação Next.js |
| `npm start` | Inicia a aplicação compilada; requer um build anterior |
| `npm run lint` | Executa a análise estática com ESLint |
| `npx prisma studio --config prisma7.config.ts` | Abre uma interface para consultar e editar os dados do banco |

O script de build atual executa `prisma generate` sem indicar o arquivo personalizado de configuração. Para gerar o cliente com a configuração explícita e compilar em seguida, use:

```bash
npx prisma generate --config prisma7.config.ts
npx next build
npm start
```

O build não aplica migrations. Execute o comando de migrations separadamente no banco do ambiente correspondente.

## Estrutura do projeto

```text
prisma/
  migrations/          Histórico de alterações do banco
  schema.prisma        Modelos e enums do banco de dados
src/
  app/
    (auth)/            Páginas de login e cadastro
    _actions/          Criação, edição e exclusão no servidor
    _components/       Componentes da interface
    _constants/        Rótulos de tipos, categorias e formas de pagamento
    _data/             Consultas e cálculos do dashboard
    _schemas/          Regras de validação com Zod
    api/ai-insights/    Endpoint das análises com IA
    api/auth/          Endpoints de autenticação
    transactions/      Página de gerenciamento de transações
    page.tsx           Página inicial do dashboard
    layout.tsx         Layout principal
  assets/              Imagens e ícones
  generated/prisma/    Prisma Client gerado automaticamente
  lib/                 Prisma, autenticação e utilitários
  styles/              Estilos globais
prisma7.config.ts      Configuração do Prisma CLI
```

## Entendendo o fluxo de uma transação

1. O usuário preenche o formulário em `src/app/_components/add-transaction.tsx`.
2. Os dados são enviados à Server Action em `src/app/_actions/add-transaction.ts`.
3. A função valida os dados com Zod e consulta a sessão do usuário.
4. O Prisma salva a transação no PostgreSQL, vinculada ao usuário autenticado.
5. A página inicial é revalidada para refletir os novos dados.

Os tipos do TypeScript ajudam durante o desenvolvimento. O Zod verifica os dados durante a execução, inclusive no servidor.

## Análises com IA

O componente de análises envia o resumo do período para `POST /api/ai-insights`. A rota exige uma sessão autenticada, valida o conteúdo recebido e solicita uma análise ao modelo `gpt-4o-mini`, configurado no código.

São enviados à OpenAI os totais de entradas, despesas, investimentos, saldo e gastos por categoria, junto com o mês e o ano. O componente solicita a análise automaticamente quando há transações no período e permite atualizá-la pela interface.

## Verificação

Para verificar problemas de código:

```bash
npm run lint
```

O projeto ainda não possui um script de testes automatizados no `package.json`.
