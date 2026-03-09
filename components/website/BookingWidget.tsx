"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { nb } from "date-fns/locale";
import { fetchServiceTypes, fetchSlots } from "@/lib/booking-api";
import type { ServiceType, Slot } from "@/lib/booking-api";

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.akgolf.no";

type Instructor = ServiceType["instructors"][number];

type BookingState = {
  step: 1 | 2 | 3;
  serviceType: ServiceType | null;
  instructor: Instructor | null;
  date: Date | null;
  slot: string | null; // ISO string
};

function formatPriceNOK(price: number): string {
  return `kr ${(price / 100).toLocaleString("nb-NO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Tjeneste" },
    { n: 2, label: "Tidspunkt" },
    { n: 3, label: "Sammendrag" },
  ] as const;

  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map(({ n, label }, i) => {
        const isActive = step === n;
        const isDone = step > n;
        return (
          <div key={n} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                  isActive
                    ? "bg-gold text-ink-100"
                    : isDone
                    ? "bg-gold/30 text-gold"
                    : "bg-ink-80 text-ink-40",
                ].join(" ")}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7l3 3L11.5 4"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  n
                )}
              </div>
              <span
                className={[
                  "text-[10px] font-medium tracking-wide uppercase whitespace-nowrap",
                  isActive ? "text-gold" : isDone ? "text-gold/60" : "text-ink-50",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={[
                  "h-px w-10 mx-2 mb-5 transition-all duration-500",
                  step > n ? "bg-gold/40" : "bg-ink-70",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-ink-70 border-t-gold rounded-full animate-spin" />
    </div>
  );
}

// ─── Step 1: Velg tjeneste ────────────────────────────────────────────────────

function Step1({
  onSelect,
}: {
  onSelect: (service: ServiceType, instructor: Instructor | null) => void;
}) {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchServiceTypes()
      .then(setServices)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-ink-40 mb-4">Kunne ikke laste tjenester. Prøv igjen.</p>
        <button
          className="w-btn w-btn-ghost-dark text-sm"
          onClick={() => {
            setError(false);
            setLoading(true);
            fetchServiceTypes()
              .then(setServices)
              .catch(() => setError(true))
              .finally(() => setLoading(false));
          }}
        >
          Prøv igjen
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="w-eyebrow-light mb-2">Steg 1 av 3</p>
      <h3 className="text-xl font-semibold text-white mb-6">Velg tjeneste</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {services.map((service, i) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            onClick={() => {
              const autoInstructor =
                service.instructors.length === 1 ? service.instructors[0] : null;
              onSelect(service, autoInstructor);
            }}
            className="group text-left p-4 rounded-2xl border border-ink-70 bg-ink-90/60 hover:border-gold/60 hover:bg-ink-90 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="font-semibold text-white group-hover:text-gold transition-colors duration-200 text-sm leading-snug pr-2">
                {service.name}
              </p>
              <span className="shrink-0 text-gold font-medium text-sm">
                {formatPriceNOK(service.price)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-ink-50 shrink-0"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 6v6l4 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs text-ink-50">{service.duration} min</span>
            </div>
            {service.description && (
              <p className="text-xs text-ink-40 leading-relaxed line-clamp-2">
                {service.description}
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Velg tid ─────────────────────────────────────────────────────────

function Step2({
  serviceType,
  instructor: preselectedInstructor,
  onSelect,
  onBack,
}: {
  serviceType: ServiceType;
  instructor: Instructor | null;
  onSelect: (instructor: Instructor, date: Date, slot: string) => void;
  onBack: () => void;
}) {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(
    preselectedInstructor
  );
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(false);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  useEffect(() => {
    if (!selectedDate || !selectedInstructor) return;
    setLoadingSlots(true);
    setSlotsError(false);
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    fetchSlots(serviceType.id, selectedInstructor.id, dateStr)
      .then(setSlots)
      .catch(() => setSlotsError(true))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedInstructor, serviceType.id]);

  const needsInstructorSelection =
    serviceType.instructors.length > 1 && !preselectedInstructor;

  return (
    <div>
      <p className="w-eyebrow-light mb-2">Steg 2 av 3</p>
      <h3 className="text-xl font-semibold text-white mb-6">Velg tid</h3>

      {/* Instructor selection if multiple */}
      {needsInstructorSelection && (
        <div className="mb-6">
          <p className="text-xs text-ink-40 font-medium uppercase tracking-wide mb-2">
            Trener
          </p>
          <div className="flex flex-wrap gap-2">
            {serviceType.instructors.map((inst) => (
              <button
                key={inst.id}
                onClick={() => setSelectedInstructor(inst)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm border transition-all duration-200",
                  selectedInstructor?.id === inst.id
                    ? "bg-gold text-ink-100 border-gold font-medium"
                    : "bg-transparent text-ink-30 border-ink-70 hover:border-ink-50",
                ].join(" ")}
              >
                {inst.user.name ?? "Ukjent trener"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Week navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            setWeekStart((w) => addDays(w, -7));
            setSelectedDate(null);
            setSlots([]);
          }}
          className="flex items-center gap-1 text-xs text-ink-40 hover:text-white transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-ink-80"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Forrige uke
        </button>
        <span className="text-xs text-ink-50 font-medium">
          {format(weekStart, "MMMM yyyy", { locale: nb })}
        </span>
        <button
          onClick={() => {
            setWeekStart((w) => addDays(w, 7));
            setSelectedDate(null);
            setSlots([]);
          }}
          className="flex items-center gap-1 text-xs text-ink-40 hover:text-white transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-ink-80"
        >
          Neste uke
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Day chips */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {weekDays.map((day) => {
          const isSelected = selectedDate !== null && isSameDay(day, selectedDate);
          const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));
          return (
            <button
              key={day.toISOString()}
              disabled={isPast}
              onClick={() => {
                setSelectedDate(day);
                setSlots([]);
              }}
              className={[
                "flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl border text-center transition-all duration-200",
                isPast
                  ? "opacity-30 cursor-not-allowed border-transparent"
                  : isSelected
                  ? "bg-gold border-gold text-ink-100"
                  : "border-ink-70 text-ink-30 hover:border-ink-50 hover:text-white",
              ].join(" ")}
            >
              <span className="text-[9px] font-medium uppercase tracking-wide">
                {format(day, "EEE", { locale: nb })}
              </span>
              <span className="text-sm font-semibold">
                {format(day, "d")}
              </span>
              <span className="text-[9px] text-current opacity-70">
                {format(day, "MMM", { locale: nb })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="mb-6">
          {loadingSlots ? (
            <Spinner />
          ) : slotsError ? (
            <p className="text-center text-ink-40 text-sm py-4">
              Kunne ikke laste ledige tider. Prøv igjen.
            </p>
          ) : slots.length === 0 ? (
            <p className="text-center text-ink-40 text-sm py-4">
              Ingen ledige tider denne dagen.
            </p>
          ) : (
            <div>
              <p className="text-xs text-ink-40 font-medium uppercase tracking-wide mb-3">
                Ledige tider
              </p>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot, i) => (
                  <motion.button
                    key={slot.startTime}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      if (selectedInstructor) {
                        onSelect(selectedInstructor, selectedDate, slot.startTime);
                      }
                    }}
                    disabled={!selectedInstructor}
                    className="px-4 py-2 rounded-full border border-ink-70 text-sm text-ink-20 hover:border-gold hover:text-gold hover:bg-gold/10 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {format(new Date(slot.startTime), "HH:mm")}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <button onClick={onBack} className="w-btn w-btn-ghost-dark text-sm">
        ← Tilbake
      </button>
    </div>
  );
}

// ─── Step 3: Sammendrag ───────────────────────────────────────────────────────

function Step3({
  serviceType,
  instructor,
  date,
  slot,
  onBack,
}: {
  serviceType: ServiceType;
  instructor: Instructor;
  date: Date;
  slot: string;
  onBack: () => void;
}) {
  const params = new URLSearchParams({
    serviceTypeId: serviceType.id,
    instructorId: instructor.id,
    startTime: slot,
  });
  const bookingUrl = `${PORTAL_URL}/booking/new?${params.toString()}`;

  const rows = [
    { label: "Tjeneste", value: serviceType.name },
    { label: "Trener", value: instructor.user.name ?? "Ukjent trener" },
    {
      label: "Dato",
      value: format(date, "EEEE d. MMMM yyyy", { locale: nb }),
    },
    { label: "Tidspunkt", value: format(new Date(slot), "HH:mm") },
    { label: "Varighet", value: `${serviceType.duration} min` },
    { label: "Pris", value: formatPriceNOK(serviceType.price) },
  ];

  return (
    <div>
      <p className="w-eyebrow-light mb-2">Steg 3 av 3</p>
      <h3 className="text-xl font-semibold text-white mb-6">Sammendrag</h3>

      <div className="rounded-2xl border border-ink-70 bg-ink-90/60 overflow-hidden mb-6">
        {rows.map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={[
              "flex items-center justify-between px-4 py-3",
              i < rows.length - 1 ? "border-b border-ink-80" : "",
            ].join(" ")}
          >
            <span className="text-xs text-ink-50 font-medium uppercase tracking-wide">
              {label}
            </span>
            <span
              className={[
                "text-sm font-medium",
                label === "Pris" ? "text-gold" : "text-white",
              ].join(" ")}
            >
              {value}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            window.location.href = bookingUrl;
          }}
          className="w-btn w-btn-gold flex-1 justify-center"
        >
          Fortsett til betaling
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
        <button onClick={onBack} className="w-btn w-btn-ghost-dark">
          ← Tilbake
        </button>
      </div>
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export function BookingWidget() {
  const [state, setState] = useState<BookingState>({
    step: 1,
    serviceType: null,
    instructor: null,
    date: null,
    slot: null,
  });

  return (
    <div
      className="bg-ink-100 rounded-[20px] p-6 md:p-8 min-h-[400px]"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}
    >
      <StepIndicator step={state.step} />

      {state.step === 1 && (
        <Step1
          onSelect={(service, autoInstructor) => {
            setState({
              step: 2,
              serviceType: service,
              instructor: autoInstructor,
              date: null,
              slot: null,
            });
          }}
        />
      )}

      {state.step === 2 && state.serviceType && (
        <Step2
          serviceType={state.serviceType}
          instructor={state.instructor}
          onSelect={(instructor, date, slot) => {
            setState((prev) => ({
              ...prev,
              step: 3,
              instructor,
              date,
              slot,
            }));
          }}
          onBack={() =>
            setState({
              step: 1,
              serviceType: null,
              instructor: null,
              date: null,
              slot: null,
            })
          }
        />
      )}

      {state.step === 3 &&
        state.serviceType &&
        state.instructor &&
        state.date &&
        state.slot && (
          <Step3
            serviceType={state.serviceType}
            instructor={state.instructor}
            date={state.date}
            slot={state.slot}
            onBack={() =>
              setState((prev) => ({
                ...prev,
                step: 2,
                slot: null,
              }))
            }
          />
        )}
    </div>
  );
}
