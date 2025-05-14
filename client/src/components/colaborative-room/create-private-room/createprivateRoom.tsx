
import { Field, makeStyles } from "@fluentui/react-components";
import { AnimalCat24Regular } from "@fluentui/react-icons";

const useCatInputStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    columnGap: "4px",
    width: "100%"
  },
});

const CatInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const styles = useCatInputStyles();
  return (
    <div className={styles.root}>
      <AnimalCat24Regular fontSize="32px" />
      <input {...props} style={{width: "100%", height: "40px", borderRadius: "8px", background: "#000"}} />
    </div>
  );
};
interface CreateProps{
  roomName: string,
  onChange: (value: string)=> void,
  label: string,
  hint: string
}
export const CreatePrivateRoom = ({ roomName, onChange, label, hint }:CreateProps) => (
  <Field
    label={label}
    hint={hint}
    value={roomName}
    onChange={onChange}
    style={{ display: "flex", flexDirection: "column", alignItems: "center"}}
  >
    {(fieldProps) => <CatInput {...fieldProps}  />}
  </Field>
); 