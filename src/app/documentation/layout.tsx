import MainLayout from "@/components/layout/MainLayout";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
