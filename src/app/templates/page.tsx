"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useTemplates } from "@/context/TemplateContext";
import { Template } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useNotification } from "@/context/NotificationContext";
import TemplateEditor from "@/components/features/templates/TemplateEditor";
import {
  Pencil,
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function TemplatesPage() {
  const {
    templates,
    templateCategories,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByCategory,
  } = useTemplates();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | undefined>(
    undefined
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null
  );
  const { addNotification } = useNotification();

  // Get templates to display based on active category
  const getDisplayTemplates = () => {
    if (activeCategory === "all") {
      return templates;
    } else if (activeCategory === "linkedin" || activeCategory === "twitter") {
      return templates.filter((t) => t.platform === activeCategory);
    } else {
      return getTemplatesByCategory(activeCategory);
    }
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
  const handleSaveTemplate = (templateData: Omit<Template, "id">) => {
    if (currentTemplate) {
      // Update existing template
      updateTemplate({
        ...templateData,
        id: currentTemplate.id,
      });
      addNotification({
        type: "success",
        title: "Template Updated",
        message: `"${templateData.name}" has been updated successfully.`,
        duration: 3000,
      });
    } else {
      // Add new template
      addTemplate(templateData);
      addNotification({
        type: "success",
        title: "Template Created",
        message: `"${templateData.name}" has been created successfully.`,
        duration: 3000,
      });
    }
    setIsEditorOpen(false);
  };

  // Confirm template deletion
  const confirmDeleteTemplate = (template: Template) => {
    setTemplateToDelete(template);
    setIsDeleteDialogOpen(true);
  };

  // Handle template deletion
  const handleDeleteTemplate = () => {
    if (templateToDelete) {
      deleteTemplate(templateToDelete.id);
      addNotification({
        type: "success",
        title: "Template Deleted",
        message: `"${templateToDelete.name}" has been deleted.`,
        duration: 3000,
      });
      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  // Duplicate a template
  const handleDuplicateTemplate = (template: Template) => {
    // Create a new template without the id property
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...templateWithoutId } = template;
    addTemplate({
      ...templateWithoutId,
      name: `${template.name} (Copy)`,
      isCustom: true,
    });
    addNotification({
      type: "success",
      title: "Template Duplicated",
      message: `A copy of "${template.name}" has been created.`,
      duration: 3000,
    });
  };

  // Render platform icon
  const renderPlatformIcon = (platform: "linkedin" | "twitter") => {
    if (platform === "linkedin") {
      return <Linkedin className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    } else {
      return <Twitter className="h-4 w-4 text-sky-500 dark:text-sky-400" />;
    }
  };

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = templateCategories.find((c) => c.id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground/90 dark:text-foreground/90">
            Template Management
          </h1>
          <Button
            onClick={handleAddTemplate}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Template</span>
          </Button>
        </div>

        <Tabs
          defaultValue="all"
          value={activeCategory}
          onValueChange={setActiveCategory}
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
                value="linkedin"
                className="data-[state=active]:bg-background data-[state=active]:text-primary"
              >
                LinkedIn
              </TabsTrigger>
              <TabsTrigger
                value="twitter"
                className="data-[state=active]:bg-background data-[state=active]:text-primary"
              >
                Twitter
              </TabsTrigger>
              {templateCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-background data-[state=active]:text-primary"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent
            value={activeCategory}
            key={`template-${activeCategory}`}
            className="mt-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getDisplayTemplates().map((template) => (
                <Card
                  key={template.id}
                  className="overflow-hidden border-border bg-card dark:bg-card"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {renderPlatformIcon(template.platform)}
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleEditTemplate(template)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDuplicateTemplate(template)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Duplicate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => confirmDeleteTemplate(template)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      {template.category && (
                        <Badge variant="outline" className="mt-1">
                          {getCategoryName(template.category)}
                        </Badge>
                      )}
                      {template.isCustom && (
                        <Badge className="ml-2 mt-1 bg-primary/10 text-primary hover:bg-primary/20">
                          Custom
                        </Badge>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="border border-border rounded-md p-3 bg-background dark:bg-background max-h-32 overflow-y-auto">
                      <p className="whitespace-pre-wrap text-foreground/80 dark:text-foreground/80">
                        {template.structure}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTemplate(template)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit Template</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {getDisplayTemplates().length === 0 && (
              <div className="text-center py-12 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground mb-4">
                  No templates found in this category
                </p>
                <Button onClick={handleAddTemplate} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Template</span>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Template Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogTitle>
            {currentTemplate ? "Edit Template" : "Create New Template"}
          </DialogTitle>
          <TemplateEditor
            template={currentTemplate}
            categories={templateCategories}
            onSave={handleSaveTemplate}
            onCancel={() => setIsEditorOpen(false)}
            isEditing={!!currentTemplate}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <p className="py-4 text-foreground/80 dark:text-foreground/80">
            Are you sure you want to delete the template &quot;
            {templateToDelete?.name}&quot;? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
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
