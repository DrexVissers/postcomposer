"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Linkedin,
  Twitter as BlueskyIcon,
  Instagram,
  Globe,
  Copy,
  FileText,
  Mail,
  Newspaper,
  Video,
  Sparkles,
  MessageSquare,
  FileText as DocumentIcon,
} from "lucide-react";
import {
  templateCategories,
  emailTemplates,
  newsletterTemplates,
  blogPostTemplates,
  contentOutlineTemplates,
  scriptTemplates,
  blueskyTemplates,
  threadsTemplates,
} from "@/lib/premade-templates";
import { SeedTemplatesButton } from "./SeedTemplatesButton";
import { Template } from "@/lib/mock-data";

interface PremadeTemplatesShowcaseProps {
  onDuplicate: (template: Template) => void;
  existingTemplates: Template[];
}

export function PremadeTemplatesShowcase({
  onDuplicate,
  existingTemplates,
}: PremadeTemplatesShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Determine if a template is short-form or long-form
  const isShortFormTemplate = (template: { platform: string }) => {
    // Short-form platforms: only bluesky and threads
    return ["bluesky", "threads"].includes(template.platform.toLowerCase());
  };

  // Determine if a template is platform-specific
  const isPlatformSpecific = (template: { platform: string }) => {
    // Platform-specific templates: only bluesky and threads
    return ["bluesky", "threads"].includes(template.platform.toLowerCase());
  };

  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Email Templates":
        return <Mail className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      case "Newsletter Templates":
        return (
          <Newspaper className="h-5 w-5 text-green-500 dark:text-green-400" />
        );
      case "Blog Post Templates":
        return (
          <FileText className="h-5 w-5 text-purple-500 dark:text-purple-400" />
        );
      case "Content Outlines":
        return (
          <FileText className="h-5 w-5 text-amber-500 dark:text-amber-400" />
        );
      case "Script Templates":
        return <Video className="h-5 w-5 text-red-500 dark:text-red-400" />;
      default:
        return (
          <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        );
    }
  };

  // Render platform icon
  const renderPlatformIcon = (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    if (platform === "linkedin") {
      return <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    } else if (platform === "bluesky") {
      return <BlueskyIcon className="h-4 w-4 text-sky-500 dark:text-sky-400" />;
    } else if (platform === "threads") {
      return (
        <Instagram className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      );
    } else {
      return <Globe className="h-4 w-4 text-teal-500 dark:text-teal-400" />;
    }
  };

  // Get templates to display based on active category
  const getDisplayTemplates = () => {
    let templates = [];

    switch (activeCategory) {
      case "email":
        templates = emailTemplates;
        break;
      case "newsletter":
        templates = newsletterTemplates;
        break;
      case "blog":
        templates = blogPostTemplates;
        break;
      case "outline":
        templates = contentOutlineTemplates;
        break;
      case "script":
        templates = scriptTemplates;
        break;
      case "bluesky":
        templates = blueskyTemplates;
        break;
      case "threads":
        templates = threadsTemplates;
        break;
      case "short-form":
        templates = [
          ...emailTemplates,
          ...newsletterTemplates,
          ...blogPostTemplates,
          ...contentOutlineTemplates,
          ...scriptTemplates,
          ...blueskyTemplates,
          ...threadsTemplates,
        ].filter(isShortFormTemplate);
        break;
      case "long-form":
        templates = [
          ...emailTemplates,
          ...newsletterTemplates,
          ...blogPostTemplates,
          ...contentOutlineTemplates,
          ...scriptTemplates,
          ...blueskyTemplates,
          ...threadsTemplates,
        ].filter((template) => !isShortFormTemplate(template));
        break;
      default:
        templates = [
          ...emailTemplates,
          ...newsletterTemplates,
          ...blogPostTemplates,
          ...contentOutlineTemplates,
          ...scriptTemplates,
          ...blueskyTemplates,
          ...threadsTemplates,
        ];
    }

    return templates;
  };

  // Check if template already exists in user's templates
  const isTemplateAdded = (templateName: string) => {
    return existingTemplates.some((t) => t.name === templateName);
  };

  return (
    <div className="mt-8 mb-12 bg-gradient-to-b from-background to-muted/20 rounded-lg p-6 border border-border/50">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-bold text-foreground/90">
            Premade Templates
          </h2>
          <Badge variant="outline" className="ml-2">
            {getDisplayTemplates().length} templates
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground hidden md:block">
            Add all templates to your collection with one click
          </p>
          <SeedTemplatesButton />
        </div>
      </div>

      <p className="text-muted-foreground mb-6">
        Professional templates for emails, newsletters, blog posts, content
        outlines, and scripts. Click &quot;Add to My Templates&quot; to use any
        template.
      </p>

      <Tabs
        defaultValue="all"
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <div className="border-b border-border mb-6">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              All Templates
            </TabsTrigger>

            <TabsTrigger
              value="short-form"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <MessageSquare className="h-4 w-4 mr-2 text-sky-500" />
              Short-Form Content
            </TabsTrigger>

            <TabsTrigger
              value="long-form"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <DocumentIcon className="h-4 w-4 mr-2 text-indigo-500" />
              Long-Form Content
            </TabsTrigger>

            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <Mail className="h-4 w-4 mr-2 text-blue-500" />
              Email
            </TabsTrigger>
            <TabsTrigger
              value="newsletter"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <Newspaper className="h-4 w-4 mr-2 text-green-500" />
              Newsletter
            </TabsTrigger>
            <TabsTrigger
              value="blog"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <FileText className="h-4 w-4 mr-2 text-purple-500" />
              Blog Post
            </TabsTrigger>
            <TabsTrigger
              value="outline"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <FileText className="h-4 w-4 mr-2 text-amber-500" />
              Content Outline
            </TabsTrigger>
            <TabsTrigger
              value="script"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <Video className="h-4 w-4 mr-2 text-red-500" />
              Script
            </TabsTrigger>
            <TabsTrigger
              value="bluesky"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <BlueskyIcon className="h-4 w-4 mr-2 text-sky-500" />
              Bluesky
            </TabsTrigger>
            <TabsTrigger
              value="threads"
              className="data-[state=active]:bg-background data-[state=active]:text-primary"
            >
              <Instagram className="h-4 w-4 mr-2 text-purple-600" />
              Threads
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getDisplayTemplates().map((template) => {
              const categoryName =
                templateCategories.find((cat) => cat.id === template.category)
                  ?.name || "Uncategorized";

              const isAdded = isTemplateAdded(template.name);
              const isShortForm = isShortFormTemplate(template);
              const isPlatform = isPlatformSpecific(template);

              return (
                <Card
                  key={template.id}
                  className={`overflow-hidden border border-border hover:shadow-md transition-shadow ${
                    isAdded ? "bg-muted/30" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {renderPlatformIcon(
                          template.platform as
                            | "linkedin"
                            | "bluesky"
                            | "threads"
                            | "mastodon"
                        )}
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                      </div>
                      {getCategoryIcon(categoryName)}
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {categoryName}
                      </Badge>
                      {isPlatform ? (
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          Platform-Specific
                        </Badge>
                      ) : (
                        <Badge
                          variant={isShortForm ? "secondary" : "default"}
                          className="text-xs font-normal"
                        >
                          {isShortForm ? "Short-Form" : "Long-Form"}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">
                      {template.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="bg-muted/50 p-3 rounded-md max-h-24 overflow-hidden relative">
                      <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-4">
                        {template.content.substring(0, 200)}...
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/80 to-transparent"></div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 flex justify-between">
                    <div className="flex gap-1 flex-wrap">
                      {template.tags &&
                        template.tags.slice(0, 3).map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      {template.tags && template.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant={isAdded ? "outline" : "default"}
                      size="sm"
                      onClick={() => onDuplicate(template as Template)}
                      disabled={isAdded}
                      className={isAdded ? "opacity-50" : ""}
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      {isAdded ? "Added" : "Add to My Templates"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
