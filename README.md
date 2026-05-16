# World Cup Sweepstakes

A sweepstakes app for the FIFA World Cup. Players rank every team before the deadline; after the deadline, an admin runs the team assignment. Points accrue from live match results and group standings, and the league leaderboard updates as data is synced.

## Stack

- Rails `8.x` API backend (root of repo)
- React `19` + Vite + TypeScript frontend (`frontend/`)
- Tailwind CSS `v4`
- PostgreSQL `14`
- Docker Compose for local development
- [football-data.org](https://www.football-data.org/) for teams, matches, and standings
- Auth: Devise + JWT
- Testing: RSpec (backend), Vitest (frontend)
- Lint/format: RuboCop, ESLint, Prettier

## How it works

1. **Join a sweepstake** — Users sign up and join via a sweepstake join code.
2. **Rank teams** — Each player orders all World Cup teams (pick options) before the sweepstake deadline.
3. **Assign teams** — An admin triggers assignment; each player receives one team per round from their ranked list (snake-style allocation via `AssignTeamsService`).
4. **Score points** — `CalculatePointsService` awards points to assigned teams from finished matches and completed group tables, then rolls those up to each player’s total.
5. **Sync data** — Matches and standings are loaded from football-data.org (or from `mock-matches.json` in development seeds). An internal sync endpoint refreshes matches and recalculates points.

### Scoring rules

| Event | Points |
| --- | --- |
| Win | 3 (+ stage bonus below) |
| Draw | 1 per team |
| Group winner (after all 12 group games) | +5 |
| Group runner-up (after all 12 group games) | +1 |
| Semi-final win | +3 bonus |
| Third-place match win | +1 bonus |
| Final win | +5 bonus |

## Project structure

- `app/` — Rails models, controllers, services, serializers
- `frontend/` — React SPA
- `docker-compose.yml` — Postgres, backend, frontend
- `run` — helper script for Docker workflows
- `mock-matches.json` — optional local match fixture data for `db:seed` in development

## Quick start

### 1) Environment

Create a `.env` file in the project root (loaded by the backend container):

```bash
FOOTBALL_DATA_API_KEY=your_key_from_football-data.org
INTERNAL_API_TOKEN=your_secret_for_match_sync
ADMIN_PASSWORD=password_for_seeded_admin_user
```

`DEVISE_JWT_SECRET_KEY` is set in `docker-compose.yml` for local development only.

### 2) Start the stack

```bash
./run stack
```

Detached mode:

```bash
./run stack-detach
```

On first boot, the backend runs `db:prepare` automatically. Seed sample data (users, a sweepstake, and mock matches in development):

```bash
./run rails bundle exec rails db:seed
```

### 3) Open apps

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

### 4) Stop stack

```bash
./run stop
```

## Common commands

### Logs

```bash
./run logs
```

### Backend

Install gems:

```bash
./run bundle:install
```

Run a Rails command:

```bash
./run rails bundle exec rails db:migrate
```

Seed default pick rankings for users who have none:

```bash
./run rails bundle exec rails picks:seed_missing
```

Run backend tests:

```bash
./run rspec
```

### Frontend

```bash
./run npm install
./run npx vitest --watch
./run test
```

### Code quality

```bash
./run lint
./run lint:fix
```

## Syncing matches and points

POST to the internal sync endpoint (requires `INTERNAL_API_TOKEN` as `Authorization: Bearer <token>`):

```http
POST /api/v1/internal/matches/sync
```

This fetches the latest matches from football-data.org and runs `CalculatePointsService`.

## API overview

Public (JWT-authenticated unless noted):

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/v1/auth/sign_up` | Register |
| POST | `/api/v1/auth/sign_in` | Login |
| DELETE | `/api/v1/auth/sign_out` | Logout |
| GET | `/api/v1/auth/me` | Current user |
| GET | `/api/v1/sweepstakes` | List sweepstakes |
| PATCH | `/api/v1/sweepstakes/:id` | Update sweepstake (e.g. join) |
| POST | `/api/v1/sweepstakes/:id/assign_teams` | Assign teams (admin) |
| GET | `/api/v1/sweepstakes/:id/pick_options` | Teams for ranking |
| GET/PUT | `/api/v1/sweepstakes/:id/picks` | View / reorder picks |
| GET | `/api/v1/sweepstakes/:id/league` | League leaderboard |
| GET | `/api/v1/standings` | Group standings |
| GET | `/api/v1/matches` | Matches |

Internal:

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/v1/internal/matches/sync` | Sync matches and recalculate points |

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `FOOTBALL_DATA_API_KEY` | Yes (for live API) | football-data.org API token |
| `INTERNAL_API_TOKEN` | Yes (for sync) | Bearer token for internal endpoints |
| `ADMIN_PASSWORD` | For seeds | Password for the seeded admin user |
| `DEVISE_JWT_SECRET_KEY` | Production | JWT signing secret |
| `DATABASE_*` | Docker | Set in `docker-compose.yml` for local dev |
| `VITE_BACKEND_URL` | No | Frontend backend base URL; defaults to Vite `/api` proxy |
