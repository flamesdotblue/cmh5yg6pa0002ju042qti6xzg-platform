import { ShoppingCart, User, LogOut } from 'lucide-react'

export default function HeaderNav({ cartCount, onCartClick, onAuthClick, onLogout, user }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-rose-500" />
          <span className="font-semibold tracking-tight">Sweet Bloom</span>
        </a>
        <nav className="flex items-center gap-2">
          {user ? (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={onAuthClick}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
            >
              <User className="h-4 w-4" />
              <span>Sign in</span>
            </button>
          )}
          <button
            onClick={onCartClick}
            className="relative inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-rose-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
