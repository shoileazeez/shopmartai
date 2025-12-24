export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, Alex!
          </h1>
          <p className="text-neutral-500">
            Here’s what’s happening with your store today.
          </p>
        </div>

        <input
          className="input max-w-sm"
          placeholder="Search orders, items..."
        />
      </div>

      {/* AI Search */}
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-4">
          <button className="btn-primary">
            Ask AI
          </button>
          <button className="btn-outline">
            Visual Match
          </button>
        </div>

        <input
          className="input"
          placeholder="Describe what you want (e.g. vintage denim jacket under $50)"
        />

        <div className="mt-4 flex gap-2 flex-wrap">
          {["Running Shoes", "Modern Lamp", "Silk Scarf", "Denim Jacket"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-neutral-100 text-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Stat title="Active Orders" value="2" note="Arriving soon" />
        <Stat title="Saved Items" value="14" note="3 price drops" />
        <Stat title="Total Savings" value="$120.50" note="with AI coupons" />
      </div>

      {/* Orders + Snap */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-semibold mb-4">
            Recent Orders
          </h3>

          <Order
            name="Sony Noise Canceling Headphones"
            status="Shipped"
          />
          <Order
            name="Nike Air Zoom Pegasus 39"
            status="Processing"
          />
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-purple-900 text-white p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Snap & Shop
            </h3>
            <p className="text-sm opacity-80 mt-2">
              Upload a photo and find matching items instantly.
            </p>
          </div>

          <button className="bg-white text-neutral-900 font-medium py-3 rounded-xl">
            Try Visual Search
          </button>
        </div>
      </div>

      {/* AI Picks */}
      <div>
        <h3 className="font-semibold mb-4">
          AI Picks For You
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.name} className="card p-4">
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                {p.match}% Match
              </span>

              <img
                src={p.image}
                alt={p.name}
                className="mt-3 rounded-xl"
              />

              <h4 className="mt-3 font-medium">
                {p.name}
              </h4>
              <p className="text-purple-600 font-semibold">
                ${p.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function Stat({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className="card p-6">
      <p className="text-sm text-neutral-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
      <p className="text-xs text-purple-600 mt-1">{note}</p>
    </div>
  );
}

function Order({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <p className="text-sm font-medium">{name}</p>
      <span className="text-xs px-3 py-1 rounded-full bg-neutral-100">
        {status}
      </span>
    </div>
  );
}

const products = [
  {
    name: "Vintage Denim Jacket",
    price: "89.99",
    match: 96,
    image: "/products/jacket.png",
  },
  {
    name: "Smart Home Speaker",
    price: "149.00",
    match: 92,
    image: "/products/speaker.png",
  },
  {
    name: "Leather Crossbody Bag",
    price: "125.00",
    match: 98,
    image: "/products/bag.png",
  },
  {
    name: "Mechanical Keyboard",
    price: "199.00",
    match: 94,
    image: "/products/keyboard.png",
  },
];
