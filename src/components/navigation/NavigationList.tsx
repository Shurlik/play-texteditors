import {
  AdsClick,
  AutoGraph,
  PersonOutlined,
  Phone,
  SubjectOutlined,
  TrackChanges,
  PostAdd,
  ManageAccounts,
} from "@mui/icons-material";
import {
  AIIcon,
  ArticlesIcon,
  BrandIcon,
  CampaignIcon,
  EmailIcon,
  FacebookIcon,
  GoalsIcon,
  GoogleIcon,
  IdeasIcon,
  InstIcon,
  KpiIcon,
  LandingIcon,
  LeadIcon,
  LinkedInIcon,
  NewsIcon,
  PodcastIcon,
  PresentationIcon,
  SalesIcon,
  ShortFormIcon,
  StepsIcon,
  StrategyIcon,
  XIcon,
  YouTubeIcon,
  PinterestIcon,
} from "@/components/common/Icons";

interface MenuItem {
  name: string;
  link?: string;
  icon: JSX.Element | (() => JSX.Element);
  disabled?: boolean;
  subItems?: MenuItem[];
}

export const brandItems: MenuItem[] = [
  {
    name: "Persona",
    icon: () => <PersonOutlined style={{ fontSize: "16px" }} />,
    subItems: [
      {
        name: "Create Persona",
        link: "/create",
        icon: <PersonOutlined style={{ fontSize: "15px" }} />,
        disabled: false,
      },
      {
        name: "1 Click Generation",
        link: "/",
        icon: <AdsClick style={{ fontSize: "15px" }} />,
        disabled: true,
      },
      { name: "Analyzer", link: "/", icon: <StepsIcon />, disabled: true },
      {
        name: "Management",
        link: "/management",
        icon: <ManageAccounts style={{ fontSize: "15px" }} />,
        disabled: false,
      },
    ],
  },
  {
    name: "Brand",
    icon: <BrandIcon />,
    subItems: [
      {
        name: "Guidelines",
        link: "/",
        icon: <SubjectOutlined style={{ fontSize: "15px" }} />,
        disabled: true,
      },
      {
        name: "Analyzer",
        link: "/",
        icon: <AutoGraph style={{ fontSize: "15px" }} />,
        disabled: true,
      },
    ],
  },
];

// Content menu items
export const contentItems: MenuItem[] = [
  { name: "Editorial Plan", link: "/", icon: <StepsIcon />, disabled: true },
  { name: "Ideas", link: "/", icon: <IdeasIcon />, disabled: true },
  {
    name: "Create Articles",
    link: "/forms",
    icon: <ArticlesIcon />,
    disabled: false,
  },
  {
    name: "Short-form Posts",
    link: "/shorts",
    icon: <ShortFormIcon />,
    disabled: false,
  },
  { name: "Podcast", link: "/", icon: <PodcastIcon />, disabled: true },
  { name: "YouTube", link: "/", icon: <YouTubeIcon />, disabled: true },
  { name: "Newsletter", link: "/", icon: <NewsIcon />, disabled: true },
  {
    name: "Depot",
    link: "/articles",
    icon: <PostAdd style={{ width: "18px", height: "18px" }} />,
    disabled: false,
  },
];

// Funnel menu items
export const funnelItems: MenuItem[] = [
  { name: "Strategy", link: "/", icon: <StrategyIcon />, disabled: true },
  {
    name: "Ads",
    icon: <TrackChanges style={{ fontSize: "15px" }} />,
    subItems: [
      {
        name: "Create Ad",
        link: "/ads/create",
        icon: <PostAdd style={{ width: "16px", height: "16px" }} />,
        disabled: false,
      },
      {
        name: "Facebook",
        link: "/ads/facebook",
        icon: <FacebookIcon />,
        disabled: false,
      },
      {
        name: "Google",
        link: "/ads/google",
        icon: <GoogleIcon />,
        disabled: false,
      },
      {
        name: "Instagram",
        link: "/ads/instagram",
        icon: <InstIcon />,
        disabled: false,
      },
      {
        name: "LinkedIn",
        link: "/ads/linkedin",
        icon: <LinkedInIcon />,
        disabled: false,
      },
      { name: "X", link: "/ads/x", icon: <XIcon />, disabled: false },
      {
        name: "Pinterest",
        link: "/ads/pinterest",
        icon: <PinterestIcon />,
        disabled: false,
      },
    ],
  },
  { name: "Lead Magnet", link: "/", icon: <LeadIcon />, disabled: true },
  { name: "E-Mail Sequence", link: "/", icon: <EmailIcon />, disabled: true },
  { name: "Landing Pages", link: "/", icon: <LandingIcon />, disabled: true },
];

// Sales menu items
export const salesItems: MenuItem[] = [
  { name: "Campaigns", link: "/", icon: <CampaignIcon />, disabled: true },
  { name: "Sales Letter", link: "/", icon: <SalesIcon />, disabled: true },
  {
    name: "Sales Presentations",
    link: "/",
    icon: <PresentationIcon />,
    disabled: true,
  },
  {
    name: "Discovery Calls",
    link: "/",
    icon: <Phone style={{ fontSize: "15px" }} />,
    disabled: true,
  },
];

// Strategy menu items
export const strategyItems: MenuItem[] = [
  { name: "9 Steps", link: "#", icon: <StepsIcon />, disabled: true },
  { name: "Goals", link: "#", icon: <GoalsIcon />, disabled: true },
  { name: "KPI’s", link: "#", icon: <KpiIcon />, disabled: true },
  { name: "AI Assistant", link: "#", icon: <AIIcon />, disabled: true },
];
