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
  dice: s('<path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z"/><path d="M4 7.4l8 4.6 8-4.6M12 12v9.2"/><circle cx="12" cy="8" r="1"/><circle cx="8.4" cy="14.8" r="1"/><circle cx="15.6" cy="14.8" r="1"/>'),
  map: s('<path d="M9 4L3 6.6v13L9 17l6 3 6-2.6v-13L15 7 9 4z"/><path d="M9 4v13M15 7v13"/>'),
  skull: s('<path d="M5 10.4a7 7 0 0 1 14 0v3l-1.6 1.5V18a1.6 1.6 0 0 1-1.6 1.6H8.2A1.6 1.6 0 0 1 6.6 18v-3.1L5 13.4v-3z"/><circle cx="9.3" cy="11.3" r="1.7"/><circle cx="14.7" cy="11.3" r="1.7"/><path d="M12 14.2v1.8M9.6 19.6v-1.9M14.4 19.6v-1.9"/>'),
  branch: s('<circle cx="7" cy="5.5" r="2.2"/><circle cx="17" cy="18.5" r="2.2"/><circle cx="7" cy="18.5" r="2.2"/><path d="M7 7.7v8.6"/><path d="M7 10.5h4a3 3 0 0 1 3 3v3.4"/>'),
  mask: s('<path d="M5 5.4h14v6.2c0 4.4-3.1 7.4-7 8.4-3.9-1-7-4-7-8.4V5.4z"/><path d="M8.4 10.2c.6-.7 1.8-.7 2.4 0M13.2 10.2c.6-.7 1.8-.7 2.4 0"/><path d="M9.4 14.6c1.6 1.2 3.6 1.2 5.2 0"/>'),
  share: s('<circle cx="17.5" cy="5.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/><path d="M15.4 6.8l-6.8 3.9M8.6 13.3l6.8 3.9"/>'),
  globe: s('<circle cx="12" cy="12" r="9"/><path d="M3.2 9.5h17.6M3.2 14.5h17.6"/><path d="M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9s1.2-6.4 3.6-9z"/>'),
  youtube: s('<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.4 9.4l5 2.6-5 2.6V9.4z"/>'),
};

export const projectIcons = {
  safeskillvr: icons.vr,
  aicameras: icons.camera,
  grimscribe: s('<path d="M12 2.2l8.6 5v9.6l-8.6 5-8.6-5V7.2l8.6-5z"/><path d="M12 7.4l4.9 7.9H7.1L12 7.4z"/><path d="M12 7.4V2.2M7.1 15.3l-3.7 1.9M16.9 15.3l3.7 1.9"/>'),
  loomtale: s('<path d="M12 11.6C10.4 10.3 8 9.8 4 10v9.4c4-.2 6.4.3 8 1.6 1.6-1.3 4-1.8 8-1.6V10c-4-.2-6.4.3-8 1.6z"/><path d="M12 11.6v9.4"/><path d="M12 11.6V8.6"/><path d="M12 8.6c0-1.8-1.1-2.5-2.7-3M12 8.6c0-1.8 1.1-2.5 2.7-3"/><circle cx="8.9" cy="5.2" r="1"/><circle cx="15.1" cy="5.2" r="1"/>'),
  workshops: s('<path d="M4 19V8a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11"/><path d="M2 19h20"/><path d="M9 11h6M9 14h4"/>'),
  automatenow: s('<circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>'),
};
