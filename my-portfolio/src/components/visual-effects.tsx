"use client";

import { useEffect, useRef } from "react";

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

type Signal = {
  from: number;
  to: number;
  startedAt: number;
  duration: number;
};

const MAX_NODES = 78;
const CONNECT_DISTANCE = 145;
const CONNECT_DISTANCE_SQUARED = CONNECT_DISTANCE * CONNECT_DISTANCE;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smoothstep(value: number) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

export function VisualEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const canvasElement = canvas;
    const drawingContext = context;

    const nodes: NodePoint[] = [];
    const signals: Signal[] = [];

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      lastFrame: 0,
      lastSignalSpawn: 0,
    };

    let frameId = 0;

    function createNode() {
      return {
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * 0.09,
        vy: (Math.random() - 0.5) * 0.09,
        radius: 1 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
      } satisfies NodePoint;
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      state.width = width;
      state.height = height;
      state.dpr = dpr;

      canvasElement.width = Math.floor(width * dpr);
      canvasElement.height = Math.floor(height * dpr);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;

      drawingContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        const count = clamp(Math.round((width * height) / 23000), 58, MAX_NODES);
        for (let index = 0; index < count; index += 1) {
          nodes.push(createNode());
        }
      }
    }

    function spawnSignal(now: number, connections: Array<{ from: number; to: number }>) {
      if (!connections.length || signals.length >= 2) {
        return;
      }

      const connection = connections[Math.floor(Math.random() * connections.length)];
      signals.push({
        from: connection.from,
        to: connection.to,
        startedAt: now,
        duration: 1300 + Math.random() * 800,
      });
    }

    function drawNode(node: NodePoint, now: number) {
      const pulse = 0.78 + 0.22 * Math.sin(now * 0.0018 + node.phase);
      const radius = node.radius * (0.86 + pulse * 0.45);
      const alpha = 0.4 + pulse * 0.28;

      drawingContext.beginPath();
      drawingContext.fillStyle = `rgba(0, 245, 212, ${alpha})`;
      drawingContext.shadowColor = "rgba(0, 245, 212, 0.2)";
      drawingContext.shadowBlur = 8;
      drawingContext.arc(node.x, node.y, radius, 0, Math.PI * 2);
      drawingContext.fill();
    }

    function draw(now: number) {
      const delta = Math.min(28, now - state.lastFrame || 16);
      state.lastFrame = now;

      drawingContext.clearRect(0, 0, state.width, state.height);
      drawingContext.fillStyle = "rgba(3, 4, 8, 0.18)";
      drawingContext.fillRect(0, 0, state.width, state.height);

      const connections: Array<{ from: number; to: number }> = [];

      for (let index = 0; index < nodes.length; index += 1) {
        const current = nodes[index];
        current.x += current.vx * (delta / 16.667);
        current.y += current.vy * (delta / 16.667);

        if (current.x < -20) current.x = state.width + 20;
        if (current.x > state.width + 20) current.x = -20;
        if (current.y < -20) current.y = state.height + 20;
        if (current.y > state.height + 20) current.y = -20;

        for (let compare = index + 1; compare < nodes.length; compare += 1) {
          const other = nodes[compare];
          const dx = current.x - other.x;
          const dy = current.y - other.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > CONNECT_DISTANCE_SQUARED) {
            continue;
          }

          const distance = Math.sqrt(distanceSquared);
          const proximity = 1 - distance / CONNECT_DISTANCE;
          const alpha = 0.08 + proximity * 0.09;

          connections.push({ from: index, to: compare });

          drawingContext.beginPath();
          drawingContext.lineWidth = 0.5 + proximity * 0.2;
          drawingContext.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
          drawingContext.shadowBlur = 0;
          drawingContext.moveTo(current.x, current.y);
          drawingContext.lineTo(other.x, other.y);
          drawingContext.stroke();
        }
      }

      if (now - state.lastSignalSpawn > 1400) {
        if (Math.random() < 0.4) {
          spawnSignal(now, connections);
        }
        state.lastSignalSpawn = now;
      }

      for (let signalIndex = signals.length - 1; signalIndex >= 0; signalIndex -= 1) {
        const signal = signals[signalIndex];
        const startNode = nodes[signal.from];
        const endNode = nodes[signal.to];

        if (!startNode || !endNode) {
          signals.splice(signalIndex, 1);
          continue;
        }

        const progress = smoothstep((now - signal.startedAt) / signal.duration);
        const x = lerp(startNode.x, endNode.x, progress);
        const y = lerp(startNode.y, endNode.y, progress);

        drawingContext.beginPath();
        drawingContext.fillStyle = "rgba(224, 255, 251, 0.24)";
        drawingContext.shadowColor = "rgba(0, 245, 212, 0.45)";
        drawingContext.shadowBlur = 10;
        drawingContext.arc(x, y, 1.8, 0, Math.PI * 2);
        drawingContext.fill();

        if (progress >= 1) {
          signals.splice(signalIndex, 1);
        }
      }

      for (const node of nodes) {
        drawNode(node, now);
      }

      frameId = window.requestAnimationFrame(draw);
    }

    resizeCanvas();
    frameId = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="neural-network-canvas fixed inset-0 z-0 h-full w-full" />;
}
