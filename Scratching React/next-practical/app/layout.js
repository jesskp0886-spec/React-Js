import "./globals.css";

export const metadata = {
    title: "Next.js Student Application",
    description: "Next.js Practical Assignment"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}