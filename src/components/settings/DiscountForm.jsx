import React, { useState, useEffect } from 'react';

export default function DiscountForm({ discount, setDiscountData }) {
  const [form, setForm] = useState({
    percent: String(discount.percent ?? ''),
    description: discount.description,
    code: discount.code,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      percent: String(discount.percent ?? ''),
      description: discount.description,
      code: discount.code,
    });
  }, [discount]);

  const handleSave = async () => {
    setSaving(true);
    await setDiscountData({ ...form, percent: parseInt(form.percent) || 0 });
    setSaving(false);
  };

  return (
    <div className="space-y-3">
      <div className="bg-accent/30 rounded-2xl p-4 space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Persentase Diskon</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="100"
              value={form.percent}
              onChange={(e) => setForm({ ...form, percent: e.target.value })}
              className="w-20 h-9 border border-input bg-transparent rounded-xl px-3 text-sm text-center"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Deskripsi Promo</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full h-9 border border-input bg-transparent rounded-xl px-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Kode Promo</label>
          <input
            type="text"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="w-full h-9 border border-input bg-transparent rounded-xl px-3 text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-primary text-primary-foreground font-medium py-2.5 rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
      </button>
    </div>
  );
}
