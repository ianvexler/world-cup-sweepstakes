import icon from '../../assets/icon.png';
import getSweepstakes from '../../api/requests/sweepstakes/getSweepstakes';
import { useEffect, useState } from 'react';
import { Sweepstake } from '../../../types';
import RankTeams from '../../components/home/rank/RankTeams';
import Loader from '../../components/ui/Loader';
import Standings from '../../components/home/Standings';

const Home = () => {
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);

  useEffect(() => {
    getSweepstakes().then((data) => {
      setSweepstakes(data);
    });
  }, []);

  if (sweepstakes.length === 0) {
    return <Loader />;
  }

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

        <p className="text-sm text-muted">
          Deadline: {new Date(sweepstakes[0].deadline).toLocaleDateString()}
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1000px] flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex min-h-0 w-full min-w-0 flex-col lg:max-w-85 lg:flex-none lg:shrink-0">
          <RankTeams sweepstakeId={sweepstakes[0].id} deadline={sweepstakes[0].deadline} />
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
          <Standings />
        </div>
      </div>
    </div>
  );
};

export default Home;
