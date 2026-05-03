import type { LeagueUserPick } from '../../../types';

interface LeagueUserPicksSummaryProps {
  picks: LeagueUserPick[];
  expanded: boolean;
  onToggle: () => void;
}

const LeagueUserPicksSummary = ({ picks, expanded, onToggle }: LeagueUserPicksSummaryProps) => {
  if (picks.length === 0) {
    return <span className="text-[10px] text-muted">No teams assigned</span>;
  }

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-center gap-2">
        <div className="flex min-w-0 flex-1 items-center -space-x-2 pt-0.5">
          {picks.map((pick, index) => (
            <span
              key={`${pick.team}-${index}`}
              title={pick.team}
              className="relative inline-flex size-7 shrink-0 rounded-full border-2 border-field/90 bg-field/90 ring-1 ring-border/40"
              style={{ zIndex: picks.length - index }}
            >
              {pick.crest ? (
                <img
                  src={pick.crest}
                  alt=""
                  className="size-full rounded-full object-contain p-0.5"
                />
              ) : (
                <span className="size-full rounded-full bg-border/50" />
              )}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-muted underline-offset-2 hover:text-foreground hover:underline"
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide team list' : 'Show full team list'}
        >
          {expanded ? 'Hide' : `${picks.length} teams`}
        </button>
      </div>
      {expanded ? (
        <ul className="mt-2 max-h-48 space-y-1.5 overflow-y-auto rounded-lg border border-border/60 bg-black/25 px-2.5 py-2">
          {picks.map((pick, index) => (
            <li key={`${pick.team}-detail-${index}`} className="flex items-center gap-2">
              {pick.crest ? (
                <img src={pick.crest} alt="" className="size-5 shrink-0 object-contain" />
              ) : (
                <span className="size-5 shrink-0 rounded-sm bg-border/40" />
              )}
              <span className="text-xs leading-snug text-foreground">{pick.team}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default LeagueUserPicksSummary;
