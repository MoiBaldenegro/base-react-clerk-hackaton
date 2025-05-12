import { Persona } from "@fluentui/react-components";

interface Props{
  name: string
}

export const People = ({ name }: Props) => {
  return (
    <Persona
      name={name}
      secondaryText="Verificado"
      presence={{ status: "available" }}
      avatar={{
        image: {
          src: "https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/persona-male.png",
        },
      }}
      size="extra-large"

    />
  );
};