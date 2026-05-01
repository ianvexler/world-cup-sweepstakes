import icon from '../../assets/icon.png';
import getSweepstakes from '../../api/requests/sweepstakes/getSweepstakes';
import { useEffect, useState } from 'react';
import { Sweepstake } from '../../../types';
import RankTeams from '../../components/home/rank/RankTeams';
import Loader from '../../components/ui/Loader';
import Standings from '../../components/home/Standings';
import classNames from 'classnames';

const Home = () => {
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [sweepstakesLoading, setSweepstakesLoading] = useState(true);
  const [rankTeamsLoading, setRankTeamsLoading] = useState(true);
  const [standingsLoading, setStandingsLoading] = useState(true);

  useEffect(() => {
    setSweepstakesLoading(true);
    getSweepstakes()
      .then((data) => {
        setSweepstakes(data);
      })
      .finally(() => {
        setSweepstakesLoading(false);
      });
  }, []);

  const sweepstake = sweepstakes[0];
  const isLoading =
    sweepstakesLoading ||
    (!!sweepstake && (rankTeamsLoading || standingsLoading));

  return (
    <div className="flex min-h-dvh w-full flex-col items-stretch px-4 pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-6 sm:items-center sm:px-6 sm:pb-16 sm:pt-8">
      <div className="mb-4 flex shrink-0 justify-center sm:mb-4">
        <a href="https://thecurve.io/" target="_blank" rel="noreferrer">
          <img src={icon} className="h-14 w-auto sm:h-20" alt="The Curve" />
        </a>
      </div>

      <header className="mb-4 shrink-0 text-center sm:mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Rank the teams
        </h1>

        {sweepstake && (
          <p className="text-sm text-muted">
            Deadline: {new Date(sweepstake.deadline).toLocaleDateString()}
          </p>
        )}
      </header>

      {isLoading && <Loader size={50} />}

      <div 
        className={classNames(
          "mx-auto flex w-full max-w-[1000px] flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8", 
          isLoading ? 'opacity-50' : ''
        )}
      >
        {sweepstake && (
          <>
            <div className="flex min-h-0 w-full min-w-0 flex-col lg:max-w-85 lg:flex-none lg:shrink-0">
              <RankTeams
                sweepstakeId={sweepstake.id}
                deadline={sweepstake.deadline}
                loading={rankTeamsLoading}
                setLoading={setRankTeamsLoading}
              />
            </div>

            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
              <Standings loading={standingsLoading} setLoading={setStandingsLoading} />
            </div>
          </>
        )}

        {!sweepstakesLoading && !sweepstake && (
          <p className="col-span-full text-center text-sm text-muted">
            No sweepstake available yet.
          </p>
        )}
      </div>

    </div>
  );
};

export default Home;
