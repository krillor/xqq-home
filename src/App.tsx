import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import PublishPage from './pages/PublishPage';
import ProfilePage from './pages/ProfilePage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import VolunteerPage from './pages/VolunteerPage';
import PostDetailPage from './pages/PostDetailPage';
import VolunteerListPage from './pages/VolunteerListPage';
import VolunteerProfilePage from './pages/VolunteerProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AssociationsPage from './pages/AssociationsPage';
import PersonalCenter from './pages/PersonalCenter';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/role-selection" element={<RoleSelectionPage />} />
          <Route path="/publish" element={<Navigate to="/personal?tab=archive" replace />} />
          <Route path="/personal" element={<PersonalCenter />} />
          <Route path="/parser" element={<Navigate to="/" replace />} />
          <Route path="/volunteer" element={<Navigate to="/personal?tab=volunteer" replace />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/detail/:id" element={<PostDetailPage />} />
          <Route path="/volunteers" element={<VolunteerListPage />} />
          <Route path="/volunteer/:id" element={<VolunteerProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/associations" element={<AssociationsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
