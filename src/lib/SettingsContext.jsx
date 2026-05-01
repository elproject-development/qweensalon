import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getProfiles, updateProfileImage, getDiscount, updateDiscount, getGallery, addGalleryImage, deleteGalleryImage } from './supabase';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [discount, setDiscount] = useState({ percent: 10, description: 'Dapatkan harga promo setiap harinya!', code: 'QweenSalonReservasi' });
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    const [p, d, g] = await Promise.all([getProfiles(), getDiscount(), getGallery()]);
    setProfiles(p);
    setDiscount(d);
    setGallery(g);
    setLoading(false);
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Profiles
  const setProfileImage = async (name, imageUrl) => {
    const data = await updateProfileImage(name, imageUrl);
    if (data) setProfiles(prev => prev.map(p => p.name === name ? { ...p, image_url: imageUrl } : p));
  };

  // Discount
  const setDiscountData = async ({ percent, description, code }) => {
    const data = await updateDiscount({ percent, description, code });
    if (data) setDiscount(data);
  };

  // Gallery
  const addGallery = async ({ src, alt, isDefault }) => {
    const data = await addGalleryImage({ src, alt, isDefault });
    if (data) setGallery(prev => [...prev, data]);
  };

  const removeGallery = async (id) => {
    await deleteGalleryImage(id);
    setGallery(prev => prev.filter(img => img.id !== id));
  };

  return (
    <SettingsContext.Provider value={{
      profiles, discount, gallery, loading,
      setProfileImage, setDiscountData, addGallery, removeGallery, loadAll,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
