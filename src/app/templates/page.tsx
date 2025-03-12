"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useTemplates } from "@/context/TemplateContext";
import { Template } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import TemplateEditor from "@/components/features/templates/TemplateEditor";
import {
  Pencil,
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  Twitter as BlueskyIcon,
  Linkedin,
  Instagram,
  Globe,
  Loader2,
  RefreshCw,
  MessageSquare,
  FileText,
} from "lucide-react";

export default function TemplatesPage() {
  const {
    templates,
    templateCategories,
    loading,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    refreshTemplates,
    refreshCategories,
  } = useTemplates();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | undefined>(
    undefined
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Determine if a template is short-form or long-form
  const isShortFormTemplate = (template: { platform: string }) => {
    // Short-form platforms: only bluesky and threads
    const shortFormPlatforms = ["bluesky", "threads"];
    return shortFormPlatforms.includes((template.platform || "").toLowerCase());
  };

  // Get custom templates (only long-form custom templates)
  const getCustomTemplates = () => {
    return templates.filter((t) => t.isCustom && !isShortFormTemplate(t));
  };

  // Get short-form templates (including custom short-form templates)
  const getShortFormTemplates = () => {
    return templates.filter((t) => isShortFormTemplate(t));
  };

  // Get long-form templates (only default long-form templates)
  const getLongFormTemplates = () => {
    return templates.filter((t) => !t.isCustom && !isShortFormTemplate(t));
  };

  // Open editor for new template
  const handleAddTemplate = () => {
    setCurrentTemplate(undefined);
    setIsEditorOpen(true);
  };

  // Open editor for existing template
  const handleEditTemplate = (template: Template) => {
    setCurrentTemplate(template);
    setIsEditorOpen(true);
  };

  // Handle template save
  const handleSaveTemplate = async (templateData: Omit<Template, "id">) => {
    try {
      if (currentTemplate) {
        // Update existing template
        await updateTemplate({
          ...templateData,
          id: currentTemplate.id,
        });
        toast.success("Template Updated", {
          description: `"${templateData.name}" has been updated successfully.`,
          duration: 3000,
        });
      } else {
        // Add new template
        await addTemplate(templateData);
        toast.success("Template Created", {
          description: `"${templateData.name}" has been created successfully.`,
          duration: 3000,
        });
      }
      setIsEditorOpen(false);
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
        duration: 5000,
      });
    }
  };

  // Confirm template deletion
  const confirmDeleteTemplate = (template: Template) => {
    setTemplateToDelete(template);
    setIsDeleteDialogOpen(true);
  };

  // Handle template deletion
  const handleDeleteTemplate = async () => {
    if (templateToDelete) {
      try {
        await deleteTemplate(templateToDelete.id);
        toast.success("Template Deleted", {
          description: `"${templateToDelete.name}" has been deleted.`,
          duration: 3000,
        });
        setIsDeleteDialogOpen(false);
        setTemplateToDelete(null);
      } catch (error) {
        toast.error("Error", {
          description:
            error instanceof Error
              ? error.message
              : "Failed to delete template. Please try again.",
          duration: 5000,
        });
      }
    }
  };

  // Duplicate a template
  const handleDuplicateTemplate = async (template: Template) => {
    try {
      // Create a new template without the id property
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...templateWithoutId } = template;
      await addTemplate({
        ...templateWithoutId,
        name: `${template.name} (Copy)`,
        isCustom: true,
      });
      toast.success("Template Duplicated", {
        description: `A copy of "${template.name}" has been created.`,
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to duplicate template. Please try again.",
        duration: 5000,
      });
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refreshTemplates(), refreshCategories()]);
      toast.success("Refreshed", {
        description: "Templates and categories have been refreshed.",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to refresh data. Please try again.",
        duration: 5000,
      });
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Render platform icon
  const renderPlatformIcon = (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    const platformLower = platform.toLowerCase();
    if (platformLower === "linkedin") {
      return <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    } else if (platformLower === "bluesky") {
      return <BlueskyIcon className="h-4 w-4 text-sky-500 dark:text-sky-400" />;
    } else if (platformLower === "threads") {
      return (
        <Instagram className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      );
    } else {
      return <Globe className="h-4 w-4 text-teal-500 dark:text-teal-400" />;
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = templateCategories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  // Render template card
  const renderTemplateCard = (template: Template) => {
    // Remove LinkedIn branding from long-form template names
    let displayName = template.name;
    if (!isShortFormTemplate(template) && displayName.includes("LinkedIn")) {
      displayName = displayName.replace(/LinkedIn\s*/g, "").trim();
    }

    return (
      <Card
        key={template.id}
        className="overflow-hidden border border-border hover:shadow-md transition-shadow"
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {isShortFormTemplate(template) &&
                renderPlatformIcon(
                  template.platform.toLowerCase() as
                    | "linkedin"
                    | "bluesky"
                    | "threads"
                    | "mastodon"
                )}
              <CardTitle className="text-lg">{displayName}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  aria-label="More options"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => confirmDeleteTemplate(template)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {template.category && (
            <Badge variant="outline" className="mt-1 text-xs font-normal">
              {getCategoryName(template.category)}
            </Badge>
          )}
          <CardDescription className="mt-2 line-clamp-2">
            {template.description || "No description provided"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {template.content || "No content"}
          </p>
        </CardContent>
        <CardFooter className="pt-2 flex justify-between">
          <div className="flex gap-1">
            {template.tags &&
              template.tags.slice(0, 3).map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
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
            variant="ghost"
            size="sm"
            onClick={() => handleEditTemplate(template)}
          >
            <Pencil className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90">
            Templates
          </h1>
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>

        <div className="flex justify-center my-8">
          <Button
            onClick={handleAddTemplate}
            className="flex items-center gap-2 px-8 py-6 text-lg"
            size="lg"
          >
            <Plus className="h-5 w-5" />
            <span>Create Template</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Custom Templates Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                My Custom Long Form Templates
              </CardTitle>
              <CardDescription>
                Long form templates you&apos;ve created or customized
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : getCustomTemplates().length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground mb-4">
                    No custom long form templates yet
                  </p>
                  <Button
                    onClick={handleAddTemplate}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first template
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {getCustomTemplates().map(renderTemplateCard)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Short Form Templates Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Short Form Templates
              </CardTitle>
              <CardDescription>
                All short form templates for social media posts (including
                custom)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : getShortFormTemplates().length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    No short form templates available
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {getShortFormTemplates().map(renderTemplateCard)}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Long Form Templates Card */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Default Long Form Templates
              </CardTitle>
              <CardDescription>
                Pre-made templates for articles, newsletters, and detailed
                content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : getLongFormTemplates().length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <p className="text-muted-foreground">
                    No long form templates available
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {getLongFormTemplates().map(renderTemplateCard)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Template Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background text-foreground">
          <DialogTitle>
            {currentTemplate ? "Edit Template" : "Create Template"}
          </DialogTitle>
          <TemplateEditor
            template={currentTemplate}
            onSave={handleSaveTemplate}
            onCancel={() => setIsEditorOpen(false)}
            categories={templateCategories}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-background text-foreground">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p className="py-4">
            Are you sure you want to delete the template &quot;
            {templateToDelete?.name}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTemplate}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
