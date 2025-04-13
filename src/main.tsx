import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <NotificationProvider>
    <ModalProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ModalProvider>
  </NotificationProvider>,
)
