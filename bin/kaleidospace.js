#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🌟 KALEIDOspace — Celebrating life (Life Operating System)');
console.log('🚀 Starte KALEIDOspace Server & öffne Browser...\n');

const viteProcess = spawn('npx', ['vite', '--open'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true,
});

viteProcess.on('error', (err) => {
  console.error('Fehler beim Starten von KALEIDOspace:', err);
});
