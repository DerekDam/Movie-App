/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Nếu bạn dùng Vite, thêm file index.html
    "./src/**/*.{js,jsx,ts,tsx}", // Đường dẫn đến các file chứa code React
  ],
  theme: {
    extend: {
      colors: {
        "custom-black": "#100f10", // Đặt tên cho màu tùy chỉnh
      },
      fontFamily: {
        black: ["Kanit-Black"],
        bold: ["Kanit-Bold"],
        italic: ["Kanit-Italic"],
        regular: ["Kanit-Regular"],
      },
    },
  },
  plugins: [],
};
