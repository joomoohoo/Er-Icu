/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './components/Dashboard';
import SplashScreen from './components/SplashScreen';
import DisclaimerModal from './components/DisclaimerModal';
import LiveWallpaper from './components/LiveWallpaper';
import { soundService } from './services/soundService';

function AppContent() {
  const handleInteraction = () => {
    soundService.resume();
  };

  return (
    <div 
      className="min-h-screen dark bg-[#050505] text-white transition-colors duration-500"
      onClick={handleInteraction}
    >
      <LiveWallpaper />
      <SplashScreen />
      <DisclaimerModal />
      <Dashboard />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
