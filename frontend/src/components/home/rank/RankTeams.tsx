import { useState, useEffect } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { isAfter, startOfDay } from 'date-fns';
import { PickOption } from '../../../../types';
import getPickOptions from '../../../api/requests/sweepstakes/pickOptions/getPickOptions';
import PickOptionItem from './PickOptionItem';
import Loader from '../../ui/Loader';

interface RankTeamsProps {
  sweepstakeId: string;
  deadline: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const RankTeams = ({ sweepstakeId, deadline, loading, setLoading }: RankTeamsProps) => {
  const [pickOptions, setPickOptions] = useState<PickOption[]>([]);

  const isPastDeadline = isAfter(startOfDay(new Date()), startOfDay(new Date(deadline)));

  useEffect(() => {
    setLoading(true);

    getPickOptions(sweepstakeId)
      .then((data) => {
        setPickOptions(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sweepstakeId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-field/50 shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
        <div className="border-b border-border/80 px-3 py-2.5 sm:px-4">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted">
            Drag to reorder
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 py-2 [scrollbar-gutter:stable] sm:px-3 sm:py-3">
          <DragDropProvider
            onDragOver={(event) => {
              setPickOptions((items) => move(items, event));
            }}
          >
            <ul className="flex flex-col gap-2 pb-1">
              {pickOptions.map((pickOption, index) => (
                <PickOptionItem
                  key={pickOption.id}
                  pickOption={pickOption}
                  index={index}
                  isPastDeadline={isPastDeadline}
                />
              ))}
            </ul>
          </DragDropProvider>
        </div>
      </div>
    </div>
  );
};

export default RankTeams;
