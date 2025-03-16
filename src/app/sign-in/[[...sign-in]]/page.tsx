import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-theme";
import SignInWrapper from "@/components/auth/SignInWrapper";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">PostComposer</h1>
        <p className="mt-2 text-muted-foreground">Sign in to your account</p>
      </div>
      <SignInWrapper>
        <SignIn appearance={clerkAppearance} />
      </SignInWrapper>
    </div>
  );
}
