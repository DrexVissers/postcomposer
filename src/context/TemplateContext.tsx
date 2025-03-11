"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Template,
  mockTemplates,
  TemplateCategory,
  mockTemplateCategories,
} from "@/lib/mock-data";
import { v4 as uuidv4 } from "uuid";

interface TemplateContextType {
  templates: Template[];
  templateCategories: TemplateCategory[];
  addTemplate: (template: Omit<Template, "id">) => void;
  updateTemplate: (template: Template) => void;
  deleteTemplate: (templateId: string) => void;
  addTemplateCategory: (category: Omit<TemplateCategory, "id">) => void;
  updateTemplateCategory: (category: TemplateCategory) => void;
  deleteTemplateCategory: (categoryId: string) => void;
  getTemplatesByCategory: (categoryId: string) => Template[];
  getTemplatesByPlatform: (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => Template[];
}

const TemplateContext = createContext<TemplateContextType | undefined>(
  undefined
);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [templateCategories, setTemplateCategories] = useState<
    TemplateCategory[]
  >(mockTemplateCategories);

  const addTemplate = (template: Omit<Template, "id">) => {
    const newTemplate: Template = {
      ...template,
      id: `template-${uuidv4()}`,
    };
    setTemplates([...templates, newTemplate]);
  };

  const updateTemplate = (template: Template) => {
    setTemplates(templates.map((t) => (t.id === template.id ? template : t)));
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId));
  };

  const addTemplateCategory = (category: Omit<TemplateCategory, "id">) => {
    const newCategory: TemplateCategory = {
      ...category,
      id: `cat-${uuidv4()}`,
    };
    setTemplateCategories([...templateCategories, newCategory]);
  };

  const updateTemplateCategory = (category: TemplateCategory) => {
    setTemplateCategories(
      templateCategories.map((c) => (c.id === category.id ? category : c))
    );
  };

  const deleteTemplateCategory = (categoryId: string) => {
    // Don't delete if there are templates in this category
    if (templates.some((t) => t.category === categoryId)) {
      throw new Error("Cannot delete category that contains templates");
    }
    setTemplateCategories(
      templateCategories.filter((c) => c.id !== categoryId)
    );
  };

  const getTemplatesByCategory = (categoryId: string) => {
    return templates.filter((t) => t.category === categoryId);
  };

  const getTemplatesByPlatform = (
    platform: "linkedin" | "bluesky" | "threads" | "mastodon"
  ) => {
    return templates.filter((t) => t.platform === platform);
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        templateCategories,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        addTemplateCategory,
        updateTemplateCategory,
        deleteTemplateCategory,
        getTemplatesByCategory,
        getTemplatesByPlatform,
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
