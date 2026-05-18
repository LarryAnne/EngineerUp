import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { FloatingAuthButton } from "@/components/FloatingAuthButton";
import { useLocation } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Something went wrong. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EngineerUp" },
      { name: "description", content: "Empowering African software engineering students with realistic motivation, practical guidance, and a supportive community." },
      { name: "author", content: "EngineerUp" },
      { property: "og:title", content: "EngineerUp" },
      { property: "og:description", content: "Engineering is Hard. Staying Motivated Shouldn't Be." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors">
          <Navbar />
          <main>
            <Outlet />
          </main>
          <ConditionalFooter />
          <BottomNav />
          <FloatingAuthButton />
          <Toaster />
        </div>
      </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function ConditionalFooter() {
  const location = useLocation();
  if (location.pathname.startsWith("/profile")) return null;
  return <Footer />;
}
