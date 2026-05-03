import { useState, useEffect } from 'react';
import getLeague from '../../api/requests/league/getLeague';
import { LeagueUser } from '../../../types';
import LeagueUserPicksSummary from './LeagueUserPicksSummary';
import { useAuth } from '../../contexts/AuthContext';

interface SweepstakeStandingsProps {
  sweepstakeId: string;
}

const SweepstakeStandings = ({ sweepstakeId }: SweepstakeStandingsProps) => {
  const { currentUser } = useAuth();
  const [standings, setStandings] = useState<LeagueUser[]>([]);
  const [openTeamsUserId, setOpenTeamsUserId] = useState<string | null>(null);

  useEffect(() => {
    getLeague(sweepstakeId).then((data) => {
      const orderedUsers = data.users.sort((a: LeagueUser, b: LeagueUser) => b.points - a.points);
      setStandings(orderedUsers);
    });
  }, [sweepstakeId]);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-field/50 shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
      <header className="border-b border-border/80 px-4 py-3 sm:px-5">
        <div className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted">
          <span className="text-center">#</span>
          <span>Player</span>
          <span>Pts</span>
        </div>
      </header>

      <ul className="divide-y divide-border/60">
        {standings.map((user, index) => {
          const position = index + 1;
          const isLeader = position === 1;
          const positionStyle = isLeader ? 'text-yellow-400' : 'text-muted';

          const isUser = currentUser && user.id === currentUser.id;

          return (
            <li
              key={user.id}
              className={`grid grid-cols-[2rem_1fr_auto] items-start gap-3 px-4 py-3 sm:px-5 ${isUser ? 'bg-white/3' : ''}`}
            >
              <span
                className={`pt-0.5 text-center text-sm font-semibold tabular-nums ${positionStyle}`}
              >
                {position}
              </span>
              <div className="min-w-0 flex flex-col gap-1">
                <span className="block truncate text-sm font-medium text-foreground mb-0">{user.name}</span>

                <LeagueUserPicksSummary
                  picks={user.picks}
                  expanded={openTeamsUserId === user.id}
                  onToggle={() =>
                    setOpenTeamsUserId((id) => (id === user.id ? null : user.id))
                  }
                />
              </div>

              <span className="pt-0.5 text-sm font-semibold tabular-nums text-foreground">
                {user.points}
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default SweepstakeStandings;
