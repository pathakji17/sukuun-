import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sukuun color palette - soft, romantic, peaceful
        'sukuun': {
          'cream': '#FBF8F3',
          'ivory': '#FFFEF9',
          'white': '#FFFFFF',
          'beige': '#F5E6D3',
          'rose': '#F5E0E0',
          'pink': '#F0D9E8',
          'lavender': '#E8DFF0',
          'blue': '#D9E8F0',
          'gray-light': '#EFEFEF',
          'gray': '#E0E0E0',
          'gray-dark': '#8A8A8A',
          'text': '#2D2D2D',
          'text-light': '#5A5A5A',
        },
      },
      backgroundColor: {
        // Defaults for common backgrounds
        'page': '#FBF8F3',
        'card': '#FFFFFF',
        'subtle': '#F5E6D3',
      },
      textColor: {
        'primary': '#2D2D2D',
        'secondary': '#5A5A5A',
        'muted': '#8A8A8A',
      },
      fontFamily: {
        'serif': [
          'Crimson Text',
          'Lora',
          'Georgia',
          'serif',
        ],
        'sans': [
          'Inter',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'sm': ['14px', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'base': ['16px', { lineHeight: '1.75', letterSpacing: '0.005em' }],
        'lg': ['18px', { lineHeight: '1.75', letterSpacing: '0' }],
        'xl': ['20px', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '1.8', letterSpacing: '-0.01em' }],
        '3xl': ['30px', { lineHeight: '1.8', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '1.8', letterSpacing: '-0.02em' }],
      },
      spacing: {
        // Large whitespace for breathing room
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '2',
        'looser': '2.25',
      },
      letterSpacing: {
        'tight': '-0.02em',
        'normal': '0em',
        'wide': '0.02em',
        'wider': '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-out': 'fadeOut 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'slide-left': 'slideLeft 0.8s ease-out',
        'slide-right': 'slideRight 0.8s ease-out',
        'blur-in': 'blurIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'softer': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'sm-soft': '0 1px 3px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
      },
    },
  },
  plugins: [],
};

export default config;
