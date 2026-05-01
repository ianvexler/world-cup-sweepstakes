import icon from '../../assets/icon.png';
import getSweepstakes from '../../api/requests/sweepstakes/getSweepstakes';
import { useEffect, useState } from 'react';
import { Sweepstake } from '../../../types';
import RankTeams from '../../components/rank/RankTeams';
import Loader from '../../components/ui/Loader';

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
      <div className="mb-4 flex shrink-0 justify-center sm:mb-6">
        <a href="https://thecurve.io/" target="_blank" rel="noreferrer">
          <img src={icon} className="h-14 w-auto sm:h-20" alt="The Curve" />
        </a>
      </div>

      <div className="flex w-full min-h-0 max-w-xl flex-1 flex-col sm:min-h-[min(100dvh,900px)]">
        <RankTeams sweepstakeId={sweepstakes[0].id} />
      </div>
    </div>
  );
};

export default Home;
