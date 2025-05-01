/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        surface: '#ffffff',
        'surface-tab': '#f1f5f9', // slate-100
        accent: '#1877f2',
        input: '#f1f5f9', // slate-100
        success: '#16a34a', // green-500
        muted: '#64748b', // slate-500
        danger: '#ef4444', // red-500
      },
      fontFamily: {
        // Brand Fonts - Montserrat
        brand: ['BrandRegular', 'sans-serif'],
        'brand-medium': ['BrandMedium', 'sans-serif'],
        'brand-semibold': ['BrandSemiBold', 'sans-serif'],
        'brand-bold': ['BrandBold', 'sans-serif'],

        // Header Fonts - Cabin
        header: ['HeaderRegular', 'sans-serif'],
        'header-medium': ['HeaderMedium', 'sans-serif'],
        'header-semibold': ['HeaderSemiBold', 'sans-serif'],
        'header-bold': ['HeaderBold', 'sans-serif'],

        // Body Fonts - Catamaran
        'body-thin': ['BodyThin', 'sans-serif'],
        'body-extra-light': ['BodyExtraLight', 'sans-serif'],
        'body-light': ['BodyLight', 'sans-serif'],
        body: ['BodyRegular', 'sans-serif'],
        'body-medium': ['BodyMedium', 'sans-serif'],
        'body-semibold': ['BodySemiBold', 'sans-serif'],
        'body-bold': ['BodyBold', 'sans-serif'],
        'body-extra-bold': ['BodyExtraBold', 'sans-serif'],
        'body-black': ['BodyBlack', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
