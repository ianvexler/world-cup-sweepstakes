import { useState, useEffect } from 'react';
import { type DragEndEvent, DragDropProvider } from '@dnd-kit/react';
import { arrayMove, move } from '@dnd-kit/helpers';
import { isSortableOperation } from '@dnd-kit/react/sortable';
import { PickOption } from '../../../types';
import getPickOptions from '../../api/requests/sweepstakes/pickOptions/getPickOptions';
import PickOptionItem from './PickOptionItem';
import Loader from '../ui/Loader';

interface RankTeamsProps {
  sweepstakeId: string;
}

const RankTeams = ({ sweepstakeId }: RankTeamsProps) => {
  const [pickOptions, setPickOptions] = useState<PickOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getPickOptions(sweepstakeId).then((data) => {
      setPickOptions(data);
    }).finally(() => {
      setLoading(false);
    });
  }, [sweepstakeId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex w-full min-h-0 flex-1 flex-col">
      <header className="mb-4 shrink-0 text-center sm:mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Rank the teams
        </h1>
      </header>

      <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-field/50 shadow-xl ring-1 ring-white/5 backdrop-blur-sm">
        <div className="border-b border-border/80 px-3 py-2.5 sm:px-4">
          <p className="text-center text-xs font-medium uppercase tracking-wide text-muted">
            Drag to reorder
          </p>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-2 py-2 [scrollbar-gutter:stable] sm:px-3 sm:py-3"
        >
          <DragDropProvider       
            onDragOver={(event) => {
              setPickOptions((items) => move(items, event));
            }}
          >
            <ul className="flex flex-col gap-2 pb-1">
              {pickOptions.map((pickOption, index) => (
                <PickOptionItem key={pickOption.id} pickOption={pickOption} index={index} />
              ))}
            </ul>
          </DragDropProvider>
        </div>
      </div>
    </div>
  );
}

export default RankTeams;