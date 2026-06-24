"use client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <section className="flex-1 p-8">
        <Header />

        <h1 className="text-4xl font-bold">
          Dashboard 👋
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back to Saflix AI
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 p-6">
            <h3 className="text-gray-400">Total Analyses</h3>
            <p className="mt-4 text-4xl font-bold">127</p>
          </div>

          <div className="rounded-2xl border border-gray-800 p-6">
            <h3 className="text-gray-400">Average CTR</h3>
            <p className="mt-4 text-4xl font-bold">8.4%</p>
          </div>

          <div className="rounded-2xl border border-gray-800 p-6">
            <h3 className="text-gray-400">AI Credits</h3>
            <p className="mt-4 text-4xl font-bold">900</p>
          </div>
        </div>
      </section>
    </main>
  );
}