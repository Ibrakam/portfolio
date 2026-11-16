"use client";

import { useRef } from "react";

export function Scene3D() {
  const rigRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rigRef.current?.style.setProperty("--tilt-x", `${-y * 14}deg`);
    rigRef.current?.style.setProperty("--tilt-y", `${x * 18}deg`);
  }

  function resetTilt() {
    rigRef.current?.style.setProperty("--tilt-x", "0deg");
    rigRef.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div className="scene-shell" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="scene-glow" />
      <div className="scene-rig" ref={rigRef} aria-hidden="true">
        <div className="orbit orbit-one">
          <span className="orbit-node node-api">UI</span>
          <span className="orbit-node node-db">API</span>
        </div>
        <div className="orbit orbit-two">
          <span className="orbit-node node-queue">DATA</span>
          <span className="orbit-node node-worker">QUEUE</span>
        </div>
        <div className="orbit orbit-three" />

        <div className="core-cube">
          <div className="cube-face cube-front">APP</div>
          <div className="cube-face cube-back">OPS</div>
          <div className="cube-face cube-right">API</div>
          <div className="cube-face cube-left">UI</div>
          <div className="cube-face cube-top">01</div>
          <div className="cube-face cube-bottom">UP</div>
        </div>

        <span className="pulse pulse-one" />
        <span className="pulse pulse-two" />
        <span className="pulse pulse-three" />
      </div>
      <div className="scene-coordinates"><span>FULL.STACK</span><span>READY / 100%</span></div>
    </div>
  );
}
