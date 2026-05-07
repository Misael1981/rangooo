# App Rangooo

```
function mapPrinterItem(item: PrinterOrderDTO["items"][number]) {
  const flavor1Extras = item.isDouble
    ? Array.isArray(item.flavor1additionalIngredients)
      ? (item.flavor1additionalIngredients as OrderExtraDTO[])
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e)
      : []
    : parseJsonArray<OrderExtraDTO>(item.extras)
        .map((e) => e.name || e.title)
        .filter((e): e is string => !!e)

  const flavor1Removed = item.isDouble
    ? parseJsonArray<string>(item.flavor1Removed)
    : parseJsonArray<string>(item.removedIngredients)

  let flavor2Info = null
  if (item.isDouble && item.flavor2Name) {
    const f2Extras = Array.isArray(item.flavor2additionalIngredients)
      ? (item.flavor2additionalIngredients as OrderExtraDTO[])
          .map((e) => e.name || e.title)
          .filter((e): e is string => !!e)
      : []

    const f2Removed = parseJsonArray<string>(item.flavor2Removed)

    flavor2Info = {
      name: item.flavor2Name,
      extras: f2Extras,
      removed: f2Removed,
    }
  }

  return {
    name: item.customName,
    category: item.product?.menuCategory?.name || "Geral",
    quantity: item.quantity,
    price: Number(item.priceAtOrder),

    flavor1: {
      name: item.isDouble ? item.flavor1Name || "Sabor 1" : item.customName,
      extras: flavor1Extras,
      removed: flavor1Removed,
    },

    isDouble: item.isDouble,
    flavor2: flavor2Info,
  }
}
```
