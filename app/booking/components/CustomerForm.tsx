"use client";

import { useState } from "react";

interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

interface Props {
  onSubmit: (data: CustomerData) => void;
}

export function CustomerForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Navn og e-post er påkrevd.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ugyldig e-postadresse.");
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy mb-2">Dine detaljer</h2>
      <p className="text-ink-50 mb-8">Fyll inn kontaktinformasjon for bookingen.</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink-70 mb-1.5">
            Fullt navn *
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-ink-20 bg-white text-ink-80 placeholder:text-ink-40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            placeholder="Ola Nordmann"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink-70 mb-1.5">
            E-post *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-ink-20 bg-white text-ink-80 placeholder:text-ink-40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            placeholder="ola@eksempel.no"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink-70 mb-1.5">
            Telefon <span className="text-ink-40">(valgfritt)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-ink-20 bg-white text-ink-80 placeholder:text-ink-40 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
            placeholder="+47 900 00 000"
          />
        </div>

        {error && <p className="text-sm text-error">{error}</p>}

        <button
          type="submit"
          className="w-full px-6 py-3.5 rounded-xl bg-gold text-white font-semibold hover:bg-gold-dark transition-colors"
        >
          Gå videre til betaling
        </button>
      </form>
    </div>
  );
}
