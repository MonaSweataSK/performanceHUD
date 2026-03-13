#!/usr/bin/env node

/**
 * Bumps version in both package.json and lib-package.json,
 * then creates a git tag.
 *
 * Usage: node scripts/bump-version.js [patch|minor|major]
 */

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const type = process.argv[2];
if (!['patch', 'minor', 'major'].includes(type)) {
  console.error('Usage: node scripts/bump-version.js [patch|minor|major]');
  process.exit(1);
}

// Staged changes check and pre-commit
try {
  // Check if there are staged changes (returns non-zero if there are)
  execSync('git diff --cached --quiet', { cwd: root });
} catch (e) {
  console.log('📝 Committing staged changes before release...');
  execSync('git commit -m "chore: pre-release updates"', { cwd: root, stdio: 'inherit' });
}

// Read current version from lib-package.json (source of truth)
const libPkgPath = resolve(root, 'lib-package.json');
const rootPkgPath = resolve(root, 'package.json');

const libPkg = JSON.parse(readFileSync(libPkgPath, 'utf-8'));
const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'));

const [major, minor, patch] = libPkg.version.split('.').map(Number);

let newVersion;
if (type === 'major') newVersion = `${major + 1}.0.0`;
if (type === 'minor') newVersion = `${major}.${minor + 1}.0`;
if (type === 'patch') newVersion = `${major}.${minor}.${patch + 1}`;

// Update both files
libPkg.version = newVersion;
rootPkg.version = newVersion;

writeFileSync(libPkgPath, JSON.stringify(libPkg, null, 2) + '\n');
writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');

console.log(`\n📦 Version bumped: ${major}.${minor}.${patch} → ${newVersion}\n`);

// Stage, commit, and tag the release
execSync('git add .', { cwd: root, stdio: 'inherit' });
execSync(`git commit -m "release: v${newVersion}"`, { cwd: root, stdio: 'inherit' });
execSync(`git tag v${newVersion}`, { cwd: root, stdio: 'inherit' });

console.log(`\n✅ Tagged v${newVersion}`);
console.log(`\n👉 Run this to publish:\n   git push origin master --tags\n`);
