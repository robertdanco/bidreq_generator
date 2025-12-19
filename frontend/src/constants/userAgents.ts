// User agent presets for different browsers and devices

export interface UserAgentPreset {
  id: string;
  name: string;
  category: 'desktop' | 'mobile' | 'tablet' | 'ctv';
  ua: string;
  device: {
    devicetype: number;
    make: string;
    model: string;
    os: string;
    osv: string;
    w: number;
    h: number;
    pxratio: number;
  };
}

export const USER_AGENT_PRESETS: UserAgentPreset[] = [
  // Desktop Browsers
  {
    id: 'chrome-win',
    name: 'Chrome on Windows',
    category: 'desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: {
      devicetype: 2,
      make: '',
      model: '',
      os: 'Windows',
      osv: '10',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'chrome-mac',
    name: 'Chrome on macOS',
    category: 'desktop',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: {
      devicetype: 2,
      make: 'Apple',
      model: '',
      os: 'macOS',
      osv: '10.15.7',
      w: 1920,
      h: 1080,
      pxratio: 2.0,
    },
  },
  {
    id: 'safari-mac',
    name: 'Safari on macOS',
    category: 'desktop',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    device: {
      devicetype: 2,
      make: 'Apple',
      model: '',
      os: 'macOS',
      osv: '10.15.7',
      w: 1920,
      h: 1080,
      pxratio: 2.0,
    },
  },
  {
    id: 'firefox-win',
    name: 'Firefox on Windows',
    category: 'desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    device: {
      devicetype: 2,
      make: '',
      model: '',
      os: 'Windows',
      osv: '10',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'edge-win',
    name: 'Edge on Windows',
    category: 'desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    device: {
      devicetype: 2,
      make: '',
      model: '',
      os: 'Windows',
      osv: '10',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'chrome-linux',
    name: 'Chrome on Linux',
    category: 'desktop',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: {
      devicetype: 2,
      make: '',
      model: '',
      os: 'Linux',
      osv: '',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },

  // Mobile Browsers
  {
    id: 'safari-iphone',
    name: 'Safari on iPhone',
    category: 'mobile',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    device: {
      devicetype: 4,
      make: 'Apple',
      model: 'iPhone',
      os: 'iOS',
      osv: '17.0',
      w: 390,
      h: 844,
      pxratio: 3.0,
    },
  },
  {
    id: 'chrome-iphone',
    name: 'Chrome on iPhone',
    category: 'mobile',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.101 Mobile/15E148 Safari/604.1',
    device: {
      devicetype: 4,
      make: 'Apple',
      model: 'iPhone',
      os: 'iOS',
      osv: '17.0',
      w: 390,
      h: 844,
      pxratio: 3.0,
    },
  },
  {
    id: 'chrome-android',
    name: 'Chrome on Android',
    category: 'mobile',
    ua: 'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    device: {
      devicetype: 4,
      make: 'Google',
      model: 'Pixel 8 Pro',
      os: 'Android',
      osv: '14',
      w: 412,
      h: 915,
      pxratio: 2.625,
    },
  },
  {
    id: 'samsung-browser',
    name: 'Samsung Browser',
    category: 'mobile',
    ua: 'Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/23.0 Chrome/115.0.0.0 Mobile Safari/537.36',
    device: {
      devicetype: 4,
      make: 'Samsung',
      model: 'Galaxy S24 Ultra',
      os: 'Android',
      osv: '14',
      w: 412,
      h: 915,
      pxratio: 3.0,
    },
  },
  {
    id: 'firefox-android',
    name: 'Firefox on Android',
    category: 'mobile',
    ua: 'Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0',
    device: {
      devicetype: 4,
      make: 'Google',
      model: 'Pixel',
      os: 'Android',
      osv: '14',
      w: 412,
      h: 915,
      pxratio: 2.625,
    },
  },

  // Tablets
  {
    id: 'safari-ipad',
    name: 'Safari on iPad',
    category: 'tablet',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    device: {
      devicetype: 5,
      make: 'Apple',
      model: 'iPad',
      os: 'iOS',
      osv: '17.0',
      w: 1024,
      h: 1366,
      pxratio: 2.0,
    },
  },
  {
    id: 'chrome-ipad',
    name: 'Chrome on iPad',
    category: 'tablet',
    ua: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.101 Mobile/15E148 Safari/604.1',
    device: {
      devicetype: 5,
      make: 'Apple',
      model: 'iPad',
      os: 'iOS',
      osv: '17.0',
      w: 1024,
      h: 1366,
      pxratio: 2.0,
    },
  },
  {
    id: 'chrome-android-tablet',
    name: 'Chrome on Android Tablet',
    category: 'tablet',
    ua: 'Mozilla/5.0 (Linux; Android 14; SM-X910) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    device: {
      devicetype: 5,
      make: 'Samsung',
      model: 'Galaxy Tab S9 Ultra',
      os: 'Android',
      osv: '14',
      w: 1848,
      h: 2960,
      pxratio: 2.0,
    },
  },

  // Connected TV
  {
    id: 'samsung-tv',
    name: 'Samsung Smart TV',
    category: 'ctv',
    ua: 'Mozilla/5.0 (SMART-TV; LINUX; Tizen 7.0) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/5.0 Chrome/85.0.4183.93 Safari/537.36',
    device: {
      devicetype: 3,
      make: 'Samsung',
      model: 'Smart TV',
      os: 'Tizen',
      osv: '7.0',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'lg-webos',
    name: 'LG webOS TV',
    category: 'ctv',
    ua: 'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 WebAppManager',
    device: {
      devicetype: 3,
      make: 'LG',
      model: 'Smart TV',
      os: 'webOS',
      osv: '6.0',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'firetv',
    name: 'Amazon Fire TV',
    category: 'ctv',
    ua: 'Mozilla/5.0 (Linux; Android 9; AFTSSS Build/PS7233) AppleWebKit/537.36 (KHTML, like Gecko) Silk/120.0.0.0 like Chrome/120.0.0.0 Safari/537.36',
    device: {
      devicetype: 7,
      make: 'Amazon',
      model: 'Fire TV Stick 4K',
      os: 'Fire OS',
      osv: '9',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'roku',
    name: 'Roku TV',
    category: 'ctv',
    ua: 'Roku/DVP-10.0 (10.0.0.4195)',
    device: {
      devicetype: 3,
      make: 'Roku',
      model: 'Streaming Stick 4K',
      os: 'Roku OS',
      osv: '10.0',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
  {
    id: 'appletv',
    name: 'Apple TV',
    category: 'ctv',
    ua: 'AppleTV11,1/17.0',
    device: {
      devicetype: 7,
      make: 'Apple',
      model: 'Apple TV 4K',
      os: 'tvOS',
      osv: '17.0',
      w: 1920,
      h: 1080,
      pxratio: 1.0,
    },
  },
];

export const getUserAgentById = (id: string): UserAgentPreset | undefined => {
  return USER_AGENT_PRESETS.find(ua => ua.id === id);
};

export const getUserAgentsByCategory = (category: UserAgentPreset['category']): UserAgentPreset[] => {
  return USER_AGENT_PRESETS.filter(ua => ua.category === category);
};
