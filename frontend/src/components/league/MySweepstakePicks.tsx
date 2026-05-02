import { useEffect, useState } from "react";
import getSweepstakePicks from "../../api/requests/sweepstakes/getSweepstakePicks";
import { SweepstakePickAssigned } from "../../../types";

interface MySweepstakePicksProps {
  sweepstakeId: string;
}

const MySweepstakePicks = ({ sweepstakeId }: MySweepstakePicksProps) => {
  const [picks, setPicks] = useState<SweepstakePickAssigned[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sweepstakeId) return;

    getSweepstakePicks(sweepstakeId)
      .then(setPicks)
      .catch(() => setError("Could not load your teams."));
  }, [sweepstakeId]);

  if (error) {
    return (
      <p className="text-sm text-muted">{error}</p>
    );
  }

  if (picks.length === 0) {
    return (
      <p className="text-sm text-muted">No teams assigned yet.</p>
    );
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-field/50 shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
      <header className="border-b border-border/80 px-4 py-3 sm:px-5">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted">Your teams</h2>
      </header>
      <ul className="divide-y divide-border/60">
        {picks.map((row) => (
          <li
            key={row.id}
            className="flex items-center gap-3 px-4 py-3 sm:px-5"
          >
            {row.pick_option.crest ? (
              <img
                src={row.pick_option.crest}
                alt=""
                className="h-8 w-8 shrink-0 object-contain"
              />
            ) : (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-muted">
                ?
              </span>
            )}
            <span className="truncate text-sm font-medium text-foreground">
              {row.pick_option.name}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MySweepstakePicks;
