import { HeroSection } from '../components/explore/HeroSection';
import { StrategyComparison } from '../components/explore/StrategyComparison';
import { ProtocolBreakdown } from '../components/explore/ProtocolBreakdown';
import { FeeDisclosure } from '../components/explore/FeeDisclosure';
import { RiskWarnings } from '../components/explore/RiskWarnings';
import { HowItWorks } from '../components/explore/HowItWorks';

export default function ExploreMode() {
  return (
    <div className="container mx-auto px-6 py-12">
      <HeroSection />
      <StrategyComparison />
      <ProtocolBreakdown />
      <FeeDisclosure />
      <RiskWarnings />
      <HowItWorks />
    </div>
  );
}
