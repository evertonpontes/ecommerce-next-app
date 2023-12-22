import { cn } from "@/lib/utils";

type SizeOptions = "sm" | "md" | "lg";

interface SpinnerCircleProps {
  size?: SizeOptions;
  classColor?: string;
}

export const SpinnerCircle = ({ classColor, size }: SpinnerCircleProps) => {
  const sizeNumber = (() => {
    switch (size) {
      case "sm":
        return 4;
      case "lg":
        return 16;
      default:
        return 8;
    }
  })();

  return (
    <div
      className={cn(
        "w-8 h-8 border-4 rounded-full animate-spin",
        `border-${
          classColor || "primary"
        } border-t-transparent`, `w-${sizeNumber} h-${sizeNumber}`
      )}
    />
  );
};
