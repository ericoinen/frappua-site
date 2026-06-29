// Inline SVG icons (stroke uses currentColor). Kept lightweight & consistent.
const s = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const icons = {
  vr: s('<rect x="2" y="7" width="20" height="11" rx="3.5"/><circle cx="8.5" cy="12.5" r="2.5"/><circle cx="15.5" cy="12.5" r="2.5"/><path d="M2 10C.5 10 .5 15 2 15M22 10c1.5 0 1.5 5 0 5"/>'),
  ai: s('<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M12 6V3M9 3h6"/><circle cx="9" cy="12" r="1.1"/><circle cx="15" cy="12" r="1.1"/><path d="M9 16h6"/><path d="M4 11H2M22 11h-2"/>'),
  flow: s('<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h4a2 2 0 0 1 2 2v7"/>'),
  chart: s('<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/>'),
  shield: s('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>'),
  eye: s('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
  bell: s('<path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M10.5 20a1.8 1.8 0 0 0 3 0"/>'),
  camera: s('<rect x="3" y="7" width="18" height="13" rx="3"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l1.5-3h5L16 7"/>'),
  cloud: s('<path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.5A3.8 3.8 0 0 1 18 18H7z"/>'),
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowUpRight: s('<path d="M7 17L17 7M8 7h9v9"/>'),
  arrowDown: s('<path d="M12 5v14M6 13l6 6 6-6"/>'),
  clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>'),
  spark: s('<path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3z"/>'),
};

export const projectIcons = {
  safeskillvr: icons.vr,
  aicameras: icons.camera,
  workshops: s('<path d="M4 19V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11"/><path d="M2 19h20"/><path d="M9 11h6M9 14h4"/>'),
  automatenow: s('<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'),
};
