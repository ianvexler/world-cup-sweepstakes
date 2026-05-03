import { useCallback, useEffect, useRef, useState } from 'react';
import Standings from '../../components/home/Standings';
import Layout from '../../components/ui/Layout';
import Tabs from '../../components/ui/Tabs';
import { Match } from '../../../types';
import getMatches from '../../api/requests/matches/getMatches';
import Loader from '../../components/ui/Loader';
import MatchEntry from '../../components/matches/MatchEntry';
import SweepstakeStandings from '../../components/league/SweepstakeStandings';
import MySweepstakePicks from '../../components/league/MySweepstakePicks';
import KnockoutBracket from '../../components/league/knockoutBracket/KnockoutBracket';
import { useParams } from 'react-router-dom';
import { format, parseISO, startOfDay } from 'date-fns';

const tabs = ['League', 'Knockout', 'Matches'] as const;
type LeagueTab = (typeof tabs)[number];

const League = () => {
  const { sweepstakeId } = useParams();

  const [matches, setMatches] = useState<Match[]>([]);
  const [activeTab, setActiveTab] = useState<LeagueTab>('League');

  const [matchesLoading, setMatchesLoading] = useState(true);
  const [standingsLoading, setStandingsLoading] = useState(true);
  const isLoading = matchesLoading || standingsLoading;

  useEffect(() => {
    getMatches()
      .then((data) => {
        setMatches(data);
      })
      .finally(() => {
        setMatchesLoading(false);
      });
  }, []);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLDivElement>(null);

  const groupedMatches = useCallback(() => {
    const grouped: Record<string, Match[]> = {};
    matches.forEach((match) => {
      const day = format(parseISO(match.start_time), 'yyyy-MM-dd');
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(match);
    });
    return grouped;
  }, [matches]);

  const nearestFutureDay = useCallback(() => {
    const today = startOfDay(new Date());
    const days = Object.keys(groupedMatches()).sort();
    return days.find((d) => new Date(d) >= today) ?? days[days.length - 1];
  }, [groupedMatches]);

  useEffect(() => {
    if (activeTab !== 'Matches' || matchesLoading) return;

    const days = Object.keys(groupedMatches()).sort();
    const nearest = nearestFutureDay();
    const isAlreadyFirst = days[0] === nearest;

    if (!isAlreadyFirst && todayRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: todayRef.current.offsetTop - 8,
        behavior: 'smooth',
      });
    }
  }, [activeTab, matchesLoading]);

  return (
    <Layout>
      {isLoading && <Loader size={40} />}

      <div
        className={`mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-start ${isLoading ? 'invisible pointer-events-none' : ''}`}
      >
        <div className="flex w-full flex-col items-stretch gap-4 sm:flex-row sm:items-start sm:justify-center lg:flex-col lg:items-stretch lg:justify-start lg:w-72 lg:shrink-0">
          <SweepstakeStandings sweepstakeId={sweepstakeId || ''} />
          <MySweepstakePicks sweepstakeId={sweepstakeId || ''} />
        </div>

        <div className="hidden flex-1 flex-col gap-4 md:flex">
          <Tabs tabs={[...tabs]} activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === 'League' && (
            <Standings onLoadingChange={setStandingsLoading} showResults={true} />
          )}

          {activeTab === 'Knockout' && (
            <div className="max-h-[calc(124vh)] overflow-y-auto">
              <KnockoutBracket matches={matches} />
            </div>
          )}

          {activeTab === 'Matches' &&
            (matches.length === 0 ? (
              <p className="text-sm text-muted">No matches found.</p>
            ) : (
              <div
                ref={scrollContainerRef}
                className="flex max-h-[calc(124vh)] flex-col gap-4 overflow-y-auto pr-1"
              >
                {Object.entries(groupedMatches()).map(([day, dayMatches]) => {
                  const isNearest = day === nearestFutureDay();
                  return (
                    <div key={day} ref={isNearest ? todayRef : null}>
                      <h2 className="mb-2 text-sm font-medium text-muted">
                        {format(new Date(day), 'EEEE, MMMM d')}
                      </h2>
                      <div className="flex flex-col gap-2">
                        {dayMatches.map((match) => (
                          <MatchEntry key={match.id} match={match} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default League;
