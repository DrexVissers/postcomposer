import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-theme";
import SignUpWrapper from "@/components/auth/SignUpWrapper";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">SocialSphere</h1>
        <p className="mt-2 text-muted-foreground">Create your account</p>
      </div>
      <SignUpWrapper>
        <SignUp appearance={clerkAppearance} />
      </SignUpWrapper>
    </div>
  );
}
