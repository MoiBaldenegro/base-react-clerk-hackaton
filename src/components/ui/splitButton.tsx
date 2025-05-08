import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SplitButton,
} from "@fluentui/react-components";
import type { MenuButtonProps } from "@fluentui/react-components";

const onClick = () => alert("Primary action button clicked.");

const primaryActionButtonProps = {
  onClick,
};

interface LanguageOption {
    id: number;
    name: string;
  }
  
const languageOptions: LanguageOption[] = [
    { id: 63, name: 'javascript' },
    { id: 71, name: 'python' },
    { id: 54, name: 'cpp' },
  ];
  

export const SplitButtonComponent = () => (
  <Menu positioning="below-end">
    <MenuTrigger disableButtonEnhancement>
      {(triggerProps: MenuButtonProps) => (
        <SplitButton
          menuButton={triggerProps}
          primaryActionButton={primaryActionButtonProps}
        >
          Example
        </SplitButton>
      )}
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        {languageOptions.map((option) => (
          <MenuItem key={option.id} onClick={() => console.log(option.name)}>
            {option.name}
          </MenuItem>
        ))}
      </MenuList>
    </MenuPopover>
  </Menu>
);
