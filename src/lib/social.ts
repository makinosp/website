export interface SocialLink {
  label: string;
  href?: string;
  icon?: string;
  imgSrc?: string;
  modal?: "qq";
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Bluesky", href: "https://bsky.app/profile/mknn.jp", icon: "simple-icons:bluesky" },
  {
    label: "Discord",
    href: "https://discord.com/channels/@me/257326164996128770",
    icon: "simple-icons:discord",
  },
  { label: "GitHub", href: "https://github.com/mknnjp", icon: "simple-icons:github" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mknn.jp/",
    icon: "simple-icons:instagram",
  },
  { label: "QQ", icon: "simple-icons:tencentqq", modal: "qq" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/user/sheeptech",
    icon: "simple-icons:spotify",
  },
  {
    label: "Steam",
    href: "https://steamcommunity.com/id/mknnjp/",
    icon: "simple-icons:steam",
  },
  { label: "Telegram", href: "https://t.me/mknnjp", icon: "simple-icons:telegram" },
  {
    label: "Threads",
    href: "https://www.threads.net/@mknn.jp",
    icon: "simple-icons:threads",
  },
  {
    label: "VRChat",
    href: "https://vrchat.com/home/user/usr_d23319bc-086d-45e8-83ff-fb9ecb026d1f",
    imgSrc: "/VRC.svg",
  },
  { label: "X", href: "https://x.com/mknnjp", icon: "simple-icons:x" },
];
