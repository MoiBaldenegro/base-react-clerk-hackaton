import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { Outlet } from 'react-router-dom';
import { Basic as AsideBar } from '../components/ui/AsideBar';
import "./global.css";
import { useState } from "react";

export const Home = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  
  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  }

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  
  return (
    <main className="homeContainer">
      <AsideBar onChange={toggleAside}/>
      <section style={!isAsideOpen ? {width: "calc(100% - 300px)"} : {width: "100%"}}>
        <Outlet />
      </section>
    </main>
  );
}