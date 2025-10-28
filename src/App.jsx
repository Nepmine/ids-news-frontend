import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Trending } from './pages/Trending';
import { WeeklyArticle } from './pages/WeeklyArticle';
import { PostDetailsPage } from './pages/PostDetails';
import { MyPosts } from './pages/MyPosts';
import { LikedPosts } from './pages/LikedPosts';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/weeklyArticle" element={<WeeklyArticle />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/liked" element={<LikedPosts />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}