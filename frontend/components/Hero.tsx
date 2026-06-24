export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-extrabold leading-tight">
        Create Viral

        <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Thumbnails With AI
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-xl text-gray-400">
        Generate high-converting thumbnails, analyze designs,
        optimize titles, and grow your content faster.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold">
          Start Free
        </button>

        <button className="rounded-xl border border-gray-700 px-6 py-3">
          Watch Demo
        </button>
      </div>
    </section>
  );
}