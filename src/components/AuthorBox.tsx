import { FacebookIcon, TwitterIcon, InstagramIcon } from '@/components/Icons';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function AuthorBox({ author }: { author: string }) {
  return (
    <Card className="p-8 lg:p-12 mt-16 bg-card border-border rounded-3xl overflow-hidden relative shadow-sm">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <Avatar className="h-28 w-28 mb-6 border-4 border-muted p-1">
          <AvatarImage src={`https://i.pravatar.cc/200?u=${author}`} />
          <AvatarFallback>{author[0]}</AvatarFallback>
        </Avatar>
        
        <h3 className="text-2xl font-heading font-bold mb-1 text-foreground">{author}</h3>
        <p className="text-[10px] uppercase font-black tracking-[.2em] text-primary mb-6">Founder & Editor</p>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 italic">
          Hello! I'm {author}, a passionate educator and writer dedicated to sharing high-quality resources for students and language learners worldwide.
        </p>
        
        <div className="flex items-center gap-6 text-muted-foreground mb-8">
          <TwitterIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          <FacebookIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
          <InstagramIcon className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
        </div>
        
        <Button variant="outline" className="rounded-full px-8 uppercase font-black text-[10px] tracking-widest hover:bg-primary hover:text-primary-foreground border-border">
          View All Posts
        </Button>
      </div>
    </Card>
  );
}
