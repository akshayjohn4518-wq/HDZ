/**
 * Chapter metadata and coordinate utility definitions for DAY ZERO documentary.
 * Canvas total height: 5200px
 * Hero path start Y: 120px
 * CTA path end Y: 5050px
 */

export const CANVAS_HEIGHT = 5200;
export const PATH_START_Y = 120;
export const PATH_END_Y = 5050;
export const PATH_RANGE_Y = PATH_END_Y - PATH_START_Y; // 4930px

export const CHAPTERS_DATA = [
  {
    id: '01',
    title: 'THE FIRST COMMIT',
    subtitle: 'Before every success, there is a first step. Before every product, there is a Day Zero.',
    yPos: 750,
    startY: 600,
    topCss: '750px',
  },
  {
    id: '02',
    title: 'THE PROBLEM',
    subtitle: 'We only see the highlight reel. The struggles. The failures. The uncertainty. These are rarely shown.',
    yPos: 1400,
    startY: 1250,
    topCss: '1400px',
  },
  {
    id: '03',
    title: 'OUR BELIEF',
    subtitle: 'Every meaningful journey has a Day Zero. We believe the beginning is the most valuable part.',
    yPos: 2050,
    startY: 1900,
    topCss: '2050px',
  },
  {
    id: '04',
    title: 'BUILD IN PUBLIC',
    subtitle: 'We build. We document. We share everything — the good, the bad, and the unfinished.',
    yPos: 2700,
    startY: 2550,
    topCss: '2700px',
  },
  {
    id: '05',
    title: 'CURRENT MISSIONS',
    subtitle: 'Real projects. Real progress. This is what we are building right now.',
    yPos: 3350,
    startY: 3200,
    topCss: '3350px',
  },
  {
    id: '06',
    title: 'FUTURE ECOSYSTEM',
    subtitle: 'An ecosystem that empowers others to start their own Day Zero.',
    yPos: 4000,
    startY: 3850,
    topCss: '4000px',
  },
  {
    id: '07',
    title: 'MANIFESTO',
    subtitle: 'This is our commitment to builders, creators, and dreamers everywhere.',
    yPos: 4650,
    startY: 4500,
    topCss: '4650px',
  },
];

/**
 * Converts a target Y position on the SVG canvas (e.g. chapter startY)
 * to the exact target window scrollY based on current viewport height.
 */
export function getScrollYForCanvasY(canvasY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return 0;
  const ratio = (canvasY - PATH_START_Y) / PATH_RANGE_Y;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  return Math.round(clampedRatio * maxScroll);
}

/**
 * Converts the current window scrollY to the corresponding drawing head Y coordinate
 * on the SVG canvas based on current viewport height.
 */
export function getCanvasYForScrollY(scrollY, viewportHeight = window.innerHeight, canvasHeight = CANVAS_HEIGHT) {
  const maxScroll = canvasHeight - viewportHeight;
  if (maxScroll <= 0) return PATH_START_Y;
  const ratio = Math.max(0, Math.min(1, scrollY / maxScroll));
  return PATH_START_Y + ratio * PATH_RANGE_Y;
}
