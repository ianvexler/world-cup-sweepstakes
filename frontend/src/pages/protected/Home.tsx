import getSweepstakes from '../../api/requests/sweepstakes/getSweepstakes';
import { useEffect, useState } from 'react';
import { Sweepstake } from '../../../types';
import RankTeams from '../../components/home/rank/RankTeams';
import Loader from '../../components/ui/Loader';
import Standings from '../../components/home/Standings';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/ui/Layout';

const Home = () => {
  const navigate = useNavigate();
  
  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [sweepstakesLoading, setSweepstakesLoading] = useState(true);
  const [rankTeamsLoading, setRankTeamsLoading] = useState(true);
  const [standingsLoading, setStandingsLoading] = useState(true);

  useEffect(() => {
    setSweepstakesLoading(true);
    getSweepstakes()
      .then((data) => {
        if (data[0].status !== 'draft') {
          navigate('/league');
        }

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

  if (sweepstakesLoading) {
    return <Loader size={50} />;
  }

  return (
    <Layout title="Rank the teams">
      {sweepstake && (
        <p className="text-sm text-muted">
          Deadline: {new Date(sweepstake.deadline).toLocaleDateString()}
        </p>
      )}

      {isLoading && <Loader size={50} />}

      <div 
        className={classNames(
          "mx-auto flex w-full max-w-[1000px] flex-1 flex-col gap-6 lg:flex-row lg:items-start lg:gap-8", 
          isLoading ? 'opacity-0' : ''
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
    </Layout>
  );
};

export default Home;
