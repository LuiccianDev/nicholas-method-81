import { Suspense, lazy } from 'react';
import { useTheme } from './state/theme';
import { NicholasProvider } from './state/calculator';
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import ChatBot from './components/chat/ChatBot';

const Footer = lazy(() => import('./components/layout/Footer'));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <NicholasProvider>
      <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-surface font-sans text-foreground">
        <div className="mx-auto flex w-full max-w-400 flex-1 flex-col px-4 py-4 md:px-8 md:py-6">
          <Header toggleTheme={toggleTheme} theme={theme} />
          <Main />
        </div>

        <Suspense
          fallback={
            <div className="min-h-dvh border-t border-border bg-surface" />
          }
        >
          <Footer />
        </Suspense>

        <ChatBot />
      </div>
    </NicholasProvider>
  );
}
