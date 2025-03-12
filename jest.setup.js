// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
    query: {},
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
    themes: ["light", "dark", "system"],
  }),
}));

// Mock clerk
jest.mock("@clerk/nextjs", () => ({
  auth: () => ({ userId: "test-user-id" }),
  currentUser: () => ({
    id: "test-user-id",
    firstName: "Test",
    lastName: "User",
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: true,
    userId: "test-user-id",
  }),
  useUser: () => ({
    isLoaded: true,
    isSignedIn: true,
    user: { id: "test-user-id", firstName: "Test", lastName: "User" },
  }),
  ClerkProvider: ({ children }) => children,
  SignIn: () => "<div>Sign In</div>",
  SignUp: () => "<div>Sign Up</div>",
  SignedIn: ({ children }) => children,
  SignedOut: () => null,
  UserButton: () => "<div>User Button</div>",
}));
