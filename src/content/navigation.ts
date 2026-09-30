export const navItems = [
  { id: 'home',       label: 'Home'       },
  { id: 'projects',   label: 'Projects'   },
  { id: 'about',      label: 'About Me'   },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact'    },
] as const;

export type NavId = (typeof navItems)[number]['id'];
