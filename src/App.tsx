import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ConversationsPages.tsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import type {JSX} from "react";

function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
        />

        <Route path="*" element={<Navigate to="/chat" />} />
      </Routes>
  );
}

export default function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
  );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}