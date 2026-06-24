export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">
        Powerful AI Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-gray-800 p-6">
          <h3 className="mb-3 text-xl font-semibold">
            🎨 Thumbnail Generator
          </h3>

          <p className="text-gray-400">
            Generate eye-catching thumbnails using AI.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 p-6">
          <h3 className="mb-3 text-xl font-semibold">
            📈 Thumbnail Analyzer
          </h3>

          <p className="text-gray-400">
            Get CTR improvement suggestions instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 p-6">
          <h3 className="mb-3 text-xl font-semibold">
            ✍️ Title Generator
          </h3>

          <p className="text-gray-400">
            Generate viral and click-worthy titles.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 p-6">
          <h3 className="mb-3 text-xl font-semibold">
            🚀 Growth Assistant
          </h3>

          <p className="text-gray-400">
            AI-powered content growth recommendations.
          </p>
        </div>

      </div>
    </section>
  );
}