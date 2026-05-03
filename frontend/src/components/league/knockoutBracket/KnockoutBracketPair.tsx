import type { Match } from '../../../../types';
import MatchEntry from '../../matches/MatchEntry';

interface KnockoutBracketPairProps {
  first: Match;
  second?: Match;
}

const PairStemDesktop = () => {
  return (
    <div className="pointer-events-none hidden h-9 w-full max-w-xl justify-self-center text-border/90 sm:flex">
      <svg viewBox="0 0 100 36" className="h-9 w-full" preserveAspectRatio="none" aria-hidden>
        <path
          d="M 25 0 L 25 12 L 50 12 L 50 36 M 75 0 L 75 12 L 50 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

const PairStemMobile = ({ show }: { show: boolean }) => {
  if (!show) return null;
  return (
    <div className="flex justify-center py-1 sm:hidden" aria-hidden>
      <div className="h-5 w-px bg-border/90" />
    </div>
  );
};

const KnockoutBracketPair = ({ first, second }: KnockoutBracketPairProps) => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
      <div className="flex w-full flex-col gap-0 sm:flex-row sm:items-stretch sm:gap-3">
        <div className="min-w-0 flex-1">
          <MatchEntry match={first} compact />
        </div>

        <PairStemMobile show={Boolean(second)} />

        {second ? (
          <div className="min-w-0 flex-1">
            <MatchEntry match={second} compact />
          </div>
        ) : (
          <div className="flex min-h-13 flex-1 items-center justify-center rounded-xl border border-dashed border-border/60 bg-field/25 px-3 text-center text-xs text-muted">
            TBD
          </div>
        )}
      </div>
      <PairStemDesktop />
    </div>
  );
};

export default KnockoutBracketPair;
