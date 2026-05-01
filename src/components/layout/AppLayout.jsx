import React from 'react';
import { Outlet } from 'react-router-dom';
import GlassHeader from '../navigation/GlassHeader';
import BottomNav from '../navigation/BottomNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <GlassHeader />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}