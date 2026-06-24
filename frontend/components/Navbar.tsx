export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6">
      <h1 className="text-2xl font-bold">
        Saflix AI
      </h1>

      <div className="flex gap-4">
        <button className="rounded-lg border border-gray-700 px-4 py-2">
          Login
        </button>

        <button className="rounded-lg bg-white px-4 py-2 font-semibold text-black">
          Sign Up
        </button>
      </div>
    </nav>
  );
}