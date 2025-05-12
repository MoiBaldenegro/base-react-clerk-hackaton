import { Button } from "@fluentui/react-components";
import { LandingCarousel } from "../components/ui/LandingCarousel";
import { PricingTable, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { HOME_DASHBOARD_PATH } from "../helpers/paths";
import { People } from "../components/ui/people";

const Landing = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  return (
    <div className="landingContainer">
      <LandingCarousel  />
      <main>
  
      <SignedIn>
         <section >
          <h2>Bienvenido</h2>
        <div>
          <People name={user?.fullName} />
          <Button appearance="primary" onClick={()=> navigate("/home/dashboard")} >Continuar al home</Button>
        </div>        
      </section>
      </SignedIn>
      </main>
      {/* <footer>

        </footer> */}
    </div>
  );
}

export default Landing;