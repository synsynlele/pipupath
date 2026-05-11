export const metadata = {
  title: "PipuPath",
  description: "Adaptive growth platform",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}