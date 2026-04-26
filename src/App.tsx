import { Suspense, lazy } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

const Footer = lazy(() => import('./components/layout/Footer'));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen w-full flex-col bg-surface font-sans text-foreground">
      {/* Main App Viewport Section */}
      <div className="flex h-[100dvh] flex-col p-4 md:p-8">
        <Header toggleTheme={toggleTheme} theme={theme} />
        <Main />
      </div>

      <Suspense
        fallback={
          <div className="min-h-screen border-t border-border bg-surface" />
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
}
