# Rails + React + Postgres Template

Starter template for building a Rails API backend with a React (Vite + TypeScript) frontend, using Postgres and Docker Compose for local development.

## Stack

- Rails `8.x` API backend
- React `19` + Vite frontend
- Tailwind CSS `v4` preconfigured for frontend styling
- PostgreSQL `14`
- Docker Compose orchestration
- Testing: `RSpec` (backend), `Vitest` (frontend)
- Lint/format: `RuboCop`, `ESLint`, `Prettier`

## Project Structure

- `backend` - Rails API app
- `frontend` - React app
- `docker-compose.yml` - local dev services
- `run` - helper script for common tasks

## Quick Start

### 1) Start the full stack

```bash
./run stack
```

Detached mode:

```bash
./run stack-detach
```

### 2) Open apps

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

### 3) Stop stack

```bash
./run stop
```

## Common Commands

### Logs

```bash
./run logs
```

### Backend commands

Install gems:

```bash
./run bundle:install
```

Run arbitrary Rails command:

```bash
./run rails bundle exec rails db:migrate
```

Run backend tests:

```bash
./run rspec
```

### Frontend commands

Run npm command in frontend container:

```bash
./run npm install
```

Run npx command in frontend container:

```bash
./run npx vitest --watch
```

Run frontend tests:

```bash
./run test
```

### Code quality

Run lint/format checks:

```bash
./run lint
```

Auto-fix where possible:

```bash
./run lint:fix
```

## Environment Variables

Frontend can optionally use:

- `VITE_BACKEND_URL` (for explicit backend base host)

If unset, frontend uses relative `/api` paths and relies on Vite proxy configuration.
