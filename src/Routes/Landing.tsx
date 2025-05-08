import { Button } from "@fluentui/react-components";
import { LandingCarousel } from "../components/ui/LandingCarousel";
import { PricingTable, SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { HOME_DASHBOARD_PATH } from "../helpers/paths";

const Landing = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    // Handle loading state
    return null;
  }

  return (
    <div className="landingContainer">
        <header>
        <SignedOut>
          <SignInButton />       
        </SignedOut>
        <h1>Bienvenido a la plataforma de gestión de contenido</h1>
      </header>
      <LandingCarousel  />
      <main>
      <Button appearance="primary" onClick={() => navigate("/home")}>Iniciar sesion</Button>
      <SignedIn>
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox: { width: "80px", height: "80px"},
          },
        }}/>
      <p>Bienvenido {`${user?.firstName}`}, puedes <a href={HOME_DASHBOARD_PATH}>Ir al panel de contenido</a></p>
      </SignedIn>
      </main>
    </div>
  );
}

export default Landing;