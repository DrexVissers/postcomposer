"use client";

import { useState } from "react";
import { Template, TemplateCategory } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Linkedin, Twitter, Instagram, Globe, Plus } from "lucide-react";
import { useTemplates } from "@/context/TemplateContext";

// Template name suggestions based on platform
const TEMPLATE_NAME_SUGGESTIONS = {
  linkedin: [
    "Professional Announcement",
    "Job Update",
    "Industry Insight",
    "Company News",
    "Thought Leadership",
    "Career Milestone",
  ],
  bluesky: [
    "Quick Update",
    "Hot Take",
    "News Commentary",
    "Personal Milestone",
    "Question Thread",
    "Daily Thought",
  ],
  threads: [
    "Thread Starter",
    "Story Time",
    "Step-by-Step Guide",
    "Multi-part Announcement",
    "Deep Dive",
    "Series Kickoff",
  ],
  mastodon: [
    "Community Update",
    "Open Source News",
    "Tech Commentary",
    "Privacy Focused",
    "Federated Discussion",
    "Niche Interest",
  ],
};

interface TemplateEditorProps {
  template?: Template;
  categories: TemplateCategory[];
  onSave: (template: Omit<Template, "id">) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function TemplateEditor({
  template,
  categories,
  onSave,
  onCancel,
  isEditing = false,
}: TemplateEditorProps) {
  const { addTemplateCategory } = useTemplates();
  const [name, setName] = useState(template?.name || "");
  const [platform, setPlatform] = useState<
    "linkedin" | "bluesky" | "threads" | "mastodon"
  >(template?.platform || "linkedin");
  const [structure, setStructure] = useState(template?.structure || "");
  const [category, setCategory] = useState(template?.category || "");
  const [isCustom] = useState(template?.isCustom || true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

  // Get template name suggestions for current platform
  const getNameSuggestions = () => {
    return TEMPLATE_NAME_SUGGESTIONS[platform] || [];
  };

  // Handle platform change
  const handlePlatformChange = (
    value: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    setPlatform(value);
    // Reset name if it's one of the suggestions from the previous platform
    const currentSuggestions = TEMPLATE_NAME_SUGGESTIONS[platform] || [];
    if (currentSuggestions.includes(name)) {
      setName("");
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Template name is required";
    }

    if (!structure.trim()) {
      newErrors.structure = "Template structure is required";
    } else if (!structure.includes("[") || !structure.includes("]")) {
      newErrors.structure =
        "Template should include at least one placeholder [LIKE_THIS]";
    }

    // Only validate category if there are categories to select from
    if (categories.length > 0 && !category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Validation Error", {
        description: "Please fix the errors in the form",
        duration: 5000,
      });
      return;
    }

    onSave({
      name,
      platform,
      structure,
      category,
      isCustom,
    });
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setIsSubmittingCategory(true);
    try {
      // Call the API to create a new category
      const newCategory = await addTemplateCategory({
        name: newCategoryName,
        description: `Created from template editor on ${new Date().toLocaleDateString()}`,
      });

      toast.success("Category created", {
        description: `New category "${newCategoryName}" has been created`,
      });

      // Set the new category as the selected one
      setCategory(newCategory.id);
      setIsAddingCategory(false);
      setNewCategoryName("");
    } catch (error) {
      toast.error("Failed to create category", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setIsSubmittingCategory(false);
    }
  };

  // Preview section with placeholder highlighting
  const renderPreview = () => {
    if (!structure)
      return <p className="text-gray-400">No content to preview</p>;

    // Highlight placeholders
    const parts = structure.split(/(\[[^\]]+\])/g);

    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.match(/^\[[^\]]+\]$/)) {
            return (
              <span
                key={index}
                className="bg-primary/20 text-primary px-1 rounded"
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="template-name">Template Name</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="template-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Professional Announcement"
                  className={errors.name ? "border-red-500" : ""}
                />
              </div>
              <Select value={name} onValueChange={setName}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Suggestions" />
                </SelectTrigger>
                <SelectContent>
                  {getNameSuggestions().map((suggestion) => (
                    <SelectItem key={suggestion} value={suggestion}>
                      {suggestion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="template-platform">Platform</Label>
            <Select value={platform} onValueChange={handlePlatformChange}>
              <SelectTrigger id="template-platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin" className="flex items-center">
                  <div className="flex items-center">
                    <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                    LinkedIn
                  </div>
                </SelectItem>
                <SelectItem value="bluesky" className="flex items-center">
                  <div className="flex items-center">
                    <Twitter className="h-4 w-4 mr-2 text-sky-500" />
                    Bluesky
                  </div>
                </SelectItem>
                <SelectItem value="threads" className="flex items-center">
                  <div className="flex items-center">
                    <Instagram className="h-4 w-4 mr-2 text-purple-600" />
                    Threads
                  </div>
                </SelectItem>
                <SelectItem value="mastodon" className="flex items-center">
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2 text-teal-500" />
                    Mastodon
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="template-category">Category</Label>
            <div className="flex gap-2">
              <div className="flex-1">
                {categories.length > 0 ? (
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger
                      id="template-category"
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    disabled
                    placeholder="No categories available"
                    className="w-full"
                  />
                )}
              </div>
              <Popover
                open={isAddingCategory}
                onOpenChange={setIsAddingCategory}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Add New Category</h4>
                    <div className="space-y-2">
                      <Label htmlFor="new-category">Category Name</Label>
                      <Input
                        id="new-category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="E.g., Marketing, Technical, Announcements"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingCategory(false)}
                        disabled={isSubmittingCategory}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddCategory}
                        disabled={isSubmittingCategory}
                      >
                        {isSubmittingCategory ? (
                          <>
                            <span className="mr-2">Creating...</span>
                            <span className="animate-spin">⏳</span>
                          </>
                        ) : (
                          "Add Category"
                        )}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <Label htmlFor="template-structure">
              Template Structure
              <span className="text-sm text-muted-foreground ml-2">
                (Use [PLACEHOLDER] for dynamic content)
              </span>
            </Label>
            <textarea
              id="template-structure"
              value={structure}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setStructure(e.target.value)
              }
              placeholder="I'm excited to share that [MAIN_POINT]. This represents [SIGNIFICANCE]. #[HASHTAG1] #[HASHTAG2]"
              className={`min-h-[200px] w-full p-4 border border-border bg-background text-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.structure ? "border-red-500" : ""
              }`}
            />
            {errors.structure && (
              <p className="text-red-500 text-sm mt-1">{errors.structure}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Update Template" : "Save Template"}
            </Button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <Label>Preview</Label>
          <div className="border border-gray-200 rounded-lg p-4 min-h-[200px] bg-gray-50">
            {renderPreview()}
          </div>

          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Placeholder Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
              <li>Use square brackets for placeholders: [LIKE_THIS]</li>
              <li>Be descriptive with placeholder names</li>
              <li>
                Common placeholders: [MAIN_POINT], [DETAIL], [CALL_TO_ACTION]
              </li>
              <li>For hashtags: [HASHTAG1], [HASHTAG2]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
