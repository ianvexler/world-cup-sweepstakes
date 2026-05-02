import { format, isValid, parseISO } from 'date-fns';
import { Match } from "../../../types";

interface MatchEntryProps {
  match: Match;
}

const MatchEntry = ({ match }: MatchEntryProps) => {
  const startDate = parseISO(match.start_time);
  const hasStarted = isValid(startDate) && startDate < new Date();
  const { fullTime, winner } = match.score;
  const hasScore = fullTime.home !== null && fullTime.away !== null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-field/50 px-4 py-3 shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
      <div className="flex flex-1 items-center justify-end gap-2">
        <span className="text-sm font-medium text-foreground text-right leading-tight">
          {match.home_team.shortName}
        </span>
        <img
          src={match.home_team.crest}
          alt={match.home_team.name}
          className="h-8 w-8 object-contain"
        />
      </div>

      <div className="flex min-w-20 flex-col items-center justify-center gap-0.5">
        {hasStarted && hasScore ? (
          <>
            <span className="text-base font-semibold tabular-nums text-foreground">
              {fullTime.home} – {fullTime.away}
            </span>
            {winner && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                FT
              </span>
            )}
          </>
        ) : (
          <>
            <span className="text-sm font-semibold text-foreground tabular-nums">
              {isValid(startDate) ? format(startDate, 'HH:mm') : '–'}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 items-center justify-start gap-2">
        <img
          src={match.away_team.crest}
          alt={match.away_team.name}
          className="h-8 w-8 object-contain"
        />
        <span className="text-sm font-medium text-foreground leading-tight">
          {match.away_team.shortName}
        </span>
      </div>
    </div>
  );
};

export default MatchEntry;