export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Pricing
      </h2>

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-gray-800 p-8">
          <h3 className="text-2xl font-bold">Free</h3>
          <p className="mt-4 text-4xl font-bold">$0</p>
        </div>

        <div className="rounded-2xl border border-blue-500 p-8">
          <h3 className="text-2xl font-bold">Pro</h3>
          <p className="mt-4 text-4xl font-bold">$9</p>
        </div>

        <div className="rounded-2xl border border-gray-800 p-8">
          <h3 className="text-2xl font-bold">Creator+</h3>
          <p className="mt-4 text-4xl font-bold">$29</p>
        </div>

      </div>
    </section>
  );
}