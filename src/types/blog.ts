export interface BlogPost {
  id: string;
  title: string;
  category: 'Science' | 'German' | 'IELTS';
  excerpt: string;
  content: string;
  date: string;
  author: string;
  featured?: boolean;
  imageUrl?: string;
}
