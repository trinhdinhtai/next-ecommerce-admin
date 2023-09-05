import LandingHero from "@/components/landing/landing-hero";
import LandingNavbar from "@/components/landing/landing-navbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;
