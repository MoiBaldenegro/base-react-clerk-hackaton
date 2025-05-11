
import { Field, makeStyles } from "@fluentui/react-components";
import { AnimalCat24Regular } from "@fluentui/react-icons";

const useCatInputStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    columnGap: "4px",
  },
});

const CatInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  const styles = useCatInputStyles();
  return (
    <div className={styles.root}>
      <AnimalCat24Regular />
      <input {...props} />
    </div>
  );
};

export const CreatePrivateRoom = () => (
  <Field
    label="Third party input"
    hint="Use a render function to properly associate the label with the control."
  >
    {(fieldProps) => <CatInput {...fieldProps} />}
  </Field>
);