"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";

interface Props {
  serviceName: string;
  instructorName: string;
  dateTime: string;
  isNewUser: boolean;
}

export function Confirmation({ serviceName, instructorName, dateTime, isNewUser }: Props) {
  const date = new Date(dateTime);
  const formatted = date.toLocaleDateString("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 size={40} className="text-success" />
      </motion.div>

      <h2 className="w-heading-md mb-2">
        Booking bekreftet!
      </h2>
      <p className="text-ink-50 mb-8">
        Din coaching-time er booket og betalt.
      </p>

      <div className="w-card text-left mb-6">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-ink-50">Tjeneste</span>
            <span className="font-medium text-ink-90">{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-50">Trener</span>
            <span className="font-medium text-ink-90">{instructorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-50">Dato og tid</span>
            <span className="font-medium text-ink-90">{capitalized}</span>
          </div>
        </div>
      </div>

      {isNewUser && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-card border-gold/20 bg-gold/5 flex items-start gap-3 text-left mb-6"
        >
          <Mail size={20} className="text-gold flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-ink-90 text-sm mb-1">
              Sjekk e-posten din
            </p>
            <p className="text-xs text-ink-50">
              Vi har sendt deg en e-post med en lenke for å sette passord og
              logge inn på spillerportalen. Der kan du se bookinger,
              treningsplaner og coaching-notater.
            </p>
          </div>
        </motion.div>
      )}

      <Link href="/" className="w-btn w-btn-primary">
        Tilbake til forsiden
      </Link>
    </motion.div>
  );
}
