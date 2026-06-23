# Gestao TCCs

Sistema web de gestao de Trabalhos de Conclusao de Curso (TCCs), desenvolvido para a disciplina GAC116 - Programacao Web (UFLA 2026/1).

O **backend** e uma API REST em Django REST Framework (fornecido pelo professor). O **frontend** consome essa API usando React + TypeScript.

## Stack

### Backend
- Python 3.12+
- Django 6 + Django REST Framework
- SQLite (padrao)

### Frontend
- React 19 + TypeScript
- Vite
- TanStack Query (React Query)
- Axios
- Recharts
- Tailwind CSS

## Como rodar

### Pre-requisitos
- Python 3.12+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv venv

# Linux/Mac
source venv/bin/activate
# Windows PowerShell
.\venv\Scripts\Activate.ps1

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

O backend roda em `http://127.0.0.1:8000/`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend roda em `http://localhost:5173/`.

## Endpoints da API

| Endpoint | Descricao |
|---|---|
| `/api/unidades-academicas/` | CRUD de Unidades Academicas |
| `/api/departamentos/` | CRUD de Departamentos |
| `/api/cursos/` | CRUD de Cursos |
| `/api/alunos/` | CRUD de Alunos (busca por nome/matricula) |
| `/api/professores/` | CRUD de Professores (busca por nome) |
| `/api/tccs/` | CRUD de TCCs (busca por titulo/resumo) |
| `/api/tccs/estatisticas/` | Estatisticas agregadas para o Dashboard |

## Funcionalidades do Frontend

- **Dashboard** com graficos de TCCs por status, tipo, orientador e curso
- **CRUD completo de TCCs** com upload de PDF e alteracao de status
- **Cadastro e listagem** de todas as entidades (Unidades, Departamentos, Cursos, Alunos, Professores)
- **Busca** em Alunos, Professores e TCCs

## Estrutura do projeto

```
gestao-tccs/
├── backend/          # API Django REST Framework
├── frontend/         # React + Vite + TypeScript
│   ├── src/
│   │   ├── api/      # Funcoes de chamada a API (axios)
│   │   ├── hooks/    # Hooks React Query
│   │   ├── pages/    # Componentes de pagina
│   │   ├── components/ # Componentes reutilizaveis (Layout)
│   │   └── types/    # Interfaces TypeScript
│   └── ...
└── README.md
```
