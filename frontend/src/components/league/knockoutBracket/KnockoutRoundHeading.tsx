interface KnockoutRoundHeadingProps {
  title: string;
  showInboundStem: boolean;
}

const KnockoutRoundHeading = ({ title, showInboundStem }: KnockoutRoundHeadingProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      {showInboundStem ? (
        <div className="flex flex-col items-center gap-2 text-border/60" aria-hidden>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted">
            Next round
          </span>
        </div>
      ) : null}
      <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted">
        {title}
      </h2>
      <div className="h-px w-16 bg-border/80" aria-hidden />
    </div>
  );
};

export default KnockoutRoundHeading;
