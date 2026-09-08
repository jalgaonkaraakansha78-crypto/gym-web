// ---------------------------------------------------------------------------
// PLACEHOLDER IMAGES
// Every image in this site is pulled from this single file so a real gym can
// swap in their own photography by editing the URLs below (or pointing them
// at local files in /src/assets/images/).
// ---------------------------------------------------------------------------

const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  heroBg: u('photo-1534438327276-14e5300c3a48', 1800),
  aboutGym: u('photo-1517836357463-d25dfeac3438', 1200),

  programs: {
    weight: u('photo-1583454110551-21f2fa2afe61', 900),
    muscle: u('photo-1571019613454-1cb2f99b2d8b', 900),
    fatloss: u('photo-1517963879433-6ad2b056d712', 900),
    personal: u('photo-1571731956672-f2b94d7dd0cb', 900),
    functional: u('photo-1517838277536-f5f99be501cd', 900),
    cardio: u('photo-1544033527-b192daee1f5b', 900),
  },

  transformations: [
    u('photo-1571008887538-b36bb32f4571', 700),
    u('photo-1584466977773-e625c37cdd50', 700),
    u('photo-1594381898411-846e7d193883', 700),
  ],

  trainers: [
    u('photo-1567013127542-490d757e51fc', 700),
    u('photo-1594381898411-846e7d193883', 700),
    u('photo-1548690312-e3b507d8c110', 700),
    u('photo-1571907480495-4e8a3c0e2c1c', 700),
  ],

  testimonialAvatars: [
    u('photo-1500648767791-00dcc994a43e', 200),
    u('photo-1502685104226-ee32379fefbe', 200),
    u('photo-1506794778202-cad84cf45f1d', 200),
    u('photo-1522075469751-3a6694fb2f61', 200),
  ],

  ctaBg: u('photo-1526506118085-60ce8714f8c5', 1800),
  contactMap: u('photo-1524661135-423995f22d0b', 1200),
};
