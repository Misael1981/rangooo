// components/MenuPreview.jsx (opcional, para step de confirmação)
"use client";

const MenuPreview = ({ menu }) => {
  if (!menu) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Prévia do Cardápio</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700">
            Categorias ({menu.menuCategory?.length || 0})
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {menu.menuCategory?.map((cat, idx) => (
              <span
                key={idx}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-700">
            Produtos ({menu.products?.length || 0})
          </h4>
          <div className="mt-2 space-y-3">
            {menu.products?.map((product, idx) => (
              <div key={idx} className="rounded-lg border p-3">
                <div className="flex justify-between">
                  <h5 className="font-medium">{product.name}</h5>
                  <span className="font-semibold text-green-600">
                    R$ {product.price?.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {product.description}
                </p>
                <div className="mt-2">
                  <span className="text-xs font-medium text-gray-500">
                    Categoria:{" "}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                    {product.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {menu.additionalIngredients?.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700">
              Ingredientes Extras ({menu.additionalIngredients?.length})
            </h4>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {menu.additionalIngredients?.map((ing, idx) => (
                <div key={idx} className="rounded border p-2 text-sm">
                  <div className="font-medium">{ing.name}</div>
                  <div className="text-green-600">
                    + R$ {ing.price?.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
