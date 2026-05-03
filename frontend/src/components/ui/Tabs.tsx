import classNames from 'classnames';

type TabsProps<T extends string> = {
  tabs: T[];
  activeTab: T;
  onChange: (tab: T) => void;
  className?: string;
};

const Tabs = <T extends string>({ tabs, activeTab, onChange, className = '' }: TabsProps<T>) => {
  return (
    <div
      role="tablist"
      className={classNames(
        'flex gap-1 rounded-lg border border-border bg-field/50 p-1',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab)}
            className={classNames(
              'flex-1 rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background',
              isActive ? 'bg-card text-black shadow-sm' : 'text-white hover:text-foreground'
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
