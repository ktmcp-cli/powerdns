import { getConfig, setConfig } from './config.js';
import * as api from './api.js';
import chalk from 'chalk';

export async function configure(options) {
  if (options.url) setConfig('baseUrl', options.url);
  if (options.apiKey) setConfig('apiKey', options.apiKey);
  if (options.serverId) setConfig('defaultServerId', options.serverId);
  console.log(chalk.green('✓'), 'Configuration saved');
}

export async function listServers(options) {
  try {
    const servers = await api.listServers();
    if (options.json) {
      console.log(JSON.stringify(servers, null, 2));
    } else {
      console.log(chalk.cyan('Servers:'));
      servers.forEach(s => console.log(`  - ${s.id}: ${s.daemon_type} v${s.version}`));
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function listZones(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    const zones = await api.listZones(serverId);
    if (options.json) {
      console.log(JSON.stringify(zones, null, 2));
    } else {
      console.log(chalk.cyan(`Zones (${serverId}):`));
      zones.forEach(z => console.log(`  - ${z.name} (${z.kind})`));
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function createZone(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    const zone = await api.createZone(serverId, options.name);
    if (options.json) {
      console.log(JSON.stringify(zone, null, 2));
    } else {
      console.log(chalk.green('✓'), `Zone created: ${zone.name}`);
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function getZone(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    const zone = await api.getZone(serverId, options.zoneId);
    if (options.json) {
      console.log(JSON.stringify(zone, null, 2));
    } else {
      console.log(chalk.cyan(`Zone: ${zone.name}`));
      console.log(`  Kind: ${zone.kind}`);
      console.log(`  Serial: ${zone.serial}`);
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function deleteZone(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    await api.deleteZone(serverId, options.zoneId);
    console.log(chalk.green('✓'), `Zone deleted: ${options.zoneId}`);
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function flushCache(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    await api.flushCache(serverId, options.name);
    console.log(chalk.green('✓'), `Cache flushed: ${options.name}`);
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

export async function getStatistics(options) {
  try {
    const serverId = options.serverId || getConfig('defaultServerId') || 'localhost';
    const stats = await api.getStatistics(serverId);
    if (options.json) {
      console.log(JSON.stringify(stats, null, 2));
    } else {
      console.log(chalk.cyan('Statistics:'));
      stats.forEach(s => console.log(`  ${s.name}: ${s.value}`));
    }
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}
