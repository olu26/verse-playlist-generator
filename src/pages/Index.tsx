
import { useState } from "react";
import MoodSelector from "@/components/MoodSelector";
import VerseDisplay from "@/components/VerseDisplay";
import { BookOpenText } from "lucide-react";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 md:py-6 px-4 border-b">
        <div className="container max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpenText className="h-6 w-6 text-primary" />
              <h1 className="text-lg md:text-xl font-semibold">BibleVerse</h1>
            </div>
            <p className="text-sm text-muted-foreground">Scripture for every moment</p>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl py-8 px-4 md:py-12">
        <div className="grid grid-cols-1 gap-12">
          <section>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Find Peace in Scripture</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your mood or situation below, and we'll share verses to encourage, 
                comfort, and guide you on your journey.
              </p>
            </div>
            <div className="mb-8">
              <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
            </div>
          </section>

          <section className="bg-gradient-radial from-primary/5 to-background p-6 rounded-lg">
            <VerseDisplay moodId={selectedMood} />
          </section>
        </div>
      </main>

      <footer className="py-6 px-4 border-t">
        <div className="container max-w-5xl">
          <p className="text-sm text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} BibleVerse | Scripture for every season of life | developed by <a href="https://wa.me/qr/ZK5UDDMJ3IUVD1" className="text-black text-xl	">oluchukwu</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
