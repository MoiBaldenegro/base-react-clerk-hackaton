import { DrawerProps, shorthands } from "@fluentui/react-components";
import { OrganizationSwitcher, UserButton } from "@clerk/clerk-react";
import * as React from "react";
import {
  AppItem,
  Hamburger,
  NavCategory,
  NavCategoryItem,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavDrawerProps,
  NavItem,
  NavSectionHeader,
  NavSubItem,
  NavSubItemGroup,
} from "@fluentui/react-nav-preview";

import {
  Label,
  Radio,
  RadioGroup,
  Switch,
  Tooltip,
  makeStyles,
  tokens,
  useId,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import {
  Board20Filled,
  Board20Regular,
  BoxMultiple20Filled,
  BoxMultiple20Regular,
  DataArea20Filled,
  DataArea20Regular,
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular,
  HeartPulse20Filled,
  HeartPulse20Regular,
  MegaphoneLoud20Filled,
  MegaphoneLoud20Regular,
  NotePin20Filled,
  NotePin20Regular,
  People20Filled,
  People20Regular,
  PeopleStar20Filled,
  PeopleStar20Regular,
  Person20Filled,
  PersonLightbulb20Filled,
  PersonLightbulb20Regular,
  Person20Regular,
  PersonSearch20Filled,
  PersonSearch20Regular,
  PreviewLink20Filled,
  PreviewLink20Regular,
  bundleIcon,
  PersonCircle32Regular,
} from "@fluentui/react-icons";
import { CODE_EDITOR_PATH, COLABORATIVE_ROOM_PATH, DASHBOARD_PATH, DISCORD_PATH, MOISES_PATH} from "../../helpers/paths";
import { useNavigate } from "react-router-dom";
import { GitHub } from "../svg/gitHub";
import { Discord } from "../svg/discord";

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "1005",
  },
  nav: {
    minWidth: "300px",
  },
  content: {
    flex: "1",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const Person = bundleIcon(Person20Filled, Person20Regular);
const Dashboard = bundleIcon(Board20Filled, Board20Regular);
const Announcements = bundleIcon(MegaphoneLoud20Filled, MegaphoneLoud20Regular);
const EmployeeSpotlight = bundleIcon(
  PersonLightbulb20Filled,
  PersonLightbulb20Regular
);
const Search = bundleIcon(PersonSearch20Filled, PersonSearch20Regular);
const PerformanceReviews = bundleIcon(
  PreviewLink20Filled,
  PreviewLink20Regular
);
const JobPostings = bundleIcon(NotePin20Filled, NotePin20Regular);
const Interviews = bundleIcon(People20Filled, People20Regular);
const HealthPlans = bundleIcon(HeartPulse20Filled, HeartPulse20Regular);
const TrainingPrograms = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const CareerDevelopment = bundleIcon(PeopleStar20Filled, PeopleStar20Regular);
const Analytics = bundleIcon(DataArea20Filled, DataArea20Regular);
const Reports = bundleIcon(
  DocumentBulletListMultiple20Filled,
  DocumentBulletListMultiple20Regular
);

type DrawerType = Required<DrawerProps>["type"];
interface Props extends DrawerType {
  onChange: () => void;
  props?: Partial<NavDrawerProps>;
}

export const Basic = ({ props, onChange}: Props) => {
  const navigate = useNavigate();
  const styles = useStyles();

  const typeLableId = useId("type-label");
  const linkLabelId = useId("link-label");
  const multipleLabelId = useId("multiple-label");

  const [isOpen, setIsOpen] = React.useState(true);
  const [enabledLinks, setEnabledLinks] = React.useState(false);
  const [type, setType] = React.useState<DrawerType>("inline");
  const [isMultiple, setIsMultiple] = React.useState(true);

  // Tabster prop used to restore focus to the navigation trigger for overlay nav drawers
  const restoreFocusTargetAttributes = useRestoreFocusTarget();

  const linkDestination = enabledLinks ? "https://www.bing.com" : "";

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue="2"
        defaultSelectedCategoryValue=""
        open={isOpen}
        type={type}
        multiple={isMultiple}
        className={styles.nav}
      >
        <NavDrawerHeader>
          <Tooltip content="Close Navigation" relationship="label">
            <Hamburger onClick={() => {
              setIsOpen(!isOpen)
              onChange();
            }} />
          </Tooltip>
        </NavDrawerHeader>

        <NavDrawerBody>
          {/* <AppItem
            icon={<PersonCircle32Regular />}
            as="a"
            href={linkDestination}
            >
            Contoso HR
          </AppItem> */}
      <OrganizationSwitcher hideSlug />
          <NavItem href={linkDestination} icon={<Dashboard />} value="1" onClick={() => navigate(DASHBOARD_PATH)}>
            Dashboard
          </NavItem>
          <NavItem
            icon={<PerformanceReviews />}
            href={linkDestination}
            value="5"
            onClick={() => navigate(CODE_EDITOR_PATH)}
          >
            Code editor
          </NavItem>
            <NavItem icon={<Interviews />} value="9" onClick={() => navigate(COLABORATIVE_ROOM_PATH)}>
              Colaborative room
            </NavItem>
            <NavItem
            href={linkDestination}
            icon={<EmployeeSpotlight />}
            value="3"
            onClick={() => navigate(MOISES_PATH)}
          >
            Moises AI
          </NavItem>
          <NavDivider />
          <NavSectionHeader>Organizations</NavSectionHeader>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>
              Career Development
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="17">
               + {" "} Crear una nueva organización 
              </NavSubItem>
              
            </NavSubItemGroup>
          </NavCategory>
          {/* <NavItem href={linkDestination} icon={<Announcements />} value="2">
            Announcements
          </NavItem>
          <NavItem icon={<Search />} href={linkDestination} value="4">
            Profile Search
          </NavItem> */}
          {/* <NavSectionHeader>Employee Management</NavSectionHeader>
          <NavCategory value="6">
            <NavCategoryItem icon={<JobPostings />}>
              Job Postings
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="7">
                Openings
              </NavSubItem>
              <NavSubItem href={linkDestination} value="8">
                Submissions
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>

          <NavSectionHeader>Benefits</NavSectionHeader>
          <NavItem icon={<HealthPlans />} value="10">
            Health Plans
          </NavItem>
          <NavCategory value="11">
            <NavCategoryItem icon={<Person />} value="12">
              Retirement
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="13">
                Plan Information
              </NavSubItem>
              <NavSubItem href={linkDestination} value="14">
                Fund Performance
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory>
          <NavSectionHeader>Learning</NavSectionHeader>
          <NavItem icon={<TrainingPrograms />} value="15">
            Training Programs
          </NavItem>
          <NavCategory value="16">
            <NavCategoryItem icon={<CareerDevelopment />}>
              Career Development
            </NavCategoryItem>
            <NavSubItemGroup>
              <NavSubItem href={linkDestination} value="17">
                Career Paths
              </NavSubItem>
              <NavSubItem href={linkDestination} value="18">
                Planning
              </NavSubItem>
            </NavSubItemGroup>
          </NavCategory> */}
          <NavDivider />
          <NavSectionHeader>Integratios</NavSectionHeader>
          <NavItem target="_blank" icon={<GitHub />} value="19">
            Github
          </NavItem>
          <NavItem href={linkDestination} icon={<Discord/>} value="20" onClick={() => navigate(DISCORD_PATH)}>
            Discord
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
      {!isOpen && (
        <div style={{  height: "max-content", position: "absolute", top:"5px", left:"14px"}}>
          <Tooltip content="Toggle navigation pane" relationship="label">
          <Hamburger
            onClick={() => {
              setIsOpen(true);
              onChange();
            }}
          />
        </Tooltip>
        </div>
      )}
      <div className={styles.content}>
        
        {/* <div className={styles.field}>
          <Label id={typeLableId}>Type</Label>
          <RadioGroup
            value={type}
            onChange={(_, data) => setType(data.value as DrawerType)}
            aria-labelledby={typeLableId}
          >
            <Radio value="overlay" label="Overlay (Default)" />
            <Radio value="inline" label="Inline" />
          </RadioGroup>
          <Label id={linkLabelId}>Links</Label>
          <Switch
            checked={enabledLinks}
            onChange={(_, data) => setEnabledLinks(!!data.checked)}
            label={enabledLinks ? "Enabled" : "Disabled"}
            aria-labelledby={linkLabelId}
          />

          <Label id={multipleLabelId}>Categories</Label>
          <Switch
            checked={isMultiple}
            onChange={(_, data) => setIsMultiple(!!data.checked)}
            label={isMultiple ? "Multiple" : "Single"}
            aria-labelledby={multipleLabelId}
          />
        </div> */}
      </div>
    </div>
  );
};
