"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../../lib/helpers";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-[3.765vw] lg:!h-[0.833vw] w-full overflow-hidden rounded-full",
      props.color === "left-accent"
        ? "bg-left-accent/50"
        : props.color === "middle-accent"
          ? "bg-middle-accent/50"
          : "bg-right-accent/50",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all ",
        props.color === "left-accent"
          ? "bg-left-accent"
          : props.color === "middle-accent"
            ? "bg-middle-accent"
            : "bg-right-accent",
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
