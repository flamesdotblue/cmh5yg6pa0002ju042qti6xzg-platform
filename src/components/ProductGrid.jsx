import { Plus } from 'lucide-react'

export default function ProductGrid({ products, loading, onAddToCart }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse border rounded-xl overflow-hidden">
            <div className="h-40 bg-slate-100" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-slate-100 rounded w-2/3" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
              <div className="h-9 bg-slate-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <article
          key={p.id}
          className="group border rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow"
        >
          <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
            <img
              src={p.image}
              alt={p.name}
              className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium">{p.name}</h3>
            <p className="text-sm text-slate-600 line-clamp-2 mt-1">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">${p.price.toFixed(2)}</span>
              <button
                onClick={() => onAddToCart(p)}
                className="inline-flex items-center gap-2 rounded-md bg-rose-600 text-white px-3 py-2 text-sm hover:bg-rose-700"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
