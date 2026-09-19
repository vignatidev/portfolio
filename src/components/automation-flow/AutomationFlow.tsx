'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/i18n';
import './AutomationFlow.scss';

// ---------------------------------------------------------------------------
// Geometry. Everything is laid out on a fixed logical stage (px) that is
// scaled to the width and height the layout gives us, so nodes, ports and
// curves always line up. Sizes reach the stylesheet as CSS variables.
// ---------------------------------------------------------------------------

const STAGE_W = 896;
const STAGE_H = 560;
const PAD = 8;
const HERO_V_MARGIN = 32;

const NODE_W = 190;
const HEAD_H = 60;
const BODY_H = 75;
const ROW_H = 34;
const AI_ROW_H = 38;

type NodeId = 'trigger' | 'ai' | 'auto' | 'human' | 'crm';
type EdgeId = 'trigger-ai' | 'ai-auto' | 'ai-human' | 'auto-crm' | 'human-crm';
type Tone = 'green' | 'purple' | 'blue' | 'orange' | 'teal';
type BodyKind = 'bubble' | 'status' | 'tag';

interface NodeDef {
  x: number;
  y: number;
  tone: Tone;
  icon: 'message' | 'spark' | 'send' | 'user' | 'tag';
  body?: BodyKind;
  rows: number;
}

const NODES: Record<NodeId, NodeDef> = {
  trigger: { x: 0, y: 65, tone: 'green', icon: 'message', body: 'bubble', rows: 1 },
  ai: { x: 230, y: 187, tone: 'purple', icon: 'spark', rows: 2 },
  auto: { x: 460, y: 8, tone: 'blue', icon: 'send', body: 'bubble', rows: 1 },
  human: { x: 460, y: 367, tone: 'orange', icon: 'user', body: 'status', rows: 1 },
  crm: { x: 690, y: 310, tone: 'teal', icon: 'tag', body: 'tag', rows: 0 },
};

const NODE_IDS = Object.keys(NODES) as NodeId[];

const rowHeight = (id: NodeId) => (id === 'ai' ? AI_ROW_H : ROW_H);

const nodeHeight = (id: NodeId) => {
  const n = NODES[id];
  return HEAD_H + (n.body ? BODY_H : 0) + n.rows * rowHeight(id);
};

const inPort = (id: NodeId): [number, number] => [NODES[id].x + PAD, NODES[id].y + PAD + HEAD_H / 2];

const outPort = (id: NodeId, row: number): [number, number] => {
  const n = NODES[id];
  const top = n.y + PAD + HEAD_H + (n.body ? BODY_H : 0);
  return [n.x + NODE_W + PAD, top + row * rowHeight(id) + rowHeight(id) / 2];
};

const EDGES: Record<EdgeId, [[number, number], [number, number]]> = {
  'trigger-ai': [outPort('trigger', 0), inPort('ai')],
  'ai-auto': [outPort('ai', 0), inPort('auto')],
  'ai-human': [outPort('ai', 1), inPort('human')],
  'auto-crm': [outPort('auto', 0), inPort('crm')],
  'human-crm': [outPort('human', 0), inPort('crm')],
};

const EDGE_IDS = Object.keys(EDGES) as EdgeId[];

const curve = ([x1, y1]: [number, number], [x2, y2]: [number, number]) => {
  const dx = Math.max(24, (x2 - x1) * 0.55);
  return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
};

const EDGE_PATH = Object.fromEntries(
  EDGE_IDS.map((id) => [id, curve(EDGES[id][0], EDGES[id][1])]),
) as Record<EdgeId, string>;

// ---------------------------------------------------------------------------
// Timeline (ms). Cards appear one by one, two messages travel through the
// graph (one answered by the AI, one handed to a person), everything rests on
// screen for a moment, then fades out and the loop restarts.
// ---------------------------------------------------------------------------

interface View {
  nodes: NodeId[];
  edges: EdgeId[];
  active: NodeId | null;
  packet: { edge: EdgeId; key: number } | null;
  leaving: boolean;
}

const EMPTY: View = { nodes: [], edges: [], active: null, packet: null, leaving: false };
const FULL: View = { nodes: NODE_IDS, edges: EDGE_IDS, active: null, packet: null, leaving: false };

let packetKey = 0;

const showNode = (id: NodeId) => (v: View): View => ({ ...v, nodes: [...v.nodes, id] });
const drawEdge = (id: EdgeId) => (v: View): View => ({ ...v, edges: [...v.edges, id] });
const activate = (id: NodeId) => (v: View): View => ({ ...v, active: id, packet: null });
const send = (edge: EdgeId) => (v: View): View => ({ ...v, packet: { edge, key: ++packetKey } });
const leave = (v: View): View => ({ ...v, active: null, packet: null, leaving: true });
const reset = (): View => EMPTY;

const SCRIPT: [number, (v: View) => View][] = [
  [300, showNode('trigger')],
  [800, drawEdge('trigger-ai')],
  [1200, showNode('ai')],
  [1700, drawEdge('ai-auto')],
  [1850, drawEdge('ai-human')],
  [2100, showNode('auto')],
  [2300, showNode('human')],
  [2700, drawEdge('auto-crm')],
  [2850, drawEdge('human-crm')],
  [3100, showNode('crm')],
  // message 1: the AI answers on its own
  [3900, activate('trigger')],
  [4300, send('trigger-ai')],
  [5000, activate('ai')],
  [5400, send('ai-auto')],
  [6100, activate('auto')],
  [6500, send('auto-crm')],
  [7200, activate('crm')],
  // message 2: low confidence, handed to a person
  [8000, activate('trigger')],
  [8400, send('trigger-ai')],
  [9100, activate('ai')],
  [9500, send('ai-human')],
  [10200, activate('human')],
  [10600, send('human-crm')],
  [11300, activate('crm')],
  // everything stays visible, then fades out
  [12800, leave],
  [13500, reset],
];

