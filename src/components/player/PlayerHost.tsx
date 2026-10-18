"use client";

import { useEffect } from "react";
import { initPlayer, usePlayer } from "./store";
import { PlayerBar } from "./PlayerBar";
import { ResumeToast } from "./ResumeToast";

export function PlayerHost() {
  useEffect(() => {
    initPlayer();

    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }
      const state = usePlayer.getState();
      if (e.code === "Space") {
        e.preventDefault();
        state.toggle();
      } else if (e.code === "ArrowLeft") {
        state.skip(-10);
      } else if (e.code === "ArrowRight") {
        state.skip(10);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <ResumeToast />
      <PlayerBar />
    </>
  );
}
