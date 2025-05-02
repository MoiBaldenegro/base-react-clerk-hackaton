import { Button } from "@fluentui/react-components";
import { LandingCarousel } from "../components/ui/LandingCarousel";
export default function Landing() {
  return (
    <div >
      
      <LandingCarousel  />
      <Button appearance="primary" onClick={() => alert("Hello World")}>Fluent UI</Button>

    </div>
  );
}