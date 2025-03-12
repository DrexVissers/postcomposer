import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional class names", () => {
    const condition = true;
    expect(cn("base", condition && "active")).toBe("base active");
    expect(cn("base", !condition && "inactive")).toBe("base");
  });

  it("handles array of class names", () => {
    expect(cn(["class1", "class2"])).toBe("class1 class2");
  });

  it("handles objects with boolean values", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("handles undefined and null values", () => {
    expect(cn("base", undefined, null, "active")).toBe("base active");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("p-4 bg-red-500", "p-8")).toBe("bg-red-500 p-8");
    expect(cn("text-sm font-bold", "text-lg")).toBe("font-bold text-lg");
  });

  it("handles complex combinations", () => {
    const isActive = true;
    const isDisabled = false;

    // Using direct object instead of comparisons
    const sizeClasses = {
      "size-lg": true,
      "size-md": false,
      "size-sm": false,
    };

    const result = cn(
      "base-class",
      isActive && "active",
      isDisabled && "disabled",
      sizeClasses
    );

    expect(result).toBe("base-class active size-lg");
  });
});
