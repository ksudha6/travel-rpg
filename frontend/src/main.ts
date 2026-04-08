import Phaser from 'phaser';
import { GAME_CONFIG } from './config/game';

// ─── Game Entry Point ───────────────────────────────────────
// This file boots Phaser with the game config.
// Scenes are added to GAME_CONFIG.scene[] as iterations build them.
//
// Iteration 001: Title screen only
// Iteration 002: + Character select
// Iteration 003: + Market overview
// Iteration 004-008: + Journey phases 1-5
// Iteration 009: + Strategy screens
// Iteration 010: + Polish

const game = new Phaser.Game(GAME_CONFIG);

// For debugging in dev — remove before deploy
if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).__PHASER_GAME__ = game;
}
