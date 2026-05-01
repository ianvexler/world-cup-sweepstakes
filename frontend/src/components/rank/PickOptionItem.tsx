import { useSortable } from '@dnd-kit/react/sortable';
import { PickOption } from '../../../types';

interface PickOptionProps {
  pickOption: PickOption;
  index: number;
}

const PickOptionItem = ({ pickOption, index }: PickOptionProps) => {
  const { ref, isDragging } = useSortable({
    id: pickOption.id,
    index,
  });

  const position = index + 1;

  return (
    <li
      ref={ref}
      className={`list-none ${isDragging ? 'z-10' : ''}`}
    >
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200/90 bg-white px-2 py-2 shadow-sm cursor-grab touch-manipulation active:cursor-grabbing sm:gap-2.5 sm:px-3 sm:py-2.5 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="grid shrink-0 grid-cols-2 gap-0.5 text-neutral-400 dark:text-neutral-500" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="size-1 rounded-full bg-current" />
          ))}
        </span>

        <span className="w-7 shrink-0 text-right text-xs font-semibold tabular-nums text-neutral-500 dark:text-neutral-400 sm:w-8">
          {position}
        </span>

        <img src={pickOption.crest} alt={pickOption.name} className="size-4" />

        <p className="min-w-0 flex-1 text-left text-xs font-medium leading-snug text-neutral-900 sm:text-sm dark:text-neutral-100">
          {pickOption.name}
        </p>
      </div>
    </li>
  );
};

export default PickOptionItem;