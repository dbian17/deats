"use client";

import { useEffect, useState } from "react";
import { get_place_data } from "../_client/flask-client";
import { type Place } from "../_model/place";

export function usePlaceData(placeName: string | null) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(placeName !== null);

  useEffect(() => {
    if (!placeName) {
      setPlace(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setPlace(null);
    setLoading(true);
    get_place_data(placeName).then((data) => {
      if (cancelled) return;
      setPlace(data);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [placeName]);

  return { place, loading };
}
