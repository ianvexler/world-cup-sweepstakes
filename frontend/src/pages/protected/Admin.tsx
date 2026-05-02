import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import getSweepstakes from '../../api/requests/sweepstakes/getSweepstakes';
import { useEffect, useState } from 'react';
import { Sweepstake } from '../../../types';
import Loader from '../../components/ui/Loader';
import Button from '../../components/ui/Button';

function formatDateTime(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

const Admin = () => {
  const navigate = useNavigate();
  const { loading: authLoading, isAdmin } = useAuth();

  const [sweepstakes, setSweepstakes] = useState<Sweepstake[]>([]);
  const [sweepstakesLoading, setSweepstakesLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin || authLoading) return;

    setSweepstakesLoading(true);
    getSweepstakes()
      .then((data) => {
        setSweepstakes(data);
      })
      .finally(() => {
        setSweepstakesLoading(false);
      });
  }, [isAdmin, authLoading]);

  useEffect(() => {
    if (authLoading || isAdmin) return;
    toast.error('You are not authorized to access this page');
  }, [authLoading, isAdmin]);

  if (authLoading) {
    return <Loader className="h-screen w-screen" size={40} />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (sweepstakesLoading) {
    return <Loader className="h-screen w-screen" size={40} />;
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-stretch px-4 pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-6 sm:items-center sm:px-6 sm:pb-16 sm:pt-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 flex w-full justify-start sm:mb-4">
            <Button type="button" variant="secondary" size="md" onClick={() => navigate('/')}>
              Ranking
            </Button>
          </div>

          <header className="text-center sm:text-right">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Admin
            </h1>
            <p className="mt-1 text-sm text-muted">Sweepstakes overview</p>
          </header>
        </div>

        {sweepstakes.length === 0 ? (
          <div className="rounded-2xl border border-border bg-field/50 px-4 py-10 text-center text-sm text-muted shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
            No sweepstakes in the database.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {sweepstakes.map((s) => (
              <li
                key={s.id}
                className="overflow-hidden rounded-2xl border border-border bg-field/50 shadow-xl ring-1 ring-white/5 backdrop-blur-sm"
              >
                <div className="border-b border-border/80 px-4 py-3 sm:px-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-foreground">{s.name}</h2>
                  </div>
                </div>

                <dl className="grid gap-0 divide-y divide-border/60 sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                  <div className="px-4 py-3 sm:px-5">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">ID</dt>
                    <dd className="mt-1 font-mono text-sm text-foreground">{s.id}</dd>
                  </div>

                  <div className="px-4 py-3 sm:px-5">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Deadline</dt>
                    <dd className="mt-1 text-sm text-foreground">
                      {formatDateTime(s.deadline)}
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:px-5 sm:col-span-2">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Join code</dt>
                    <dd className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-mono text-sm text-foreground">{s.join_code}</span>
                    </dd>
                  </div>

                  <div className="px-4 py-3 sm:px-5">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Created</dt>
                    <dd className="mt-1 text-sm text-foreground">{formatDateTime(s.created_at)}</dd>
                  </div>

                  <div className="px-4 py-3 sm:px-5">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">Updated</dt>
                    <dd className="mt-1 text-sm text-foreground">{formatDateTime(s.updated_at)}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Admin;
