import { useEffect, useMemo, useRef, useState } from "react";

export type CatPoint = {
  lat: number;
  lng: number;
  speedKmh: number;
  accuracyM: number;
  batteryPct: number;
  timestamp: number;
};

type Options = {
  start: { lat: number; lng: number };
  intervalMs?: number;
  speedKmh?: number;
  accuracyM?: number;
  batteryStart?: number;
  running?: boolean;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function useSimulatedCat(opts: Options) {
  const { start, intervalMs = 1000, speedKmh = 3, accuracyM = 8, batteryStart = 98, running = true } = opts;
  const [point, setPoint] = useState<CatPoint>({
    ...start,
    speedKmh,
    accuracyM,
    batteryPct: batteryStart,
    timestamp: Date.now(),
  });
  const [trail, setTrail] = useState<CatPoint[]>([
    {
      ...start,
      speedKmh,
      accuracyM,
      batteryPct: batteryStart,
      timestamp: Date.now(),
    },
  ]);
  const bearingRef = useRef(rand(0, 360));
  const speedRef = useRef(speedKmh);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const id = setInterval(() => {
      if (!runningRef.current) return;
      // change bearing slightly, occasionally bounce
      let b = bearingRef.current + rand(-25, 25);
      if (Math.random() < 0.05) b += 180;
      bearingRef.current = (b + 360) % 360;
      // vary speed 1–8 km/h (cat trot), occasional sprint
      if (Math.random() < 0.08) speedRef.current = rand(8, 20);
      else speedRef.current = rand(1, 8);
      const speed = speedRef.current;
      const metersPerSec = (speed * 1000) / 3600;
      const distance = metersPerSec * (intervalMs / 1000);
      // R = radius of earth in meters
      const R = 6378137;
      const dLat = (distance * Math.cos((bearingRef.current * Math.PI) / 180)) / R;
      const dLng = (distance * Math.sin((bearingRef.current * Math.PI) / 180)) / (R * Math.cos((point.lat * Math.PI) / 180));
      let lat = point.lat + (dLat * 180) / Math.PI;
      let lng = point.lng + (dLng * 180) / Math.PI;
      // keep within a loose bbox
      lat = Math.max(Math.min(lat, start.lat + 0.02), start.lat - 0.02);
      lng = Math.max(Math.min(lng, start.lng + 0.02), start.lng - 0.02);
      const accuracy = Math.max(3, accuracyM + rand(-3, 6));
      const battery = Math.max(1, point.batteryPct - rand(0.02, 0.2));
      const next = { lat, lng, speedKmh: speed, accuracyM: accuracy, batteryPct: battery, timestamp: Date.now() };
      setPoint(next);
      setTrail((prev) => [...prev.slice(-200), next]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, accuracyM, start.lat, start.lng, point.lat, point.lng]);

  const stats = useMemo(
    () => ({
      lastSeen: new Date(point.timestamp),
      speedKmh: point.speedKmh,
      accuracyM: point.accuracyM,
      batteryPct: point.batteryPct,
      totalPoints: trail.length,
    }),
    [point, trail]
  );

  return { point, trail, stats };
}
