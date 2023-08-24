import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function CategoryAddIcon(props: React.ComponentProps<"svg">) {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={theme === "dark" ? "#000" : "#fff"}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...props}
      className={cn("h-4 w-4 fill-white dark:fill-black", props.className)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 17h6m-3 -3v6" />
    </svg>
  );
}
