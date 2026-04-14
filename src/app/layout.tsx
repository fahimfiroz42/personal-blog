import Metadata from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata = {
  title: 'EDUBlog | Science, German & IELTS',
  description: 'A premium platform for Science Education, German Language Learning, and IELTS Preparation.',
  keywords: ['Science Education', 'Learn German', 'IELTS Prep', 'Educational Blog'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-border bg-card py-12 mt-20">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            <p>&copy; 2026 EDUBlog. Built for excellence in education.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
