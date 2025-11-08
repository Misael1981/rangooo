# 🎨 Layouts Personalizados por Tipo de Estabelecimento

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura Proposta](#arquitetura-proposta)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Implementação Passo a Passo](#implementação-passo-a-passo)
5. [Exemplos de Customização](#exemplos-de-customização)
6. [Boas Práticas](#boas-práticas)

---

## 🎯 Visão Geral

Este documento detalha como implementar layouts personalizados para diferentes tipos de estabelecimentos (Pizzaria, Restaurante, Sorveteria, etc.) no projeto Rangooo.

### Tipos de Estabelecimento Disponíveis
Conforme definido no `schema.prisma`:
- `RESTAURANT` - Restaurantes genéricos
- `PIZZARIA` - Pizzarias
- `HAMBURGUERIA` - Hamburguerias
- `SORVETERIA` - Sorveterias
- `ACAI` - Açaiterias
- `SAUDAVEL` - Comida saudável
- `DOCES` - Docerias

### Diferenças de Layout por Tipo

#### 🍕 Pizzaria
- **Visualização de produtos**: Grid de pizzas com tamanhos (P, M, G, GG)
- **Customização**: Sabores divididos (meio a meio)
- **Bordas especiais**: Seleção de borda recheada
- **Tempo de entrega**: Estimativa específica para pizzas

#### 🍽️ Restaurante
- **Visualização de produtos**: Lista organizada por categorias (Entrada, Principal, Sobremesa)
- **Combos/Pratos do dia**: Seção destacada
- **Informações nutricionais**: Mais detalhadas
- **Opções de acompanhamento**: Seleção de guarnições

#### 🍦 Sorveteria
- **Visualização de produtos**: Grid visual com sabores
- **Montagem de pote**: Seleção de múltiplos sabores
- **Tamanhos**: Pote pequeno, médio, grande (com quantidade de bolas)
- **Complementos**: Coberturas, granulados, frutas
- **Temperatura**: Indicador de produto gelado

---

## 🏗️ Arquitetura Proposta

### Estratégia: Component Factory Pattern

Utilizaremos o padrão **Factory** para renderizar componentes específicos baseados na categoria do estabelecimento.

```
Layout Base (Comum a todos)
    ↓
Layout Específico (Por categoria)
    ↓
Componentes Customizados (Por categoria)
```

---

## 📁 Estrutura de Pastas

```
src/
├── app/
│   └── restaurantes/
│       └── [slug]/
│           ├── page.jsx                        # Página principal (detecta categoria)
│           ├── components/                     # Componentes comuns
│           │   ├── Header/
│           │   └── Footer/
│           └── layouts/                        # 🆕 Layouts específicos
│               ├── BaseLayout/                 # Layout base comum
│               │   └── index.jsx
│               ├── RestaurantLayout/           # Layout de restaurante
│               │   ├── index.jsx
│               │   └── components/
│               │       ├── MenuSection/
│               │       ├── DailySpecials/
│               │       └── NutritionalInfo/
│               ├── PizzariaLayout/             # Layout de pizzaria
│               │   ├── index.jsx
│               │   └── components/
│               │       ├── PizzaBuilder/
│               │       ├── SizeSelector/
│               │       ├── CrustSelector/
│               │       └── HalfAndHalf/
│               ├── SorveteriaLayout/           # Layout de sorveteria
│               │   ├── index.jsx
│               │   └── components/
│               │       ├── FlavorGrid/
│               │       ├── PotBuilder/
│               │       ├── ToppingSelector/
│               │       └── ScoopCounter/
│               ├── HamburgueriaLayout/         # Layout de hamburgueria
│               │   ├── index.jsx
│               │   └── components/
│               │       └── BurgerCustomizer/
│               └── LayoutFactory/              # 🆕 Factory para selecionar layout
│                   └── index.jsx
│
├── components/                                 # Componentes globais reutilizáveis
│   └── ui/
│
└── lib/
    └── constants/
        └── layoutConfigs.js                    # 🆕 Configurações de layout
```

---

## 🔧 Implementação Passo a Passo

### **PASSO 1: Criar o Layout Base**

O layout base contém elementos comuns a todos os estabelecimentos.

**Arquivo:** `src/app/restaurantes/[slug]/layouts/BaseLayout/index.jsx`

```jsx
export default function BaseLayout({ children, restaurant, products }) {
  return (
    <div className="min-h-screen">
      {/* Header comum - informações do restaurante */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <img 
              src={restaurant.avatarImageUrl} 
              alt={restaurant.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <p className="text-sm text-gray-600">{restaurant.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo específico do tipo de estabelecimento */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer comum */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            {restaurant.address}
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

### **PASSO 2: Criar Configurações de Layout**

Define as características de cada tipo de estabelecimento.

**Arquivo:** `src/lib/constants/layoutConfigs.js`

```javascript
export const LAYOUT_CONFIGS = {
  PIZZARIA: {
    name: 'Pizzaria',
    productDisplay: 'grid',
    features: {
      halfAndHalf: true,
      sizeSelection: true,
      crustOptions: true,
      estimatedTime: '45-60 min',
    },
    colors: {
      primary: '#E63946',
      secondary: '#F1FAEE',
      accent: '#A8DADC',
    },
  },
  
  RESTAURANT: {
    name: 'Restaurante',
    productDisplay: 'list',
    features: {
      categoryGroups: true,
      dailySpecials: true,
      nutritionalInfo: true,
      sideDishes: true,
      estimatedTime: '30-45 min',
    },
    colors: {
      primary: '#2A9D8F',
      secondary: '#E9C46A',
      accent: '#F4A261',
    },
  },
  
  SORVETERIA: {
    name: 'Sorveteria',
    productDisplay: 'grid',
    features: {
      multipleSelection: true,
      scoopCounter: true,
      toppings: true,
      sizeByVolume: true,
      temperatureIndicator: true,
      estimatedTime: '15-20 min',
    },
    colors: {
      primary: '#FF006E',
      secondary: '#FFBE0B',
      accent: '#8338EC',
    },
  },
  
  HAMBURGUERIA: {
    name: 'Hamburgueria',
    productDisplay: 'grid',
    features: {
      ingredientCustomization: true,
      cookingPoint: true,
      combos: true,
      estimatedTime: '35-50 min',
    },
    colors: {
      primary: '#D62828',
      secondary: '#F77F00',
      accent: '#FCBF49',
    },
  },
  
  ACAI: {
    name: 'Açaiteria',
    productDisplay: 'builder',
    features: {
      sizeSelection: true,
      toppingsUnlimited: true,
      complementsGrid: true,
      estimatedTime: '15-25 min',
    },
    colors: {
      primary: '#6A0572',
      secondary: '#AB83A1',
      accent: '#EAD2AC',
    },
  },
  
  SAUDAVEL: {
    name: 'Saudável',
    productDisplay: 'list',
    features: {
      calorieInfo: true,
      macronutrients: true,
      allergens: true,
      veganOptions: true,
      estimatedTime: '25-35 min',
    },
    colors: {
      primary: '#52B788',
      secondary: '#B7E4C7',
      accent: '#95D5B2',
    },
  },
  
  DOCES: {
    name: 'Doceria',
    productDisplay: 'grid',
    features: {
      quantitySelector: true,
      giftWrapping: true,
      customMessage: true,
      estimatedTime: '20-30 min',
    },
    colors: {
      primary: '#F72585',
      secondary: '#B5179E',
      accent: '#7209B7',
    },
  },
};
```

---

### **PASSO 3: Criar o Layout Factory**

Factory que seleciona qual layout renderizar baseado na categoria.

**Arquivo:** `src/app/restaurantes/[slug]/layouts/LayoutFactory/index.jsx`

```jsx
import RestaurantLayout from '../RestaurantLayout';
import PizzariaLayout from '../PizzariaLayout';
import SorveteriaLayout from '../SorveteriaLayout';
import HamburgueriaLayout from '../HamburgueriaLayout';
import AcaiLayout from '../AcaiLayout';
import SaudavelLayout from '../SaudavelLayout';
import DocesLayout from '../DocesLayout';
import { LAYOUT_CONFIGS } from '@/lib/constants/layoutConfigs';

const LAYOUT_MAP = {
  RESTAURANT: RestaurantLayout,
  PIZZARIA: PizzariaLayout,
  SORVETERIA: SorveteriaLayout,
  HAMBURGUERIA: HamburgueriaLayout,
  ACAI: AcaiLayout,
  SAUDAVEL: SaudavelLayout,
  DOCES: DocesLayout,
};

export default function LayoutFactory({ restaurant, products }) {
  const category = restaurant.category;
  
  // Busca o layout específico ou usa o padrão (RESTAURANT)
  const LayoutComponent = LAYOUT_MAP[category] || LAYOUT_MAP.RESTAURANT;
  
  // Busca as configurações do layout
  const layoutConfig = LAYOUT_CONFIGS[category] || LAYOUT_CONFIGS.RESTAURANT;
  
  return (
    <LayoutComponent 
      restaurant={restaurant}
      products={products}
      config={layoutConfig}
    />
  );
}
```

---

### **PASSO 4: Implementar Layout de Pizzaria**

Exemplo de layout específico para pizzaria com funcionalidades únicas.

**Arquivo:** `src/app/restaurantes/[slug]/layouts/PizzariaLayout/index.jsx`

```jsx
import BaseLayout from '../BaseLayout';
import PizzaBuilder from './components/PizzaBuilder';
import SizeSelector from './components/SizeSelector';
import CrustSelector from './components/CrustSelector';

export default function PizzariaLayout({ restaurant, products, config }) {
  return (
    <BaseLayout restaurant={restaurant} products={products}>
      {/* Banner específico de pizzaria */}
      <div 
        className="rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white mb-8"
        style={{ backgroundColor: config.colors.primary }}
      >
        <h2 className="text-3xl font-bold mb-2">Monte sua Pizza!</h2>
        <p className="text-lg">
          Escolha o tamanho, sabor e borda. Delivery em {config.features.estimatedTime}
        </p>
      </div>

      {/* Grid de pizzas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              
              {/* Seletor de tamanho */}
              <SizeSelector productId={product.id} />
              
              {/* Opção de meio a meio */}
              {config.features.halfAndHalf && (
                <div className="mt-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>Metade de outro sabor (+R$ 5,00)</span>
                  </label>
                </div>
              )}
              
              {/* Seletor de borda */}
              {config.features.crustOptions && (
                <CrustSelector productId={product.id} className="mt-4" />
              )}
              
              <button 
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                style={{ backgroundColor: config.colors.primary }}
              >
                Adicionar - R$ {product.price.toString()}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de promoções */}
      <div className="mt-12 bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">🔥 Promoções do Dia</h3>
        <p className="text-lg">2 Pizzas Grandes por R$ 79,90!</p>
      </div>
    </BaseLayout>
  );
}
```

**Arquivo:** `src/app/restaurantes/[slug]/layouts/PizzariaLayout/components/SizeSelector/index.jsx`

```jsx
'use client';

import { useState } from 'react';

const SIZES = [
  { id: 'P', name: 'Pequena', slices: 4, price: 0 },
  { id: 'M', name: 'Média', slices: 6, price: 10 },
  { id: 'G', name: 'Grande', slices: 8, price: 20 },
  { id: 'GG', name: 'Gigante', slices: 12, price: 35 },
];

export default function SizeSelector({ productId }) {
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Tamanho:</label>
      <div className="grid grid-cols-4 gap-2">
        {SIZES.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size.id)}
            className={`
              border-2 rounded-lg p-2 text-center transition-all
              ${selectedSize === size.id 
                ? 'border-red-600 bg-red-50 font-bold' 
                : 'border-gray-300 hover:border-red-400'
              }
            `}
          >
            <div className="text-lg font-bold">{size.id}</div>
            <div className="text-xs text-gray-600">{size.slices} fatias</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

**Arquivo:** `src/app/restaurantes/[slug]/layouts/PizzariaLayout/components/CrustSelector/index.jsx`

```jsx
'use client';

import { useState } from 'react';

const CRUSTS = [
  { id: 'tradicional', name: 'Tradicional', price: 0 },
  { id: 'catupiry', name: 'Catupiry', price: 8 },
  { id: 'cheddar', name: 'Cheddar', price: 8 },
  { id: 'chocolate', name: 'Chocolate', price: 10 },
];

export default function CrustSelector({ productId, className = '' }) {
  const [selectedCrust, setSelectedCrust] = useState('tradicional');

  return (
    <div className={className}>
      <label className="block text-sm font-semibold mb-2">Borda:</label>
      <select
        value={selectedCrust}
        onChange={(e) => setSelectedCrust(e.target.value)}
        className="w-full border-2 border-gray-300 rounded-lg p-2 focus:border-red-600 focus:outline-none"
      >
        {CRUSTS.map((crust) => (
          <option key={crust.id} value={crust.id}>
            {crust.name} {crust.price > 0 && `(+R$ ${crust.price})`}
          </option>
        ))}
      </select>
    </div>
  );
}
```

---

### **PASSO 5: Implementar Layout de Sorveteria**

**Arquivo:** `src/app/restaurantes/[slug]/layouts/SorveteriaLayout/index.jsx`

```jsx
'use client';

import { useState } from 'react';
import BaseLayout from '../BaseLayout';
import FlavorGrid from './components/FlavorGrid';
import ToppingSelector from './components/ToppingSelector';
import ScoopCounter from './components/ScoopCounter';

export default function SorveteriaLayout({ restaurant, products, config }) {
  const [selectedSize, setSelectedSize] = useState('medio');
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const SIZES = {
    pequeno: { name: 'Pequeno (2 bolas)', scoops: 2, price: 15 },
    medio: { name: 'Médio (3 bolas)', scoops: 3, price: 22 },
    grande: { name: 'Grande (4 bolas)', scoops: 4, price: 28 },
  };

  const currentSize = SIZES[selectedSize];
  const canAddFlavor = selectedFlavors.length < currentSize.scoops;

  return (
    <BaseLayout restaurant={restaurant} products={products}>
      {/* Banner */}
      <div 
        className="rounded-lg bg-gradient-to-r p-8 text-white mb-8"
        style={{ 
          background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.accent} 100%)` 
        }}
      >
        <h2 className="text-3xl font-bold mb-2">🍦 Monte seu Sorvete Perfeito!</h2>
        <p className="text-lg">
          Escolha os sabores e complementos. Pronto em {config.features.estimatedTime}
        </p>
      </div>

      {/* Seletor de tamanho */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">1. Escolha o Tamanho</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(SIZES).map(([key, size]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSize(key);
                setSelectedFlavors([]);
              }}
              className={`
                border-3 rounded-lg p-6 text-center transition-all
                ${selectedSize === key 
                  ? 'border-pink-600 bg-pink-50 ring-4 ring-pink-200' 
                  : 'border-gray-300 hover:border-pink-400'
                }
              `}
            >
              <div className="text-2xl mb-2">
                {key === 'pequeno' && '🍦'}
                {key === 'medio' && '🍦🍦'}
                {key === 'grande' && '🍦🍦🍦'}
              </div>
              <div className="text-lg font-bold">{size.name}</div>
              <div className="text-2xl font-bold text-pink-600 mt-2">
                R$ {size.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contador de bolas selecionadas */}
      <ScoopCounter 
        selected={selectedFlavors.length}
        total={currentSize.scoops}
        className="mb-8"
      />

      {/* Grid de sabores */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">2. Escolha os Sabores</h3>
        <FlavorGrid 
          products={products}
          selectedFlavors={selectedFlavors}
          onSelectFlavor={(flavor) => {
            if (canAddFlavor) {
              setSelectedFlavors([...selectedFlavors, flavor]);
            }
          }}
          onRemoveFlavor={(flavorId) => {
            setSelectedFlavors(selectedFlavors.filter(f => f.id !== flavorId));
          }}
          maxScoops={currentSize.scoops}
        />
      </div>

      {/* Complementos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">3. Adicione Complementos (Opcional)</h3>
        <ToppingSelector
          selectedToppings={selectedToppings}
          onToggleTopping={(topping) => {
            if (selectedToppings.find(t => t.id === topping.id)) {
              setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
            } else {
              setSelectedToppings([...selectedToppings, topping]);
            }
          }}
        />
      </div>

      {/* Resumo do pedido */}
      <div className="bg-pink-50 border-2 border-pink-600 rounded-lg p-6 sticky bottom-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Seu Pedido</h3>
            <p className="text-sm text-gray-600">
              {selectedFlavors.length} de {currentSize.scoops} sabores selecionados
            </p>
            {selectedToppings.length > 0 && (
              <p className="text-sm text-gray-600">
                {selectedToppings.length} complemento(s)
              </p>
            )}
          </div>
          <button 
            disabled={selectedFlavors.length !== currentSize.scoops}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-lg transition-colors"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </BaseLayout>
  );
}
```

**Arquivo:** `src/app/restaurantes/[slug]/layouts/SorveteriaLayout/components/FlavorGrid/index.jsx`

```jsx
export default function FlavorGrid({ 
  products, 
  selectedFlavors, 
  onSelectFlavor, 
  onRemoveFlavor,
  maxScoops 
}) {
  const isSelected = (productId) => {
    return selectedFlavors.some(f => f.id === productId);
  };

  const getSelectionCount = (productId) => {
    return selectedFlavors.filter(f => f.id === productId).length;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => {
        const selected = isSelected(product.id);
        const count = getSelectionCount(product.id);
        
        return (
          <div
            key={product.id}
            className={`
              relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all
              ${selected ? 'border-pink-600 ring-4 ring-pink-200' : 'border-gray-300 hover:border-pink-400'}
            `}
            onClick={() => {
              if (selected) {
                onRemoveFlavor(product.id);
              } else if (selectedFlavors.length < maxScoops) {
                onSelectFlavor(product);
              }
            }}
          >
            {/* Badge de quantidade */}
            {count > 0 && (
              <div className="absolute top-2 right-2 bg-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold z-10">
                {count}
              </div>
            )}
            
            <img 
              src={product.imageUrl || '/placeholder-ice-cream.png'} 
              alt={product.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-bold text-sm">{product.name}</h4>
              {product.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Arquivo:** `src/app/restaurantes/[slug]/layouts/SorveteriaLayout/components/ScoopCounter/index.jsx`

```jsx
export default function ScoopCounter({ selected, total, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-semibold">Bolas selecionadas:</span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, index) => (
            <div
              key={index}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-2xl
                ${index < selected 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}
            >
              🍦
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Arquivo:** `src/app/restaurantes/[slug]/layouts/SorveteriaLayout/components/ToppingSelector/index.jsx`

```jsx
const TOPPINGS = [
  { id: 'chocolate', name: 'Chocolate', price: 3, emoji: '🍫' },
  { id: 'morango', name: 'Morango', price: 3, emoji: '🍓' },
  { id: 'granulado', name: 'Granulado', price: 2, emoji: '✨' },
  { id: 'paçoca', name: 'Paçoca', price: 4, emoji: '🥜' },
  { id: 'leite-ninho', name: 'Leite Ninho', price: 5, emoji: '🥛' },
  { id: 'confete', name: 'Confete', price: 2, emoji: '🎊' },
];

export default function ToppingSelector({ selectedToppings, onToggleTopping }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {TOPPINGS.map((topping) => {
        const isSelected = selectedToppings.some(t => t.id === topping.id);
        
        return (
          <button
            key={topping.id}
            onClick={() => onToggleTopping(topping)}
            className={`
              border-2 rounded-lg p-4 text-center transition-all
              ${isSelected 
                ? 'border-pink-600 bg-pink-50 ring-2 ring-pink-200' 
                : 'border-gray-300 hover:border-pink-400'
              }
            `}
          >
            <div className="text-3xl mb-1">{topping.emoji}</div>
            <div className="text-sm font-semibold">{topping.name}</div>
            <div className="text-xs text-gray-600">+R$ {topping.price}</div>
          </button>
        );
      })}
    </div>
  );
}
```

---

### **PASSO 6: Implementar Layout de Restaurante**

**Arquivo:** `src/app/restaurantes/[slug]/layouts/RestaurantLayout/index.jsx`

```jsx
import BaseLayout from '../BaseLayout';
import MenuSection from './components/MenuSection';
import DailySpecials from './components/DailySpecials';

export default function RestaurantLayout({ restaurant, products, config }) {
  // Agrupa produtos por categoria do menu
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.menuCategory?.name || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <BaseLayout restaurant={restaurant} products={products}>
      {/* Banner */}
      <div 
        className="rounded-lg p-8 text-white mb-8"
        style={{ 
          background: `linear-gradient(135deg, ${config.colors.primary} 0%, ${config.colors.secondary} 100%)` 
        }}
      >
        <h2 className="text-3xl font-bold mb-2">Cardápio Completo</h2>
        <p className="text-lg">
          Delivery em {config.features.estimatedTime}
        </p>
      </div>

      {/* Pratos do dia */}
      {config.features.dailySpecials && (
        <DailySpecials className="mb-8" />
      )}

      {/* Menu por categorias */}
      <div className="space-y-8">
        {Object.entries(groupedProducts).map(([categoryName, categoryProducts]) => (
          <MenuSection
            key={categoryName}
            title={categoryName}
            products={categoryProducts}
            config={config}
          />
        ))}
      </div>
    </BaseLayout>
  );
}
```

---

### **PASSO 7: Atualizar a Página Principal**

**Arquivo:** `src/app/restaurantes/[slug]/page.jsx`

```jsx
import { db } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import LayoutFactory from './layouts/LayoutFactory';

export default async function RestaurantPage({ params }) {
  const { slug } = params;

  // Busca o restaurante e produtos
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          menuCategory: true,
        },
        orderBy: { name: 'asc' },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }

  // O LayoutFactory decide qual layout renderizar baseado em restaurant.category
  return <LayoutFactory restaurant={restaurant} products={restaurant.products} />;
}
```

---

## 🎨 Exemplos de Customização

### Customização de Cores

Cada tipo de estabelecimento pode ter sua paleta de cores definida em `layoutConfigs.js`:

```javascript
colors: {
  primary: '#E63946',    // Cor principal (botões, destaques)
  secondary: '#F1FAEE',  // Cor secundária (backgrounds)
  accent: '#A8DADC',     // Cor de acento (badges, ícones)
}
```

### Customização de Features

Habilite/desabilite funcionalidades específicas:

```javascript
features: {
  halfAndHalf: true,        // Pizzaria: meio a meio
  sizeSelection: true,      // Pizzaria/Sorveteria: seleção de tamanho
  toppings: true,           // Sorveteria: complementos
  nutritionalInfo: true,    // Restaurante: informações nutricionais
  calorieInfo: true,        // Saudável: calorias
  multipleSelection: true,  // Sorveteria: múltiplos sabores
}
```

---

## ✅ Boas Práticas

### 1. **Reutilização de Componentes**
- Crie componentes base reutilizáveis (Header, Footer, ProductCard)
- Use composição ao invés de duplicação
- Componentes específicos herdam dos componentes base

### 2. **Configuração Centralizada**
- Mantenha todas as configurações em `layoutConfigs.js`
- Evite hardcoding de valores nos componentes
- Use as configs para controlar features e estilos

### 3. **Responsividade**
- Todos os layouts devem ser mobile-first
- Use Tailwind CSS para breakpoints consistentes
- Teste em diferentes tamanhos de tela

### 4. **Performance**
- Utilize Server Components onde possível
- Client Components apenas quando necessário (interatividade)
- Lazy loading de imagens e componentes pesados

### 5. **Acessibilidade**
- Use tags semânticas (header, main, footer, section)
- Adicione alt text em imagens
- Garanta contraste adequado de cores
- Suporte navegação por teclado

### 6. **Testes**
- Teste cada tipo de layout individualmente
- Verifique transições entre tipos
- Teste edge cases (produtos sem imagem, categorias vazias)

### 7. **Manutenibilidade**
- Documente componentes complexos
- Use nomes descritivos para variáveis e funções
- Mantenha componentes pequenos e focados
- Siga o padrão de estrutura de pastas

---

## 🚀 Próximos Passos

1. **Implementar os layouts restantes**
   - HamburgueriaLayout
   - AcaiLayout
   - SaudavelLayout
   - DocesLayout

2. **Adicionar funcionalidades avançadas**
   - Sistema de carrinho específico por tipo
   - Checkout personalizado
   - Animações e transições

3. **Otimizações**
   - Cache de layouts
   - Prefetch de componentes
   - Otimização de imagens

4. **Analytics**
   - Tracking de interações por tipo de estabelecimento
   - A/B testing de layouts
   - Métricas de conversão

---

## 📝 Notas Finais

- Sempre teste com dados reais do banco de dados
- Mantenha consistência visual entre diferentes tipos
- Priorize a experiência do usuário
- Documente novas funcionalidades adicionadas
- Solicite feedback dos usuários para melhorias

---

**Documento criado em:** Novembro de 2025  
**Última atualização:** Novembro de 2025  
**Versão:** 1.0.0
