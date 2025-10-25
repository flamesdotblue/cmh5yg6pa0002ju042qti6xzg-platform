import { X, Plus, Minus, Trash2, CreditCard, Lock } from 'lucide-react'

export default function Cart({ open, onClose, items, onIncrement, onDecrement, onRemove, total, onCheckout, requiresAuth, onRequireAuth }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl border-l transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[calc(100%-160px)] overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-slate-600">Your cart is empty. Add some treats!</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="h-16 w-16 rounded-md bg-slate-100 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium leading-tight">{item.name || 'Item'}</p>
                      <p className="text-sm text-slate-600">${Number(item.price).toFixed(2)}</p>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="p-2 text-slate-500 hover:text-rose-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-2">
                    <button onClick={() => onDecrement(item.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-slate-50">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                    <button onClick={() => onIncrement(item.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-md border hover:bg-slate-50">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-lg font-semibold">${total.toFixed(2)}</span>
          </div>
          {requiresAuth ? (
            <button
              onClick={onRequireAuth}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 text-white px-4 py-2 hover:bg-slate-800"
              disabled={items.length === 0}
            >
              <Lock className="h-4 w-4" />
              Sign in to checkout
            </button>
          ) : (
            <button
              onClick={onCheckout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-rose-600 text-white px-4 py-2 hover:bg-rose-700 disabled:opacity-60"
              disabled={items.length === 0}
            >
              <CreditCard className="h-4 w-4" />
              Secure Checkout
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}
