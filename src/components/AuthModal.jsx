import { useState } from 'react'
import { X, LogIn } from 'lucide-react'
import { api } from '../lib/api'

export default function AuthModal({ open, mode = 'login', onClose, onSwitchMode, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      let res
      if (mode === 'login') {
        res = await api.login({ email: form.email, password: form.password })
      } else {
        res = await api.register({ name: form.name, email: form.email, password: form.password })
      }
      if (res?.token) {
        onSuccess({ name: res.name, email: res.email, token: res.token })
      } else {
        setError('Unexpected response from server')
      }
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-sm text-slate-700">Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  placeholder="Jane Baker"
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-700">Password</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="text-sm text-rose-600 bg-rose-50 border border-rose-100 px-3 py-2 rounded-md">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 text-white px-4 py-2 hover:bg-slate-800 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <div className="p-4 pt-0 text-sm text-center text-slate-600">
            {mode === 'login' ? (
              <p>
                New here?{' '}
                <button className="text-rose-700 hover:underline" onClick={() => onSwitchMode('register')}>
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button className="text-rose-700 hover:underline" onClick={() => onSwitchMode('login')}>
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
