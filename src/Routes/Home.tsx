import {SignedIn} from "@clerk/clerk-react";
import { Outlet } from 'react-router-dom';
import { Basic as AsideBar } from '../components/ui/AsideBar'; // esta ruta hay que ponerla bien <========
import "./global.css";
import { Header } from "../components/ui/header";
import { useState } from "react";
import { width } from "pdfkit/js/page";

export const Home = () => {

  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  }
  return (
   <main className="homeContainer">
     <AsideBar onChange={toggleAside}/>
     <section style={!isAsideOpen ? {width: "calc(100% - 300px)"} : {width: "100%"}} >
      <SignedIn > 
                  <Outlet />
      </SignedIn>  
     </section>
   </main>
  );
}
