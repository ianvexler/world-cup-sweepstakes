import { parseISO, isValid } from 'date-fns';
import type { Match } from '../../../../types';
import MatchEntry from '../../matches/MatchEntry';
import KnockoutBracketPair from './KnockoutBracketPair';
import KnockoutRoundHeading from './KnockoutRoundHeading';

interface KnockoutBracketProps {
  matches: Match[];
}

const STAGE_ORDER = [
  'LAST_64',
  'LAST_32',
  'LAST_16',
  'QUARTER_FINALS',
  'SEMI_FINALS',
  'THIRD_PLACE',
  'FINAL',
] as const;

const STAGE_LABELS: Record<string, string> = {
  LAST_64: 'Round of 64',
  LAST_32: 'Round of 32',
  LAST_16: 'Round of 16',
  QUARTER_FINALS: 'Quarter-finals',
  SEMI_FINALS: 'Semi-finals',
  THIRD_PLACE: 'Third place',
  FINAL: 'Final',
};

const KnockoutBracket = ({ matches }: KnockoutBracketProps) => {
  const knockout = matches.filter((m) => m.stage !== 'GROUP_STAGE');
  const byStage = knockout.reduce<Record<string, Match[]>>((acc, m) => {
    if (!acc[m.stage]) acc[m.stage] = [];
    acc[m.stage].push(m);
    return acc;
  }, {});

  const sortMatches = (a: Match, b: Match): number => {
    const da = parseISO(a.start_time);
    const db = parseISO(b.start_time);

    if (isValid(da) && isValid(db)) {
      const diff = da.getTime() - db.getTime();
      if (diff !== 0) return diff;
    }
    return Number(a.id) - Number(b.id);
  };
  
  const chunkPairs = (matches: Match[]): [Match, Match | undefined][] => {
    const pairs: [Match, Match | undefined][] = [];
    for (let i = 0; i < matches.length; i += 2) {
      pairs.push([matches[i], matches[i + 1]]);
    }
    return pairs;
  };
  
  const stageLabel = (stage: string): string => {
    return STAGE_LABELS[stage] ?? stage.replace(/_/g, ' ');
  };
  
  const orderedStageKeys = (present: Set<string>): string[] => [
    ...STAGE_ORDER.filter((s) => present.has(s)),
    ...[...present]
      .filter((s) => !(STAGE_ORDER as readonly string[]).includes(s))
      .sort(),
  ];
  

  Object.keys(byStage).forEach((stage) => {
    byStage[stage].sort(sortMatches);
  });

  const present = new Set(Object.keys(byStage));
  const orderedStages = orderedStageKeys(present);

  if (orderedStages.length === 0) {
    return (
      <p className="text-sm text-muted">
        No knockout fixtures yet. Matches appear after the group stage.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-5 pb-4">
      {orderedStages.map((stage, stageIndex) => {
        const roundMatches = byStage[stage];
        const singleCentered =
          roundMatches.length === 1 && (stage === 'FINAL' || stage === 'THIRD_PLACE');

        return (
          <section key={stage} className="flex w-full max-w-3xl flex-col items-center gap-8">
            <KnockoutRoundHeading
              title={stageLabel(stage)}
              showInboundStem={stageIndex > 0}
            />

            {singleCentered ? (
              <div className="mx-auto w-full max-w-xl px-1">
                <MatchEntry match={roundMatches[0]} compact />
              </div>
            ) : (
              <div className="flex w-full flex-col items-center gap-2">
                {chunkPairs(roundMatches).map(([first, second]) => (
                  <KnockoutBracketPair
                    key={`${stage}-${first.id}-${second?.id ?? 'bye'}`}
                    first={first}
                    second={second}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default KnockoutBracket;