const LOOP_MS = 14000;

// ---------------------------------------------------------------------------
// Presentation
// ---------------------------------------------------------------------------

const ICONS: Record<NodeDef['icon'], ReactNode> = {
  message: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  spark: (
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  ),
  send: (
    <>
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </>
  ),
  tag: (
    <>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </>
  ),
};

type Copy = (typeof translations)['pt'];

const nodeCopy = (t: Copy) => ({
  trigger: { eyebrow: t.flow_trigger_eyebrow, title: t.flow_trigger_title, body: t.flow_trigger_body, rows: [t.flow_next] },
  ai: { eyebrow: t.flow_ai_eyebrow, title: t.flow_ai_title, body: '', rows: [t.flow_ai_ok, t.flow_ai_low] },
  auto: { eyebrow: t.flow_auto_eyebrow, title: t.flow_auto_title, body: t.flow_auto_body, rows: [t.flow_next] },
  human: { eyebrow: t.flow_human_eyebrow, title: t.flow_human_title, body: t.flow_human_body, rows: [t.flow_next] },
  crm: { eyebrow: t.flow_crm_eyebrow, title: t.flow_crm_title, body: t.flow_crm_tag, rows: [] as string[] },
});

const stageStyle = (scale: number) =>
  ({
    width: STAGE_W,
    height: STAGE_H,
    transform: `scale(${scale})`,
    '--af-node-w': `${NODE_W}px`,
    '--af-head-h': `${HEAD_H}px`,
    '--af-body-h': `${BODY_H}px`,
  }) as CSSProperties;

const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ');

const MIN_WIDTH_QUERY = '(min-width: 1240px) and (min-height: 680px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function AutomationFlow() {
  const { language } = useLanguage();
  const t = translations[language];
  const copy = nodeCopy(t);

  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const [view, setView] = useState<View>(EMPTY);

  // Fit the fixed stage to the width and height the layout gives us.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const hero = frame.closest<HTMLElement>('.page_home');

    const fit = () => {
      const width = frame.clientWidth;
      if (width <= 0) return;
      const height = hero ? hero.clientHeight - HERO_V_MARGIN : Infinity;
      setScale(Math.min(1, width / STAGE_W, height / STAGE_H));
    };

    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    if (hero) observer.observe(hero);
    fit();
    return () => observer.disconnect();
  }, []);

  // Only animate while the diagram is actually shown.
  useEffect(() => {
    const query = window.matchMedia(MIN_WIDTH_QUERY);
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      setView(FULL);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const play = () => {
      setView(EMPTY);
      SCRIPT.forEach(([at, step]) => timers.push(setTimeout(() => setView(step), at)));
      timers.push(setTimeout(play, LOOP_MS));
    };
    play();

    return () => timers.forEach(clearTimeout);
  }, [enabled]);

  const renderBody = (id: NodeId) => {
    const kind = NODES[id].body;
    const text = copy[id].body;
    if (!kind) return null;
    return (
      <div className="af-body">
        {kind === 'bubble' && <p className="af-bubble">{text}</p>}
        {kind === 'status' && (
          <p className="af-status">
            <i />
            {text}
          </p>
        )}
        {kind === 'tag' && <p className="af-tag">{text}</p>}
      </div>
    );
  };

  return (
    <div className={cx('af', view.leaving && 'is-leaving')} role="img" aria-label={t.flow_aria}>
      <div className="af-frame" ref={frameRef} style={{ height: STAGE_H * scale }}>
        <div className="af-stage" style={stageStyle(scale)}>
          <svg className="af-edges" width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}>
            {EDGE_IDS.map((id) => (
              <path
                key={id}
                d={EDGE_PATH[id]}
                pathLength={1}
                className={cx('af-edge', view.edges.includes(id) && 'is-drawn')}
              />
            ))}
          </svg>

          {NODE_IDS.map((id) => {
            const def = NODES[id];
            const c = copy[id];
            return (
              <div
                key={id}
                className={cx(
                  'af-node',
                  `tone-${def.tone}`,
                  view.nodes.includes(id) && 'is-on',
                  view.active === id && 'is-active',
                )}
                style={{ left: def.x + PAD, top: def.y + PAD, height: nodeHeight(id) }}
              >
                <div className="af-head">
                  <span className="af-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {ICONS[def.icon]}
                    </svg>
                  </span>
                  <div className="af-title">
                    <small>{c.eyebrow}</small>
                    <b>{c.title}</b>
                  </div>
                </div>

                {renderBody(id)}

                {c.rows.map((label, row) => (
                  <div className="af-row" key={row} style={{ height: rowHeight(id) }}>
                    <span>{label}</span>
                    <i
                      className={cx(
                        'af-port',
                        'out',
                        id === 'ai' && (row === 0 ? 'tone-ok' : 'tone-low'),
                      )}
                    />
                  </div>
                ))}

                {id !== 'trigger' && <i className="af-port in" />}
              </div>
            );
          })}

          {view.packet && (
            <i
              key={view.packet.key}
              className="af-packet"
              style={{ offsetPath: `path("${EDGE_PATH[view.packet.edge]}")` } as CSSProperties}
            />
          )}
        </div>
      </div>
    </div>
  );
}
