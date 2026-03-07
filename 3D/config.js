// config.js - Central configuration for Home Assistant connection

const HomeAssistantConfig = {
  // Remote connection (cloud)
  remote: {
    url: "wss://demo.lumihomepro1.com/api/websocket",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0OWU5NDM5ZWRjNWM0YTM4OTgzZmE5NzIyNjU0ZjY5MiIsImlhdCI6MTc2ODI5NjI1NSwiZXhwIjoyMDgzNjU2MjU1fQ.5C9sFe538kogRIL63dlwweBJldwhmQ7eoW86GEWls8U"
  },
  
  // Local connection - UPDATE THESE VALUES WITH YOUR LOCAL HA DETAILS
  local: {
    url: "ws://192.168.2.25:8123/api/websocket",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0OWU5NDM5ZWRjNWM0YTM4OTgzZmE5NzIyNjU0ZjY5MiIsImlhdCI6MTc2ODI5NjI1NSwiZXhwIjoyMDgzNjU2MjU1fQ.5C9sFe538kogRIL63dlwweBJldwhmQ7eoW86GEWls8U"  // Replace with your local token
  },
  
  // Current active connection (will be set by mode selector)
  active: {
    url: "wss://demo.lumihomepro1.com/api/websocket",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0OWU5NDM5ZWRjNWM0YTM4OTgzZmE5NzIyNjU0ZjY5MiIsImlhdCI6MTc2ODI5NjI1NSwiZXhwIjoyMDgzNjU2MjU1fQ.5C9sFe538kogRIL63dlwweBJldwhmQ7eoW86GEWls8U"
  },
  
  // Connection settings
  maxReconnectAttempts: 10,
  reconnectInterval: 3000,
  
  // Helper method to get current WebSocket URL with proper protocol
  getWebSocketUrl: function() {
    if (this.active.url.startsWith('https://')) {
      return this.active.url.replace('https://', 'wss://');
    } else if (this.active.url.startsWith('http://')) {
      return this.active.url.replace('http://', 'ws://');
    } else {
      return this.active.url; // Already a WebSocket URL
    }
  },
  
  // Switch to remote mode
  switchToRemote: function() {
    this.active.url = this.remote.url;
    this.active.token = this.remote.token;
    localStorage.setItem('lastConnectionMode', 'remote');
    return this.active;
  },
  
  // Switch to local mode
  switchToLocal: function() {
    this.active.url = this.local.url;
    this.active.token = this.local.token;
    localStorage.setItem('lastConnectionMode', 'local');
    return this.active;
  },
  
  // Initialize with saved mode
  init: function() {
    const lastMode = localStorage.getItem('lastConnectionMode');
    if (lastMode === 'local' && this.local.url && this.local.token) {
      this.switchToLocal();
    } else {
      this.switchToRemote(); // Default to remote
    }
    return this.active;
  }
};

// Initialize the config
// Initialize the config - this should already be at the bottom
HomeAssistantConfig.init();

// Export for use in other modules
window.HomeAssistantConfig = HomeAssistantConfig;

// Also expose CONFIG for mode-selector.html
window.CONFIG = {
  remote: {
    WS_URL: HomeAssistantConfig.remote.url,
    TOKEN: HomeAssistantConfig.remote.token
  },
  local: {
    WS_URL: HomeAssistantConfig.local.url,
    TOKEN: HomeAssistantConfig.local.token
  }
};