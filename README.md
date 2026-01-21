# Streaming Platform - Frontend

Frontend profissional em Next.js para plataforma de streaming de vídeos, desenvolvido com TypeScript, Tailwind CSS e React Query.

## 🚀 Tecnologias

- **Next.js 14+** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** para estilização
- **React Query (TanStack Query)** para gerenciamento de estado server
- **Zod** para validação de schemas
- **Axios** para chamadas HTTP

## 📋 Pré-requisitos

- Node.js 18+ instalado
- API backend rodando em `http://localhost:3333`

## 🛠️ Instalação

1. Clone o repositório e navegue até a pasta do projeto:

```bash
cd streaming-platform
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## ▶️ Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (public)/          # Rotas públicas
│   │   ├── page.tsx       # Home - catálogo de vídeos
│   │   └── video/[id]/    # Página de detalhes do vídeo
│   ├── admin/             # Área administrativa
│   │   ├── layout.tsx     # Layout com navegação admin
│   │   ├── page.tsx       # Dashboard admin
│   │   └── videos/        # Gerenciamento de vídeos
│   ├── layout.tsx         # Layout raiz
│   ├── providers.tsx      # Providers (React Query)
│   └── globals.css        # Estilos globais
├── components/
│   ├── ui/                # Componentes genéricos
│   ├── video/             # Componentes de vídeo
│   └── admin/             # Componentes admin
├── lib/
│   ├── api/               # Cliente API e funções
│   ├── schemas/           # Schemas Zod
│   └── utils/             # Utilitários
├── hooks/                 # Custom hooks
└── types/                 # Type definitions
```

## 🎯 Funcionalidades

### Área Pública

- **Home/Catálogo** (`/`):
  - Grid responsivo de vídeos
  - Busca com debounce de 500ms
  - Estados de loading, erro e vazio
  - Cards com thumbnail placeholder, título, descrição e duração

- **Detalhes do Vídeo** (`/video/[id]`):
  - Player placeholder
  - Informações completas do vídeo
  - Navegação de volta ao catálogo

### Área Admin (`/admin`)

- **Dashboard**:
  - Estatísticas (total de vídeos, duração total)
  - Lista de vídeos recentes
  - Links rápidos

- **Gerenciamento de Vídeos** (`/admin/videos`):
  - Tabela responsiva com todos os vídeos
  - Ações de editar e deletar
  - Confirmação antes de deletar

- **Criar/Editar Vídeo**:
  - Formulário com validação em tempo real (Zod)
  - Campos: título, descrição, duração (minutos/segundos)
  - Feedback visual de erros
  - Loading states e toasts de confirmação

## 🔧 Configuração da API

### CORS

A API precisa estar configurada para aceitar requisições CORS do frontend. Se você encontrar erros de CORS, adicione a seguinte configuração no arquivo `server.js` da API:

1. Instale o plugin CORS:
```bash
cd primeira-api-node
npm install @fastify/cors
```

2. Adicione no início do arquivo `server.js`:
```javascript
import cors from '@fastify/cors';

// Após criar o servidor, antes das rotas:
await server.register(cors, {
  origin: true, // Permite todas as origens (ou especifique 'http://localhost:3000' para produção)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
```

### Endpoint de Busca Individual

**Nota importante**: A API atual não possui um endpoint `GET /videos/:id`. O frontend busca o vídeo específico filtrando a lista completa. Para melhor performance em produção, considere adicionar este endpoint na API.

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🎨 Design

O projeto utiliza um tema escuro moderno inspirado em plataformas de streaming, com:
- Cores: Gray-900 (background), Gray-800 (cards), Blue-600 (accent)
- Animações sutis em hover e transições
- Layout responsivo (mobile-first)
- Estados visuais claros (loading, erro, vazio)

## ✅ Critérios de Qualidade

- ✅ TypeScript strict mode (zero `any` sem justificativa)
- ✅ Componentização adequada
- ✅ Custom hooks para lógica reutilizável
- ✅ Tratamento de erros robusto
- ✅ Validação com Zod
- ✅ Acessibilidade (semântica HTML, labels, ARIA)
- ✅ Performance (React Query cache, debounce, code splitting)

## 🐛 Troubleshooting

### Erro de CORS

Se encontrar erros de CORS ao fazer requisições, verifique se a API está configurada para aceitar requisições do frontend.

### API não encontrada

Certifique-se de que a API está rodando em `http://localhost:3333` antes de iniciar o frontend.

### Erro de build

Execute `npm install` novamente e verifique se todas as dependências foram instaladas corretamente.

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
