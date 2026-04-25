import { Suspense, lazy } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import Main from './components/layout/Main';

const Footer = lazy(() => import('./components/layout/Footer'));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto bg-surface p-4 font-sans text-foreground md:p-8">
      <Header toggleTheme={toggleTheme} theme={theme} />

      <Main />

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
