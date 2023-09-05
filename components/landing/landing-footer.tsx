import { ThemeToggle } from "@/components/theme-toggle";

const LandingFooter = () => {
  return (
    <footer className="p-4 bg-background border-t">
      <div className="mx-auto max-w-screen-xl h-full w-full flex items-center justify-between">
        <div className="text-center text-sm leading-loose md:text-left">
          Build by{" "}
          <a
            href="https://github.com/trinhdinhtai"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            @taitd
          </a>
          . Hosted on{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel.
          </a>
        </div>

        <ThemeToggle />
      </div>
    </footer>
  );
};

export default LandingFooter;
