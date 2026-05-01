import { Standing } from '../../../types';

interface GroupStandingProps {
  standing: Standing;
}

const GroupStanding = ({ standing }: GroupStandingProps) => {
  return (
    <article className="rounded-xl border border-border bg-field/40 p-3 shadow-sm sm:p-4">
      <header className="mb-3 border-b border-border/70 pb-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          {standing.group}
        </h2>
      </header>

      <div className="space-y-1.5">
        {standing.table.map((team) => (
          <div
            key={`${standing.id}-${team.position}-${team.team.name}`}
            className="grid grid-cols-[2rem_1.25rem_1fr] items-center gap-2 rounded-md bg-black/10 px-2 py-1.5"
          >
            <span className="text-center text-xs font-semibold tabular-nums text-muted">
              {team.position}
            </span>
            <img src={team.team.crest} alt={team.team.name} className="size-4 rounded-full object-cover" />
            <p className="truncate text-sm text-foreground">{team.team.name}</p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default GroupStanding;