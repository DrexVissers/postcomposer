"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { useTemplates } from "@/context/TemplateContext";
import { Template } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Search,
  Loader2,
  FileText,
  Mail,
  BellRing,
  BookOpen,
  Presentation,
} from "lucide-react";
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import { ThreadsIcon } from "@/components/icons/ThreadsIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { MastodonIcon } from "@/components/icons/MastodonIcon";

interface TemplateCardProps {
  category: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  templateCount?: number;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  category,
  description,
  icon,
  onClick,
  templateCount,
}) => (
  <Card
    className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors border-border cursor-pointer"
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={`View ${category} templates`}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-foreground/80 dark:text-foreground/80">
            {category}
          </CardTitle>
        </div>
        {templateCount !== undefined && (
          <span className="text-sm text-muted-foreground">
            {templateCount} template{templateCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <CardDescription className="text-muted-foreground">
        {description}
      </CardDescription>
    </CardHeader>
  </Card>
);

export default function TemplatesPage() {
  const router = useRouter();
  const { templateCategories, addTemplateCategory, getTemplatesByCategory } =
    useTemplates();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedTemplateCategory, setSelectedTemplateCategory] =
    useState<string>("");
  const [newTagName, setNewTagName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Filter categories based on search
  const filteredCategories = templateCategories.filter((category) => {
    // Apply category filter
    if (selectedCategory !== "all" && category.id !== selectedCategory)
      return false;

    // Apply search filter
    if (searchQuery) {
      const categoryMatches = category.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const templatesMatch = getTemplatesByCategory(category.id).some(
        (template) =>
          template.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return categoryMatches || templatesMatch;
    }

    return true;
  });

  // Handle template category click
  const handleTemplateCategoryClick = (categoryId: string) => {
    setSelectedTemplateCategory(categoryId);
    setIsPreviewModalOpen(true);
  };

  // Handle use template
  const handleUseTemplate = async (template: Template) => {
    setIsLoading(true);
    try {
      // Redirect to Composer Studio with template data
      router.push(`/composer?templateId=${template.id}`);
      setIsPreviewModalOpen(false);
      toast.success("Template selected", {
        description: "Opening template in Composer Studio...",
      });
    } catch {
      toast.error("Failed to load template");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) {
      toast.error("Tag name is required");
      return;
    }
    setIsLoading(true);
    try {
      // Add tag creation logic here
      toast.success("Tag created successfully");
      setNewTagName("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create tag";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle create category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }
    setIsLoading(true);
    try {
      await addTemplateCategory({
        name: newCategoryName,
        description: newCategoryDescription,
      });
      toast.success("Category created successfully");
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create category";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateIcon = (categoryId: string) => {
    switch (categoryId.toLowerCase()) {
      case "linkedin":
        return <LinkedInIcon className="h-5 w-5 text-[#0A66C2]" />;
      case "threads":
        return <ThreadsIcon className="h-5 w-5 dark:text-white text-black" />;
      case "bluesky":
        return <BlueskyIcon className="h-5 w-5 text-[#0560FF]" />;
      case "mastodon":
        return <MastodonIcon className="h-5 w-5 text-[#6364FF]" />;
      case "blog":
        return <FileText className="h-5 w-5 text-emerald-500" />;
      case "newsletter":
        return <Mail className="h-5 w-5 text-amber-500" />;
      case "announcement":
        return <BellRing className="h-5 w-5 text-purple-500" />;
      case "documentation":
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case "presentation":
        return <Presentation className="h-5 w-5 text-pink-500" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const selectedTemplateDetails = templateCategories.find(
    (c) => c.id === selectedTemplateCategory
  );
  const selectedTemplates = selectedTemplateCategory
    ? getTemplatesByCategory(selectedTemplateCategory)
    : [];

  return (
    <MainLayout>
      <div className="container mx-auto p-6 mt-16">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Templates</h1>
            <Button>Create Template</Button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors border-border"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </Button>
              )}
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px] bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-input border-border">
                <SelectItem value="all">All Categories</SelectItem>
                {templateCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <TemplateCard
              key={category.id}
              category={category.name}
              description={category.description || ""}
              icon={getTemplateIcon(category.id)}
              onClick={() => handleTemplateCategoryClick(category.id)}
              templateCount={getTemplatesByCategory(category.id).length}
            />
          ))}
        </div>

        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col bg-input text-foreground/80 dark:text-foreground/80">
            <DialogHeader>
              <DialogTitle className="text-foreground/80 dark:text-foreground/80">
                {selectedTemplateDetails?.name || ""} Templates
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="flex flex-col bg-input hover:bg-muted/80 dark:hover:bg-background/80 transition-colors border-border"
                  >
                    <CardHeader>
                      <CardTitle className="text-foreground/80 dark:text-foreground/80">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        {template.content}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleUseTemplate(template)}
                        disabled={isLoading}
                        className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 text-foreground/80 dark:text-foreground/80 border-border"
                      >
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 text-foreground/80 dark:text-foreground/80 border-border"
                >
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewCategoryName("");
                      setNewCategoryDescription("");
                      handleCreateCategory();
                    }}
                    disabled={isLoading}
                    className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 text-foreground/80 dark:text-foreground/80 border-border"
                  >
                    Create Category
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewTagName("");
                      handleCreateTag();
                    }}
                    disabled={isLoading}
                    className="bg-input hover:bg-muted/80 dark:hover:bg-background/80 text-foreground/80 dark:text-foreground/80 border-border"
                  >
                    Create Tag
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
