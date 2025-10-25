const API_BASE = '/api'

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const message = text || `Request failed with ${res.status}`
    throw new Error(message)
  }
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  return {}
}

export const api = {
  async getProducts() {
    try {
      const data = await request('/products')
      return Array.isArray(data) ? data : data.items || []
    } catch (e) {
      return [
        {
          id: 'classic-vanilla',
          name: 'Classic Vanilla',
          description: 'Fluffy vanilla sponge with silky buttercream frosting.',
          price: 24.0,
          image:
            'https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1374&auto=format&fit=crop',
        },
        {
          id: 'chocolate-ganache',
          name: 'Chocolate Ganache',
          description: 'Rich cocoa layers drenched in dark chocolate ganache.',
          price: 28.0,
          image:
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1374&auto=format&fit=crop',
        },
        {
          id: 'strawberry-cream',
          name: 'Strawberry Cream',
          description: 'Vanilla sponge with fresh strawberry compote and cream.',
          price: 26.0,
          image:
            'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1374&auto=format&fit=crop',
        },
        {
          id: 'lemon-zest',
          name: 'Lemon Zest',
          description: 'Zesty lemon cake with tangy glaze and candied peel.',
          price: 25.0,
          image:
            'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1374&auto=format&fit=crop',
        },
        {
          id: 'red-velvet',
          name: 'Red Velvet',
          description: 'Velvety crimson layers with cream cheese frosting.',
          price: 29.0,
          image:
            'https://images.unsplash.com/photo-1614707267537-3f030418ab8d?q=80&w=1374&auto=format&fit=crop',
        },
        {
          id: 'carrot-walnut',
          name: 'Carrot Walnut',
          description: 'Spiced carrot cake with toasted walnuts and cream cheese.',
          price: 27.0,
          image:
            'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1374&auto=format&fit=crop',
        },
      ]
    }
  },

  async login({ email, password }) {
    const data = await request('/auth/login', { method: 'POST', body: { email, password } })
    return data
  },

  async register({ name, email, password }) {
    const data = await request('/auth/register', { method: 'POST', body: { name, email, password } })
    return data
  },

  async checkout(cart, token) {
    const payload = { items: cart.map((i) => ({ id: i.id, quantity: i.quantity })) }
    const data = await request('/checkout/session', { method: 'POST', body: payload, token })
    return data
  },
}
