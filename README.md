# App Rangooo

"build": "prisma generate --schema=./node_modules/@misael1981/rangooo-database/prisma/schema.prisma && next build --webpack",
"build": "next build --webpack",

```
Erro ao enviar push: Error [WebPushError]: Received unexpected response code
    at ignore-listed frames {
  statusCode: 410,
  headers: {
    'content-security-policy-report-only': "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/goa-520bfc14_2",
    'content-type': 'text/plain; charset=utf-8',
    'cross-origin-opener-policy': 'same-origin',
    vary: 'Sec-Fetch-Site, Sec-Fetch-Mode, Sec-Fetch-Dest',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0',
    date: 'Sun, 28 Jun 2026 11:11:54 GMT',
    'content-length': '47',
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000'
  },
  body: 'push subscription has unsubscribed or expired.\n',
  endpoint: 'https://fcm.googleapis.com/fcm/send/c57QiZ3vxvU:APA91bHxrF5d7Huzm2ocsA8b2TcJqf865NSI0wjw0EnQrW3g7oCUCaKhQRb_B7P2m3dHyXLbbu_T8HsiZuwR7OjGNmrTdsOotC10vrqxYsSBelUdi0gqUsr_irPhcYWxAGu2wryKnNmm'
}
⚠️ Impressora do Congo's Burger offline
DADOS ENVIADOS PARA O ELECTRON: {
  "id": "27b382a0-2eaf-43a0-a98e-8690ea5577cc",
  "restaurantName": "Congo's Burger",
  "number": "#2802",
  "customerName": "Misael Borges",
  "customerPhone": "(35) 9 9911-0933",
  "method": "DELIVERY",
  "deliveryFee": 6,
  "payment": "pix",
  "items": [
    {
      "name": "CongOferta Média Congo Mac Duplo",
      "category": "Combos",
      "quantity": 1,
      "price": 39.9,
      "isDouble": false,
      "flavor1": null,
      "flavor2": null
    }
  ],
  "total": 45.9,
  "details": {
    "city": "Congonhal",
    "number": "106",
    "street": "Julio Fernandes De Morais",
    "areaType": "URBAN",
    "reference": null,
    "complement": null,
    "neighborhood": "Bela Vista "
  }
}
 POST /hamburguerias/congos-burger/menu/752d8ea5-e141-4487-b223-9c0019be14f4?consumptionMethod=DELIVERY 200 in 6.1s (next.js: 12ms, application-code: 6.1s)
  └─ ƒ createOrder({"consumptionMethod":"DELIVERY","customer":{"name":"","phone":""},"delivery":{"address":"[Object]"},"...":"4 items not stringified"}) in 5825ms ..//src/app/action/create-order.ts
 GET /api/auth/session 200 in 685ms (next.js: 25ms, application-code: 660ms)
```
