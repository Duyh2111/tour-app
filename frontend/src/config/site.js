/**
 * Central site configuration.
 * All business-specific values live here — never hardcode them in components.
 * Override any value via the corresponding VITE_ environment variable in Vercel.
 */
const site = {
  name:    import.meta.env.VITE_SITE_NAME    || 'Trần Gia Travel',
  tagline: import.meta.env.VITE_SITE_TAGLINE || 'Authentic Vietnam Journeys',

  contact: {
    email:   import.meta.env.VITE_CONTACT_EMAIL   || 'hello@trangia.travel',
    phone:   import.meta.env.VITE_CONTACT_PHONE   || '+84 (0) 28 1234 5678',
    address: import.meta.env.VITE_CONTACT_ADDRESS || '12 Nguyễn Huệ, Quận 1, Hồ Chí Minh City, Vietnam',
  },

  social: {
    facebook:  import.meta.env.VITE_SOCIAL_FACEBOOK  || null,
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || null,
    youtube:   import.meta.env.VITE_SOCIAL_YOUTUBE   || null,
  },
};

export default site;
