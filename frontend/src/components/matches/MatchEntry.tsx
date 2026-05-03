import { format, isValid, parseISO } from 'date-fns';
import { Match } from '../../../types';

interface MatchEntryProps {
  match: Match;
  compact?: boolean;
}

const MatchEntry = ({ match, compact = false }: MatchEntryProps) => {
  const startDate = parseISO(match.start_time);
  const hasStarted = isValid(startDate) && startDate < new Date();
  const { fullTime, winner } = match.score;
  const hasScore = fullTime.home !== null && fullTime.away !== null;

  const shell = compact
    ? 'gap-2 rounded-xl px-3 py-2 shadow-md ring-1 ring-white/5'
    : 'gap-3 rounded-2xl px-4 py-3 shadow-xl ring-1 ring-white/5';
  const labelClass = compact ? 'text-xs' : 'text-sm';
  const crestClass = compact ? 'h-6 w-6' : 'h-8 w-8';
  const centerClass = compact ? 'min-w-14' : 'min-w-20';
  const scoreClass = compact ? 'text-sm' : 'text-base';

  return (
    <div
      className={`flex items-center justify-between border border-border bg-field/50 backdrop-blur-sm ${shell}`}
    >
      <div className="flex flex-1 items-center justify-end gap-2">
        {match.home_team.shortName ? (
          <span
            className={`${labelClass} font-medium text-foreground text-right leading-tight`}
          >
            {match.home_team.shortName}
          </span>
        ) : (
          <div className={`${labelClass} font-medium text-foreground leading-tight`}>TBD</div>
        )}

        {match.home_team.crest ? (
          <img
            src={match.home_team.crest}
            alt={match.home_team.name}
            className={`${crestClass} object-contain`}
          />
        ) : null}
      </div>

      <div className={`flex ${centerClass} flex-col items-center justify-center`}>
        {hasStarted && hasScore ? (
          <>
            <span className={`${scoreClass} font-semibold tabular-nums text-foreground`}>
              {fullTime.home} – {fullTime.away}
            </span>
            {winner && (
              <span className="text-[8px] font-medium uppercase tracking-wider text-muted">
                FT
              </span>
            )}
          </>
        ) : (
          <>
            <span
              className={`${compact ? 'text-xs' : 'text-sm'} font-semibold tabular-nums text-foreground`}
            >
              {isValid(startDate) ? format(startDate, 'HH:mm') : '–'}
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 items-center justify-start gap-2">
        {match.away_team.crest ? (
          <img
            src={match.away_team.crest}
            alt={match.away_team.name}
            className={`${crestClass} object-contain`}
          />
        ) : null}

        {match.away_team.shortName ? (
          <span className={`${labelClass} font-medium text-foreground leading-tight`}>
            {match.away_team.shortName}
          </span>
        ) : (
          <div className={`${labelClass} font-medium text-foreground leading-tight`}>TBD</div>
        )}
      </div>
    </div>
  );
};

export default MatchEntry;
