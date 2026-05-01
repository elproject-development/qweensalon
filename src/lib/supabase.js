import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vouvhnxksxgfrzmattvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvdXZobnhrc3hnZnJ6bWF0dHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1OTUwNjcsImV4cCI6MjA5MzE3MTA2N30.yTN5OinOylbL9SiLJBFDdqsFQk6ojILlCi31pzYVicc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Profiles ---
export async function getProfiles() {
  const { data, error } = await supabase.from('profiles').select('*').order('id');
  if (error) console.error('getProfiles error:', error);
  return data || [];
}

export async function updateProfileImage(name, imageUrl) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ image_url: imageUrl })
    .eq('name', name)
    .select()
    .single();
  if (error) console.error('updateProfileImage error:', error);
  return data;
}

// --- Discount ---
export async function getDiscount() {
  const { data, error } = await supabase.from('discount').select('*').limit(1).single();
  if (error && error.code !== 'PGRST116') console.error('getDiscount error:', error);
  return data || { percent: 10, description: 'Dapatkan harga promo setiap harinya!', code: 'QweenSalonReservasi' };
}

export async function updateDiscount({ percent, description, code }) {
  const { data, error } = await supabase
    .from('discount')
    .update({ percent, description, code, updated_at: new Date().toISOString() })
    .eq('id', 1)
    .select()
    .single();
  if (error) console.error('updateDiscount error:', error);
  return data;
}

// --- Gallery ---
export async function getGallery() {
  const { data, error } = await supabase.from('gallery').select('*').order('sort_order');
  if (error) console.error('getGallery error:', error);
  return data || [];
}

export async function addGalleryImage({ src, alt, isDefault = false }) {
  const { data, error } = await supabase
    .from('gallery')
    .insert({ src, alt, is_default: isDefault })
    .select()
    .single();
  if (error) console.error('addGalleryImage error:', error);
  return data;
}

export async function deleteGalleryImage(id) {
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  if (error) console.error('deleteGalleryImage error:', error);
}
