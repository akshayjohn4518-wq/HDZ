export const PRODUCTS_DATA = [
  {
    id: '01',
    code: 'BUILD // 001',
    title: 'DAY ZERO WORKSTATION',
    shortDesc: 'The interactive documentary workstation and build engine that captures product creation from ground zero.',
    fullDesc: 'DAY ZERO Workstation is an experimental visual recording environment that tracks code commits, architectural decisions, and failure modes in real time. It renders software engineering as an interactive, live-updating spatial system.',
    category: 'SYSTEM',
    status: 'VOID',
    year: '2026',
    featured: true,
    version: '01.0',
    buildNum: '001',
    lastUpdate: '2026-08-15',
    visualType: 'terminal-wireframe',
    metrics: [
      { label: 'KERNEL', value: 'v2.4.0-release' },
      { label: 'NODES', value: '1,024 Active' },
      { label: 'LATENCY', value: '0.4ms' },
      { label: 'STATE', value: 'DETERMINISTIC' },
    ],
    stack: ['React', 'Three.js / Canvas', 'GSAP Motion', 'WebSockets', 'Rust Core'],
    changelog: [
      { date: '2026-08-15', note: 'Added spatial chapter navigation timeline' },
      { date: '2026-07-22', note: 'Optimized binary search SVG path tracking' },
      { date: '2026-06-10', note: 'Initial public alpha release' },
    ],
    codeSnippet: `// DAY ZERO KERNEL INIT
const engine = new BuildEngine({
  mode: "DOCUMENTARY",
  telemetry: true,
  syncRate: 60 /* fps */
});
engine.attachNode("PRODUCT_INDEX");
engine.bootSequence();`,
  },
];
