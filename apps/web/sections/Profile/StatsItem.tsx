export function StatsItem({
  title,
  value,
  label,
  emoji,
}: {
  title: string;
  value: string;
  label: string;
  emoji: string;
}) {
  const roundedValue = Math.round(Number(value) / 50) * 50;

  const formattedValue =
    Number(value) >= 100
      ? Number(roundedValue) % 1000 === 0
        ? `${roundedValue / 1000}k`
        : `${(roundedValue / 1000).toFixed(1)}k`
      : Number(value);
  return (
    <div
      className={
        'flex flex-row items-center rounded-[0.521vw] bg-[#252525] p-[0.781vw] gap-[0.781vw]'
      }
    >
      <div className="flex flex-col items-center justify-center rounded-[0.26vw] p-[0.938vw] bg-[#353535]">
        <span className="text-[2.083vw] leading-[90%] mt-[0.26vw]">{emoji}</span>
      </div>
      <div className="flex flex-col gap-[0.26vw]">
        <span className="text-[1.042vw] text-foreground font-plexsans leading-[110%] font-medium">
          {title}
        </span>
        <div className="flex flex-row gap-[0.26vw]">
          <span className="text-[1.979vw] font-plexsans font-semibold leading-[110%] text-foreground">
            {formattedValue}
          </span>
          <span className="mt-auto mb-[0.26vw] text-[0.729vw] font-plexsans leading-[110%] text-foreground">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
