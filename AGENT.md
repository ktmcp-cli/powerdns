# PowerDNS CLI - Agent Instructions

## What This CLI Does

The PowerDNS CLI provides command-line access to PowerDNS Authoritative HTTP API for managing DNS servers, zones, and cache.

## Available Commands

### Configuration
- `powerdns configure --url <url> --api-key <key> --server-id <id>` - Set API settings

### Server Management
- `powerdns servers` - List all servers
- `powerdns servers --json` - List all servers (JSON output)

### Zone Management
- `powerdns zones` - List all zones
- `powerdns zones --server-id <id>` - List zones for specific server
- `powerdns zone:create --name <name>` - Create a new zone
- `powerdns zone:get --zone-id <id>` - Get zone details
- `powerdns zone:delete --zone-id <id>` - Delete a zone

### Cache Management
- `powerdns cache:flush --name <name>` - Flush cache entry

### Statistics
- `powerdns statistics` - Get server statistics

## Common Use Cases

### Setup
```bash
powerdns configure --url http://localhost:8081/api/v1 --api-key YOUR_KEY --server-id localhost
```

### List and Create Zones
```bash
powerdns zones
powerdns zone:create --name example.com
powerdns zone:get --zone-id example.com
```

### Automation Example
```bash
# Create multiple zones
for domain in example.com example.org example.net; do
  powerdns zone:create --name $domain
done
```

## Configuration

Configuration is stored in `~/.config/ktmcp-powerdns/config.json`

Settings:
- `baseUrl` - API base URL (default: http://localhost:8081/api/v1)
- `apiKey` - API key for authentication
- `defaultServerId` - Default server ID (default: localhost)

## Error Handling

The CLI will exit with code 1 on errors and display error messages to stderr.

## Integration

This CLI is designed to work seamlessly in shell scripts, CI/CD pipelines, and DNS automation workflows.
