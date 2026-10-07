#!/usr/bin/env node
// Verifica os pares de cor da marca Intus contra WCAG 2.2.
// Uso: node scripts/check-contrast.mjs

const T = {
  red:  '#e33e26', ink:   '#12151a', cream: '#f5f4df',
  blue: '#4160ac', sand:  '#ddb795',
  redOnDark: '#e4462f', redOnLight: '#d0321b',
  raised: '#1a1e24',
};

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// min: 4.5 texto normal | 3.0 texto grande e componente | 0 = proibido em qualquer uso
const RULES = [
  ['texto primario sobre base',      T.cream,      T.ink,    4.5],
  ['texto primario sobre raised',    T.cream,      T.raised, 4.5],
  ['texto secundario sobre base',    T.sand,       T.ink,    4.5],
  ['texto sobre superficie clara',   T.ink,        T.cream,  4.5],
  ['azul sobre superficie clara',    T.blue,       T.cream,  4.5],
  ['vermelho legivel sobre escuro',  T.redOnDark,  T.ink,    4.5],
  ['vermelho legivel sobre claro',   T.redOnLight, T.cream,  4.5],
  ['anel de foco sobre base',        T.sand,       T.ink,    3.0],
  ['display vermelho sobre base',    T.red,        T.ink,    3.0],
  ['label creme sobre vermelho',     T.cream,      T.red,    3.0],
];

// Pares que nao podem existir em nenhum tamanho.
const BANNED = [
  ['areia sobre creme', T.sand, T.cream],
];

let failed = 0;
console.log('\n  par                              ratio   min   status');
console.log('  ' + '-'.repeat(56));
for (const [name, fg, bg, min] of RULES) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`  ${name.padEnd(32)} ${r.toFixed(2).padStart(5)}  ${min.toFixed(1)}   ${ok ? 'ok' : 'FALHA'}`);
}
for (const [name, fg, bg] of BANNED) {
  const r = ratio(fg, bg);
  failed++;
  console.log(`  ${name.padEnd(32)} ${r.toFixed(2).padStart(5)}    --   PROIBIDO (nunca combinar)`);
}

// Lembrete estrutural: o vermelho bruto nunca serve de texto normal.
const worst = Math.max(ratio(T.cream, T.red), ratio(T.ink, T.red), ratio('#ffffff', T.red));
console.log(`\n  melhor rotulo possivel sobre #e33e26: ${worst.toFixed(2)} (< 4.5)`);
console.log('  logo: vermelho e superficie, nao cor de texto.\n');

if (failed > BANNED.length) {
  console.error(`  ${failed - BANNED.length} par(es) reprovaram.\n`);
  process.exit(1);
}
console.log('  Todos os pares em uso passam.\n');
