import Conf from 'conf';

const config = new Conf({
  projectName: 'ktmcp-powerdns'
});

export function getConfig(key) {
  return config.get(key);
}

export function setConfig(key, value) {
  config.set(key, value);
}

export function getAllConfig() {
  return config.store;
}
