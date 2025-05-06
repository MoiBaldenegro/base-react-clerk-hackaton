import {SignedIn} from "@clerk/clerk-react";
import { Outlet } from 'react-router-dom';
import { Basic as AsideBar } from '../components/ui/AsideBar'; // esta ruta hay que ponerla bien <========
import "./global.css";

export const Home = () => {
  return (
   <main className="homeContainer">
     <AsideBar/>
    <SignedIn > 
                <Outlet />
    </SignedIn>  
   </main>
  );
}
