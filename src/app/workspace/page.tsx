"use client";

import { useState } from "react";
import { Mic, Send } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: (event: Event) => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: (event: Event) => void;
  start: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

export default function WorkspacePage() {
  // State for form inputs
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [includeNews, setIncludeNews] = useState(false);
  const [researchDepth, setResearchDepth] = useState(50);
  const [tone, setTone] = useState("");
  const [styleInstructions, setStyleInstructions] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Handle voice input
  const handleVoiceInput = async () => {
    if (!isRecording) {
      try {
        const recognition: SpeechRecognition =
          new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsRecording(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setTopic((prev) => prev + " " + transcript);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (error) {
        console.error("Error starting voice recognition:", error);
        setIsRecording(false);
      }
    }
  };

  // Handle generate content
  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement actual content generation
    setTimeout(() => {
      setGeneratedContent("Sample generated content...");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90 mb-6">
          Workspace
        </h1>

        <div className="grid gap-6">
          {/* Topic/Idea Input */}
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <Textarea
                placeholder="Start with a topic, question, or even just a keyword."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="min-h-[100px] resize-y bg-input border-input"
              />
              <Button
                variant="outline"
                size="icon"
                className={isRecording ? "bg-red-500 text-white" : ""}
                onClick={handleVoiceInput}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Research Focus */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Research Focus</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords & Concepts</Label>
                <Input
                  id="keywords"
                  placeholder="Enter keywords separated by commas"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-input border-input"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="news"
                  checked={includeNews}
                  onCheckedChange={setIncludeNews}
                />
                <Label htmlFor="news">Include Recent News/Trends</Label>
              </div>

              <div className="space-y-2">
                <Label>Depth of Research</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm">Superficial</span>
                  <Slider
                    value={[researchDepth]}
                    onValueChange={([value]) => setResearchDepth(value)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm">Deep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tone & Style */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tone & Style</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="tone">Preset Tone Options</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-input border-input">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="style">
                  Specific Style Instructions (Optional)
                </Label>
                <Textarea
                  id="style"
                  placeholder="Write in a concise, data-driven style"
                  value={styleInstructions}
                  onChange={(e) => setStyleInstructions(e.target.value)}
                  className="bg-input border-input"
                />
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Target Audience (Optional)
            </h2>
            <div className="space-y-2">
              <Label htmlFor="audience">
                Job Titles, Industries, Interests
              </Label>
              <Input
                id="audience"
                placeholder="Marketing Managers, Tech Startups, Freelance Writers"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="bg-input border-input"
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="w-full max-w-md bg-input border-input text-foreground hover:bg-muted disabled:opacity-100 disabled:bg-input disabled:text-foreground/80"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2">⌛</div>
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate Research/Content
                </>
              )}
            </Button>
          </div>

          {/* Generated Content */}
          {generatedContent && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Generated Content</h2>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="min-h-[300px] resize-y bg-input border-input"
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
