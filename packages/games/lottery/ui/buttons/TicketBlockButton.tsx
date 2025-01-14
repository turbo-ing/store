import { MouseEventHandler, ReactNode } from "react";

export function TicketBlockButton({
  children,
  onClick = undefined,
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      className="flex h-[5.581vw] lg:!h-[1.6vw] cursor-pointer items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] bg-bg-dark p-[1.163vw] lg:!p-[0.33vw] hover:opacity-80"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
