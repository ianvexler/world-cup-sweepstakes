import { useState, useEffect, useRef } from 'react';
import { DragDropProvider, type DragEndEvent, type DragOverEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { isAfter, startOfDay } from 'date-fns';
import type { UserPick } from '../../../../types';
import getPicks from '../../../api/requests/sweepstakes/picks/getPicks';
import PickOptionItem from './PickOptionItem';
import Loader from '../../ui/Loader';
import syncPickOrder from '../../../api/requests/sweepstakes/picks/syncPickOrder';

interface RankTeamsProps {
  sweepstakeId: string;
  deadline: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const RankTeams = ({ sweepstakeId, deadline, loading, setLoading }: RankTeamsProps) => {
  const [pickOptions, setPickOptions] = useState<UserPick[]>([]);
  const pickOptionsRef = useRef<UserPick[]>([]);
  pickOptionsRef.current = pickOptions;

  const isPastDeadline = isAfter(startOfDay(new Date()), startOfDay(new Date(deadline)));

  useEffect(() => {
    setLoading(true);

    getPicks(sweepstakeId)
      .then((data) => {
        setPickOptions(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sweepstakeId]);

  const handleDragOver = (event: DragOverEvent) => {
    setPickOptions((items) => move(items, event));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.canceled || isPastDeadline) {
      return;
    }

    setTimeout(() => {
      const ids = pickOptionsRef.current.map((pick) => pick.pick_option.id);
      void syncPickOrder(sweepstakeId, ids).catch((error) => {
        console.error(error);
      });
    }, 0);
  };

  if (loading) {
    return <div />;
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
          <DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            <ul className="flex flex-col gap-2 pb-1">
              {pickOptions.map((pick, index) => (
                <PickOptionItem
                  key={pick.id}
                  sortableId={pick.id}
                  pickOption={pick.pick_option}
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
