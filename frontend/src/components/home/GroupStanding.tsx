import { Standing } from '../../../types';

interface GroupStandingProps {
  standing: Standing;
  showResults?: boolean;
}

const dash = (n: number | null | undefined) =>
  n === null || n === undefined || Number.isNaN(n) ? '–' : String(n);

const GroupStanding = ({ standing, showResults = false }: GroupStandingProps) => {
  const rowClass = showResults
    ? 'grid grid-cols-[2rem_1.25rem_minmax(0,1fr)_2.75rem] items-center gap-2 rounded-md bg-black/10 px-2 py-1.5'
    : 'grid grid-cols-[2rem_1.25rem_1fr] items-center gap-2 rounded-md bg-black/10 px-2 py-1.5';

  return (
    <article className="rounded-xl border border-border bg-field/40 p-3 shadow-sm sm:p-4">
      <header className="mb-3 border-b border-border/70 pb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          {standing.group}
        </h2>

        <span className="text-end">Pts</span>
      </header>

      {showResults && (
        <div
          className="mb-2 grid grid-cols-[2rem_1.25rem_minmax(0,1fr)_2.75rem] gap-2 px-2 text-[10px] font-medium uppercase tracking-wide text-muted"
          aria-hidden
        >
          <span className="col-span-3" />
        </div>
      )}

      <div className="space-y-1.5">
        {standing.table.map((team) => (
          <div
            key={`${standing.id}-${team.position}-${team.team.name}`}
            className={rowClass}
          >
            <span className="text-center text-xs font-semibold tabular-nums text-muted">
              {team.position}
            </span>
            <img
              src={team.team.crest}
              alt={team.team.name}
              className="size-4 rounded-full object-cover"
            />
            <p className="min-w-0 truncate text-sm text-foreground">{team.team.name}</p>
            {showResults && (
              <span className="text-end text-sm font-semibold tabular-nums text-foreground">
                {dash(team.points)}
              </span>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};

export default GroupStanding;
