async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(path, {
      ...options,
      headers,
      credentials: 'include',
      body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body,
    });
  } catch {
    throw new Error('Cannot reach the server. Try again.');
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || 'Something went wrong.');
  }
  return data;
}

export const api = {
  me: () => request('/api/auth/me'),
  login: (body) => request('/api/auth/login', { method: 'POST', body }),
  register: (body) => request('/api/auth/register', { method: 'POST', body }),
  logout: () => request('/api/auth/logout', { method: 'POST', body: {} }),
  forgot: (body) => request('/api/auth/forgot', { method: 'POST', body }),
  zones: () => request('/api/zones'),
  quote: (zoneId) => request('/api/quote', { method: 'POST', body: { zoneId } }),
  saveOrder: (body) => request('/api/orders', { method: 'POST', body }),
};
