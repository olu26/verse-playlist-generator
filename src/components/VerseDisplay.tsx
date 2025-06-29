
import { useState, useEffect } from "react";
import { Verse, getVersesByMood } from "@/data/verses";
import { moods } from "@/data/moods";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, Bookmark, Copy, Share2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface VerseDisplayProps {
  moodId: string | null;
}

const VerseDisplay = ({ moodId }: VerseDisplayProps) => {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Get the mood name and info
  const currentMood = moodId 
    ? moods.find(m => m.id === moodId)
    : null;

  // Reset and load verses when mood changes
  useEffect(() => {
    if (moodId) {
      const foundVerses = getVersesByMood(moodId);
      setVerses(foundVerses);
      setCurrentVerseIndex(0);
    } else {
      setVerses([]);
    }
  }, [moodId]);

  const handleCopy = (verse: Verse) => {
    const textToCopy = `"${verse.text}" - ${verse.reference} (${verse.translation})`;
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to clipboard",
      description: "Verse has been copied to clipboard",
    });
  };

  const handleSave = (verse: Verse) => {
    toast({
      title: "Verse saved",
      description: "Verse has been saved to your favorites",
    });
  };

  const handleShare = (verse: Verse) => {
    if (navigator.share) {
      navigator.share({
        title: `Bible Verse: ${verse.reference}`,
        text: `"${verse.text}" - ${verse.reference} (${verse.translation})`,
        url: window.location.href,
      }).catch(() => {
        toast({
          title: "Unable to share",
          description: "Your browser doesn't support sharing",
        });
      });
    } else {
      handleCopy(verse);
    }
  };

  const handleViewVerses = () => {
    setIsDialogOpen(true);
  };

  const handleNextVerse = () => {
    if (currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
    } else {
      setCurrentVerseIndex(0); // Loop back to the first verse
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex > 0) {
      setCurrentVerseIndex(prev => prev - 1);
    } else {
      setCurrentVerseIndex(verses.length - 1); // Loop to the last verse
    }
  };

  // If no mood is selected, show prompt
  if (!moodId) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <BookMarked className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-medium mb-2">Select a mood or situation</h2>
        <p className="text-muted-foreground max-w-md">
          Choose how you're feeling or what you're going through, and we'll find Scripture verses to encourage and guide you.
        </p>
      </div>
    );
  }

  // If no verses found for mood, show message
  if (verses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-xl font-medium mb-2">No verses found</h2>
        <p className="text-muted-foreground">We couldn't find verses for this mood. Please try another one.</p>
      </div>
    );
  }

  const currentVerse = verses[currentVerseIndex];

  // Only show a button, and open the dialog as a popup
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Button onClick={handleViewVerses} className="mt-2">
        View Scriptures
        {currentMood?.icon && <currentMood.icon className="ml-2 h-4 w-4" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <div className="flex justify-between items-center mb-2">
            <DialogTitle className="text-center">
              {currentMood?.name}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)} className="absolute right-4 top-4">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-center mb-4">
            {verses.length} verses to help with {currentMood?.description.toLowerCase()}
          </DialogDescription>

          <div className="pb-2">
            <Card className="bg-card overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-6">
                  <blockquote className="text-lg md:text-xl font-serif italic mb-4 relative">
                    <div className="absolute -left-2 -top-2 text-3xl text-primary/20">"</div>
                    "{currentVerse.text}"
                    <div className="absolute -right-2 -bottom-2 text-3xl text-primary/20">"</div>
                  </blockquote>
                  <div className="flex justify-end">
                    <p className="text-right font-medium">
                      {currentVerse.reference}
                      <span className="ml-1 text-muted-foreground text-sm">({currentVerse.translation})</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleCopy(currentVerse)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleSave(currentVerse)}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleShare(currentVerse)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrevVerse}
                      disabled={verses.length <= 1}
                    >
                      Previous
                    </Button>
                    <div className="text-sm">
                      {currentVerseIndex + 1} / {verses.length}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextVerse}
                      disabled={verses.length <= 1}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            {verses.length} verses available
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerseDisplay;
