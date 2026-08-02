/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f4f5f7',
        muted: '#9ca7ba',
        canvas: '#050b18',
        violet: '#9d8cff',
        cyan: '#5ed7db',
        mint: '#4ce6a2',
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Display',
          'SF Pro Text',
          'PingFang SC',
          'Microsoft YaHei',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'SFMono-Regular',
          'Cascadia Code',
          'Roboto Mono',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
}
