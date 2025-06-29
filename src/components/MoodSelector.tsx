
import { useState } from "react";
import { moods, Mood } from "@/data/moods";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface MoodSelectorProps {
  onMoodSelect: (moodId: string) => void;
  selectedMood: string | null;
}

const MoodSelector = ({ onMoodSelect, selectedMood }: MoodSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMoods = moods.filter(mood => 
    mood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mood.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search moods or situations..."
          className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filteredMoods.map((mood) => (
          <MoodCard
            key={mood.id}
            mood={mood}
            isSelected={selectedMood === mood.id}
            onSelect={() => onMoodSelect(mood.id)}
          />
        ))}
      </div>
    </div>
  );
};

interface MoodCardProps {
  mood: Mood;
  isSelected: boolean;
  onSelect: () => void;
}

const MoodCard = ({ mood, isSelected, onSelect }: MoodCardProps) => {
  const { name, icon: Icon, description } = mood;
  
  return (
    <Card 
      className={cn(
        "flex flex-col items-center justify-center p-3 h-28 transition-all cursor-pointer hover:border-primary/50 hover:shadow-sm",
        isSelected && "border-primary/70 bg-primary/5 shadow-sm"
      )}
      onClick={onSelect}
    >
      <Icon className={cn(
        "h-7 w-7 mb-2",
        isSelected ? "text-primary" : "text-muted-foreground"
      )} />
      <h3 className="text-sm font-medium text-center">{name}</h3>
      <p className="text-xs text-muted-foreground text-center truncate w-full">
        {description}
      </p>
    </Card>
  );
};

export default MoodSelector;
