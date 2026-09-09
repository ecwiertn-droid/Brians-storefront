"use client";

import { useState } from "react";

// Shows /public/images/{src} if that file exists; falls back to a clean
// animated placeholder if it 404s (i.e. before Eddie has added the real
// photo yet). Drop a real .jpg at public/images/{src} with the same
// filename and it swaps in automatically -- no code changes needed.
export default function PhotoOrPlaceholder({ src, alt, icon, label }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="photo-card">
      {!failed && (
        <img src={`/images/${src}`} alt={alt} onError={() => setFailed(true)} />
      )}
      {failed && (
        <div className="photo-placeholder">
          {icon}
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
