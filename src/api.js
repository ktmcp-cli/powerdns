import axios from 'axios';
import { getConfig } from './config.js';

function getClient() {
  const baseUrl = getConfig('baseUrl') || 'http://localhost:8081/api/v1';
  const apiKey = getConfig('apiKey');

  return axios.create({
    baseURL: baseUrl,
    headers: {
      'X-API-Key': apiKey || '',
      'Content-Type': 'application/json'
    }
  });
}

export async function listServers() {
  const client = getClient();
  const response = await client.get('/servers');
  return response.data;
}

export async function listZones(serverId) {
  const client = getClient();
  const response = await client.get(`/servers/${serverId}/zones`);
  return response.data;
}

export async function createZone(serverId, name) {
  const client = getClient();
  const response = await client.post(`/servers/${serverId}/zones`, {
    name: name,
    kind: 'Native'
  });
  return response.data;
}

export async function getZone(serverId, zoneId) {
  const client = getClient();
  const response = await client.get(`/servers/${serverId}/zones/${zoneId}`);
  return response.data;
}

export async function deleteZone(serverId, zoneId) {
  const client = getClient();
  await client.delete(`/servers/${serverId}/zones/${zoneId}`);
}

export async function flushCache(serverId, name) {
  const client = getClient();
  await client.put(`/servers/${serverId}/cache/flush?domain=${name}`);
}

export async function getStatistics(serverId) {
  const client = getClient();
  const response = await client.get(`/servers/${serverId}/statistics`);
  return response.data;
}
