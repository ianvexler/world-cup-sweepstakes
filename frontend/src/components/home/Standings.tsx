import { useEffect, useState } from 'react';
import getStandings from '../../api/requests/standings/getStandings';
import { Standing } from '../../../types';
import Loader from '../ui/Loader';
import GroupStanding from './GroupStanding';

interface StandingsProps {
  onLoadingChange?: (loading: boolean) => void;
  showResults?: boolean;
}

const Standings = ({ onLoadingChange, showResults = false }: StandingsProps) => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStandings()
      .then((data) => {
        setStandings(data);
      })
      .finally(() => {
        setLoading(false);
        onLoadingChange?.(false);
      });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      {loading ? (
        <Loader size={32} />
      ) : standings.length === 0 ? (
        <p className="text-sm text-muted">No group standings available yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {standings.map((standing) => (
            <GroupStanding key={standing.id} standing={standing} showResults={showResults} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Standings;
