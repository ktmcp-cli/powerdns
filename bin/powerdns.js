#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import {
  configure, listServers, listZones, createZone,
  getZone, deleteZone, flushCache, getStatistics
} from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('powerdns')
  .description(chalk.cyan('PowerDNS Authoritative HTTP API CLI'))
  .version(packageJson.version);

program
  .command('configure')
  .description('Configure API settings')
  .option('-u, --url <url>', 'API base URL')
  .option('-k, --api-key <key>', 'API key')
  .option('-s, --server-id <id>', 'Default server ID')
  .action(configure);

program
  .command('servers')
  .description('List all servers')
  .option('--json', 'Output as JSON')
  .action(listServers);

program
  .command('zones')
  .description('List all zones')
  .option('-s, --server-id <id>', 'Server ID')
  .option('--json', 'Output as JSON')
  .action(listZones);

program
  .command('zone:create')
  .description('Create a new zone')
  .requiredOption('-n, --name <name>', 'Zone name')
  .option('-s, --server-id <id>', 'Server ID')
  .option('--json', 'Output as JSON')
  .action(createZone);

program
  .command('zone:get')
  .description('Get zone details')
  .requiredOption('-z, --zone-id <id>', 'Zone ID')
  .option('-s, --server-id <id>', 'Server ID')
  .option('--json', 'Output as JSON')
  .action(getZone);

program
  .command('zone:delete')
  .description('Delete a zone')
  .requiredOption('-z, --zone-id <id>', 'Zone ID')
  .option('-s, --server-id <id>', 'Server ID')
  .action(deleteZone);

program
  .command('cache:flush')
  .description('Flush cache entry')
  .requiredOption('-n, --name <name>', 'Entry name to flush')
  .option('-s, --server-id <id>', 'Server ID')
  .action(flushCache);

program
  .command('statistics')
  .description('Get server statistics')
  .option('-s, --server-id <id>', 'Server ID')
  .option('--json', 'Output as JSON')
  .action(getStatistics);

program.parse(process.argv);
