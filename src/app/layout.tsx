import { Metadata } from 'next';
import { Inter, Lora, Geist } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PostProvider } from '@/context/PostContext';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export const metadata: Metadata = {
  title: "Farsi's Blogs | Science, German & IELTS",
  description: 'A premium minimalist blog for serious learners and educators.',
  keywords: ['Science Education', 'Learn German', 'IELTS Prep', 'Educational Blog'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(inter.variable, lora.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen bg-[#fcfcfc] dark:bg-[#121212] font-sans antialiased text-[#1a1a1a] dark:text-gray-200 transition-colors duration-300">
        <PostProvider>
          <Navbar />
          <main className="container mx-auto px-4 pt-60 pb-12">
            {children}
          </main>
          <Footer />
        </PostProvider>
      </body>
    </html>
  );
}
