import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './Topbar';
import { Webchat, WebchatProvider, Fab } from '@botpress/webchat';

export function AppLayout() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || "b20c8bae-b7b0-48ab-b797-ac9a93a6578f";

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <WebchatProvider clientId={clientId}>
        <div style={{ 
          display: isWebchatOpen ? 'block' : 'none',
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '400px',
          height: '600px',
          maxWidth: 'calc(100vw - 40px)',
          maxHeight: 'calc(100vh - 120px)',
          zIndex: 9999,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        }}>
          <Webchat clientId={clientId} style={{ width: '100%', height: '100%', border: 'none' }} />
        </div>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, width: '48px', height: '48px' }}>
          <Fab 
            onClick={() => setIsWebchatOpen(!isWebchatOpen)} 
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </WebchatProvider>
    </div>
  );
}

