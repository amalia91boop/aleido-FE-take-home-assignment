# Frontend take-home: React webshop

Build a small webshop experience with **React** and **Vite** using the
[DummyJSON products API](https://dummyjson.com/docs/products).

## Setup

```bash
npm install
npm run dev
```

## Technical decisions

### Routing
React Router was already included in the starter repo and is the industry standard for routing in React. No need to use something else.I used it fully — `Link` for semantic navigation, `useParams` for dynamic product routes, and `useLocation` for active link state in the navbar.

### State management
I chose React Context for the cart since it's built into React and sufficient for this scope. The cart needs to be accessible across multiple pages (product page, cart page, navbar) which Context solves without adding an external dependency like Redux Toolkit or similar.

### Styling
I chose Tailwind CSS since I thought it would be fun and fast. I defined a custom peach color theme using `@theme` directive in `index.css`, available globally across all components.

### Component structure
Pages are organized as feature folders under `src/pages/`. I created a reusable `ProductCard` component used on both the home and search pages to avoid duplication and make the code cleaner. The cart logic lives in `src/context/CartContext.tsx`.

### Data fetching
Used native `fetch` directly since the API needs are simple. Each page handles its own loading and error state. 

## Tradeoffs & next steps
- Cart state is lost on page refresh — localStorage could be used to save items if refreshed or closed.
- Debounced live search would improve user experience on the serach page since it's used almost everywhere today.
- No pagination on the home page, currently limited to 20 products.
- Responsive design needs to be improved.
- Error handling is minimal — some kind of retry logic would be an improvement.

## AI usage
Used Claude as a pair programmer throughout — for setup, boilerplate, and Tailwind styling. Technical decisions, structure, and reasoning are my own.