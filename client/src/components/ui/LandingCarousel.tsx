import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import shot_01 from "../../assets/shots/shot_01.webp";
import shot_02 from "../../assets/shots/shot_02.webp";

import {
    Button,
    Image,
    makeStyles,
    tokens,
    typographyStyles,
  } from "@fluentui/react-components";
  import {
    Carousel,
    CarouselCard,
    CarouselNav,
    CarouselNavButton,
    CarouselNavContainer,
    CarouselViewport,
    CarouselAnnouncerFunction,
    CarouselSlider,
  } from "@fluentui/react-components";
  import * as React from "react";
import { useNavigate } from "react-router-dom";
  
  const useClasses = makeStyles({
    bannerCard: {
      alignContent: "center",
      borderRadius: tokens.borderRadiusLarge,
      height: "450px",
      textAlign: "left",
      position: "relative",
    },
    cardContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      position: "absolute",
      left: "10%",
      top: "25%",
      background: tokens.colorNeutralBackground1,
      padding: "18px",
      maxWidth: "270px",
      width: "50%",
      borderRadius: "8px",
      border: "2px solid rgba(245, 245, 245, 0.35)",
      boxShadow: "0px 0px 4px  #f5f5f559 inset"
    },
    title: {
      fontSize: "1.5rem",
      color: "#156fbd",
      fontWeight: 500,
    },
    subtext: {
      textWrap: "balance"
    },
  });
  

  const DATA = [
    {
      image: shot_01,
      title: "Pair programming",
      description: "Es perfecto para quien solo quiere escribir y ejecutar rápidamente código colaborativamente con su equipo, en tiempo real. Con un IDE que cuenta con soporte para diversos lenguajes sin necesidad de instalar un entorno completo en su equipo.",
      buttonText: "ir el editor"
    },
      {
      image: shot_02,
      title: "Reclutamiento",
      description: "Ejecuta, prueba y monitorea pruebas tecnicas. Una herramienta excelente para mejorar la calidad del proceso de pruebas tecnicas para el reclutamiento de talento.",
      buttonText: "Crear sala"

    }
  ]
            
  
  const BannerCard: React.FC<{
    description: string,
    children: React.ReactNode;
    imageSrc: string;
    index: number;
    buttonText: string;
  }> = (props) => {
    const { children, imageSrc, index, description, buttonText} = props;
    const classes = useClasses();
    const navigate = useNavigate()
  
    return (
      <CarouselCard
        className={classes.bannerCard}
        aria-label={`${index + 1} of ${DATA.length}`}
        id={`test-${index}`}
      >
        <Image fit="cover" src={imageSrc} role="presentation" />
  
        <div className={classes.cardContainer}>
          <div className={classes.title}>{children}</div>
          <div className={classes.subtext}>
            {description}
          </div>
          <div>
            <Button appearance="primary" onClick={() => navigate("/home/dashboard")}>{buttonText}</Button>
          </div>
        </div>
      </CarouselCard>
    );
  };
  
  const getAnnouncement: CarouselAnnouncerFunction = (
    index: number,
    totalSlides: number,
    slideGroupList: number[][]
  ) => {
    return `Carousel slide ${index + 1} of ${totalSlides}`;
  };
  
  export const LandingCarousel = () => (
    <Carousel groupSize={1} circular announcement={getAnnouncement}>
      <CarouselViewport>
        <CarouselSlider>
          {DATA.map((item, index) => (
            <BannerCard key={`image-${index}`} buttonText={item.buttonText} imageSrc={item.image} index={index} description={item.description}>
              {item.title}
            </BannerCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer
        layout="inline"
        autoplayTooltip={{ content: "Autoplay", relationship: "label" }}
        nextTooltip={{ content: "Go to next", relationship: "label" }}
        prevTooltip={{ content: "Go to prev", relationship: "label" }}
      >
        <CarouselNav>
          {(index) => (
            <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );