export interface HotlineNumber {
  number: string;
  tel: string;
  navbar?: boolean;
}

export interface Hotline {
  label: string;
  numbers: HotlineNumber[];
  description?: string;
  featured?: boolean;
}

export interface HotlineCategory {
  category: string;
  icon: string;
  hotlines: Hotline[];
}

export interface NavbarHotline {
  label: string;
  number: HotlineNumber;
  featured?: boolean;
}

export const HOTLINE_CATEGORIES: HotlineCategory[] = [
  {
    category: 'For Emergency Response Services',
    icon: 'Siren',
    hotlines: [
      {
        label: 'National Emergency Hotline',
        numbers: [{ number: '911', tel: '911', navbar: true }],
        description: 'Call for all emergencies in Davao City',
        featured: true,
      },
      {
        label: 'National Emergency Hotline',
        numbers: [{ number: '911', tel: '911' }],
        description: 'Call for all emergencies in Davao City',
      },
    ],
  },
  {
    category: 'Public Safety and Security Concerns',
    icon: 'Shield',
    hotlines: [
      {
        label: 'Task Force Davao',
        numbers: [
          { number: '0917 131 4333', tel: '09171314333' },
          { number: '0999 227 1111', tel: '09992271111' },
          { number: '(082) 224 0911', tel: '082224091' },
        ],
      },
      {
        label: 'Davao City Police',
        numbers: [
          { number: '0998 598 7054', tel: '09985987054' },
          { number: '0916 659 2576', tel: '09166592576' },
          { number: '(082) 227 5777', tel: '0822275777' },
        ],
      },
    ],
  },
  {
    category: 'LGU Inquires, Reports, Suggestions',
    icon: 'Building2',
    hotlines: [
      {
        label: 'Davao City Contact Center',
        numbers: [
          { number: '0918 901 9991', tel: '09189019991', navbar: true },
          { number: '0918 902 9991', tel: '09189029991' },
          { number: '0918 903 9991', tel: '09189039991' },
          { number: '0918 904 9991', tel: '09189049991' },
          { number: '0918 905 9991', tel: '09189059991' },
          { number: '0918 906 9991', tel: '09189069991' },
          { number: '0918 907 9991', tel: '09189079991' },
          { number: '0918 908 9991', tel: '09189089991' },
          { number: '(082) 235 9999', tel: '0822359999' },
        ],
      },
      {
        label: 'Davao City Reports',
        numbers: [
          { number: '0916 131 2333', tel: '09161312333', navbar: true },
          { number: '0919 072 2222', tel: '09190722222' },
        ],
      },
      {
        label: 'Davao City Disaster Radio',
        numbers: [
          { number: '0961 834 0359', tel: '09618340359', navbar: true },
          { number: '0992 891 1074', tel: '09928911074' },
          { number: '(082) 298 8781', tel: '0822988781' },
        ],
      },
    ],
  },
];

export const NAVBAR_HOTLINES: NavbarHotline[] = HOTLINE_CATEGORIES.flatMap(
  c => c.hotlines
).flatMap(h =>
  h.numbers
    .filter(n => n.navbar)
    .map(n => ({ label: h.label, number: n, featured: h.featured }))
);
