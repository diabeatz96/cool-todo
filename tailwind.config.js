/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {        
              "primary": "#84e1e3",       
              "secondary": "#f0abfc",    
              "accent": "#fef08a",  
              "neutral": "#191D24",    
              "base-100": "#2A303C",     
              "info": "#3b82f6",      
              "success": "#36D399",   
              "warning": "#FBBD23",      
              "error": "#F87272",
        },
      },
    ],
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
}
