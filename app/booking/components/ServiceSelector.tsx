"use client";

import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";
import type { ServiceType } from "../types";

interface Props {
  services: ServiceType[];
  onSelect: (service: ServiceType) => void;
}

export function ServiceSelector({ services, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-navy mb-2">Velg tjeneste</h2>
      <p className="text-ink-50 mb-8">Hva slags coaching ønsker du?</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, i) => {
          const priceNok = service.price / 100;
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(service)}
              className="group text-left rounded-2xl border border-ink-20 bg-white p-6 hover:border-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-navy group-hover:text-gold transition-colors">
                  {service.name}
                </h3>
                <span className="text-sm font-semibold text-gold whitespace-nowrap ml-3">
                  {priceNok.toLocaleString("nb-NO")} kr
                </span>
              </div>

              {service.description && (
                <p className="text-sm text-ink-50 mb-4 line-clamp-2">
                  {service.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-ink-40">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {service.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {service.instructors.length} {service.instructors.length === 1 ? "trener" : "trenere"}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
