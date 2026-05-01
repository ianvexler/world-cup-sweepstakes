import { useEffect, useState } from 'react';
import getStandings from '../../api/requests/standings/getStandings';
import { Standing } from '../../../types';
import Loader from '../ui/Loader';
import GroupStanding from './GroupStanding';

interface StandingsProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const Standings = ({ loading, setLoading }: StandingsProps) => {
  const [standings, setStandings] = useState<Standing[]>([]);

  useEffect(() => {
    getStandings()
      .then((data) => {
        setStandings(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      {loading ? (
        <Loader />
      ) : standings.length === 0 ? (
        <p className="text-sm text-muted">No group standings available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {standings.map((standing) => (
            <GroupStanding key={standing.id} standing={standing} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Standings;
