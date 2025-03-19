"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Template, TemplateCategory } from "@/lib/mock-data";
import { socialMediaTemplates } from "@/lib/default-templates";

interface TemplateContextType {
  templates: Template[];
  templateCategories: TemplateCategory[];
  loading: boolean;
  addTemplate: (template: Omit<Template, "id">) => Promise<void>;
  updateTemplate: (template: Template) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  addTemplateCategory: (
    category: Omit<TemplateCategory, "id">
  ) => Promise<TemplateCategory>;
  updateTemplateCategory: (
    category: TemplateCategory
  ) => Promise<TemplateCategory>;
  deleteTemplateCategory: (categoryId: string) => Promise<void>;
  getTemplatesByCategory: (categoryId: string) => Template[];
  refreshTemplates: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

// Create default categories for social media platforms
const defaultCategories: TemplateCategory[] = [
  {
    id: "linkedin",
    name: "LinkedIn Templates",
    description:
      "Professional templates optimized for LinkedIn posts and articles",
  },
  {
    id: "threads",
    name: "Threads Templates",
    description: "Engaging templates for Threads discussions and updates",
  },
  {
    id: "bluesky",
    name: "Bluesky Templates",
    description: "Templates designed for Bluesky's unique features",
  },
  {
    id: "mastodon",
    name: "Mastodon Templates",
    description: "Templates for Mastodon posts and interactions",
  },
];

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateCategories, setTemplateCategories] = useState<
    TemplateCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch templates and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([refreshTemplates(), refreshCategories()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fetch templates from API
  const refreshTemplates = async () => {
    try {
      const response = await fetch("/api/templates");
      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }
      const data = await response.json();
      // Combine API templates with default social media templates
      setTemplates([...data.templates, ...socialMediaTemplates]);
    } catch (error) {
      console.error("Error fetching templates:", error);
      // If API fails, at least show default templates
      setTemplates(socialMediaTemplates);
    }
  };

  // Fetch categories from API
  const refreshCategories = async () => {
    try {
      const response = await fetch("/api/template-categories");
      if (!response.ok) {
        throw new Error("Failed to fetch template categories");
      }
      const data = await response.json();
      // Combine API categories with default social media categories
      setTemplateCategories([...data.categories, ...defaultCategories]);
    } catch (error) {
      console.error("Error fetching template categories:", error);
      // If API fails, at least show default categories
      setTemplateCategories(defaultCategories);
    }
  };

  const addTemplate = async (template: Omit<Template, "id">) => {
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create template");
      }

      const data = await response.json();
      setTemplates([...templates, data.template]);
      return data.template;
    } catch (error) {
      console.error("Error adding template:", error);
      throw error;
    }
  };

  const updateTemplate = async (template: Template) => {
    try {
      const response = await fetch("/api/templates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update template");
      }

      const data = await response.json();
      setTemplates(
        templates.map((t) => (t.id === template.id ? data.template : t))
      );
      return data.template;
    } catch (error) {
      console.error("Error updating template:", error);
      throw error;
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/templates?id=${templateId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete template");
      }

      setTemplates(templates.filter((t) => t.id !== templateId));
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  };

  const addTemplateCategory = async (
    category: Omit<TemplateCategory, "id">
  ): Promise<TemplateCategory> => {
    try {
      const response = await fetch("/api/template-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      const data = await response.json();
      setTemplateCategories([...templateCategories, data.category]);
      return data.category;
    } catch (error) {
      console.error("Error adding template category:", error);
      throw error;
    }
  };

  const updateTemplateCategory = async (
    category: TemplateCategory
  ): Promise<TemplateCategory> => {
    try {
      const response = await fetch("/api/template-categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update category");
      }

      const data = await response.json();
      setTemplateCategories(
        templateCategories.map((c) =>
          c.id === category.id ? data.category : c
        )
      );
      return data.category;
    } catch (error) {
      console.error("Error updating template category:", error);
      throw error;
    }
  };

  const deleteTemplateCategory = async (categoryId: string) => {
    try {
      // Don't delete if there are templates in this category
      if (templates.some((t) => t.category === categoryId)) {
        throw new Error("Cannot delete category that contains templates");
      }

      const response = await fetch(
        `/api/template-categories?id=${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete category");
      }

      setTemplateCategories(
        templateCategories.filter((c) => c.id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting template category:", error);
      throw error;
    }
  };

  const getTemplatesByCategory = (categoryId: string) => {
    return templates.filter((t) => t.category === categoryId);
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        templateCategories,
        loading,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        addTemplateCategory,
        updateTemplateCategory,
        deleteTemplateCategory,
        getTemplatesByCategory,
        refreshTemplates,
        refreshCategories,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplates must be used within a TemplateProvider");
  }
  return context;
}

export type TemplateFormValues = {
  id?: string;
  name: string;
  description: string;
  content: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  isDefault: boolean;
  tags: string[];
};

export type TemplateWithStats = {
  id: string;
  name: string;
  description: string;
  content: string;
  platform: "linkedin" | "bluesky" | "threads" | "mastodon";
  isDefault: boolean;
  tags: string[];
  usageCount: number;
  createdAt: string;
  updatedAt: string;
};
