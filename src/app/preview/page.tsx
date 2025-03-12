"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotification } from "@/context/NotificationContext";
import { ArrowLeft, RefreshCw, Send } from "lucide-react";
import Link from "next/link";
import { useTemplates } from "@/context/TemplateContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define a type for the template
interface Template {
  id: string;
  name: string;
  content: string;
  platform: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export default function PreviewPage() {
  const [template, setTemplate] = useState<Template | null>(null);
  const [editableContent, setEditableContent] = useState("");
  const [title, setTitle] = useState("");
  const { addNotification } = useNotification();
  const { templates } = useTemplates();

  // Determine if a template is short-form or long-form
  const isShortFormTemplate = (template: { platform: string }) => {
    // Short-form platforms: only bluesky and threads
    const shortFormPlatforms = ["bluesky", "threads"];
    return shortFormPlatforms.includes((template.platform || "").toLowerCase());
  };

  // Load template from localStorage on component mount
  useEffect(() => {
    const storedTemplate = localStorage.getItem("selectedTemplate");
    if (storedTemplate) {
      try {
        const parsedTemplate = JSON.parse(storedTemplate);
        setTemplate(parsedTemplate);
        setEditableContent(parsedTemplate.content);
        setTitle(parsedTemplate.name || "Untitled Template");
      } catch (error) {
        console.error("Error parsing template:", error);
        addNotification({
          type: "error",
          title: "Error Loading Template",
          message: "There was an error loading the selected template.",
          duration: 5000,
        });
      }
    } else {
      // If no template is found, redirect back to create page
      addNotification({
        type: "warning",
        title: "No Template Selected",
        message: "Please select a template from the templates page.",
        duration: 5000,
      });
    }
  }, [addNotification]);

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
  };

  // Handle clear content
  const handleClear = () => {
    setEditableContent("");
    addNotification({
      type: "info",
      title: "Content Cleared",
      message: "Your content has been cleared.",
      duration: 3000,
    });
  };

  // Handle save as draft
  const handleSave = () => {
    addNotification({
      type: "success",
      title: "Draft Saved",
      message: "Your content has been saved as a draft.",
      duration: 3000,
    });
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const selectedTemplate = templates.find((t) => t.id === templateId);
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
      setEditableContent(selectedTemplate.content);
      setTitle(selectedTemplate.name || "Untitled Template");

      // Remove LinkedIn branding from long-form template names
      let displayName = selectedTemplate.name;
      if (
        !isShortFormTemplate(selectedTemplate) &&
        displayName.includes("LinkedIn")
      ) {
        displayName = displayName.replace(/LinkedIn\s*/g, "").trim();
      }

      setTitle(displayName);

      addNotification({
        type: "success",
        title: "Template Applied",
        message: `The "${displayName}" template has been applied.`,
        duration: 3000,
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90">
            Long Form
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/templates">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Templates
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <textarea
              className="w-full h-[500px] p-4 border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              value={editableContent}
              onChange={handleContentChange}
              placeholder="Start writing your long-form content here..."
            />

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>

              <div className="w-full max-w-xs mx-4">
                <Select onValueChange={(value) => handleTemplateSelect(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates
                      .filter(
                        (template) =>
                          // Only include long-form templates
                          !isShortFormTemplate(template)
                      )
                      .map((template) => {
                        // Remove LinkedIn branding from long-form template names
                        // and remove "(Copy)" from template names if present
                        let displayName = template.name;
                        if (displayName.includes("LinkedIn")) {
                          displayName = displayName
                            .replace(/LinkedIn\s*/g, "")
                            .trim();
                        }
                        // Remove "(Copy)" from template names
                        displayName = displayName.replace(/\s*\(Copy\)/g, "");

                        return (
                          <SelectItem key={template.id} value={template.id}>
                            {displayName}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </Card>

          {template && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Template Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Template Name
                  </p>
                  <p className="text-foreground">
                    {template.name.includes("LinkedIn")
                      ? template.name
                          .replace(/LinkedIn\s*/g, "")
                          .trim()
                          .replace(/\s*\(Copy\)/g, "")
                      : template.name.replace(/\s*\(Copy\)/g, "")}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Platform
                  </p>
                  <Badge variant="outline">{template.platform}</Badge>
                </div>
                {template.description && (
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-foreground text-sm">
                      {template.description}
                    </p>
                  </div>
                )}
                {template.tags && template.tags.length > 0 && (
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
