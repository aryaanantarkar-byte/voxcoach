import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TopicSelectPage } from './pages/TopicSelectPage';
import { PreparationPage } from './pages/PreparationPage';
import { PracticeRoomPage } from './pages/PracticeRoomPage';
import { AnalysisReportPage } from './pages/AnalysisReportPage';
import { ProgressHistoryPage } from './pages/ProgressHistoryPage';
import { AsciiDemoPage } from './pages/AsciiDemoPage';

export const App: React.FC = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <div className="neo-app min-h-screen text-[#191717] flex flex-col justify-between font-sans">
          {/* Persistent Minimalist Navigation Bar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/topics" element={<TopicSelectPage />} />
              <Route path="/prep" element={<PreparationPage />} />
              <Route path="/practice" element={<PracticeRoomPage />} />
              <Route path="/results" element={<AnalysisReportPage />} />
              <Route path="/progress" element={<ProgressHistoryPage />} />
              <Route path="/ascii" element={<AsciiDemoPage />} />
              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
