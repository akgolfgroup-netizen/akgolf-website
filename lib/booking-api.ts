// Base URL for portal API (public, no auth)
const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL ?? "https://portal.akgolf.no";

export interface ServiceType {
  id: string;
  name: string;
  duration: number;    // minutes
  price: number;       // in øre
  description: string | null;
  instructors: Array<{ id: string; user: { name: string | null; image: string | null } }>;
}

export interface Slot {
  startTime: string; // ISO string
}

export async function fetchServiceTypes(): Promise<ServiceType[]> {
  const res = await fetch(`${PORTAL_URL}/api/public/service-types`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch service types");
  return res.json();
}

export async function fetchSlots(serviceTypeId: string, instructorId: string, date: string): Promise<Slot[]> {
  const url = `${PORTAL_URL}/api/public/slots?serviceTypeId=${serviceTypeId}&instructorId=${instructorId}&date=${date}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}
