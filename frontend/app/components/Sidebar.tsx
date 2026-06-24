"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "🏠 Dashboard",
      path: "/dashboard",
    },
    {
      name: "🎨 Thumbnail Analyzer",
      path: "/thumbnail-analyzer",
    },
    {
      name: "✍️ Title Generator",
      path: "/title-generator",
    },
    {
      name: "📊 Analytics",
      path: "/analytics",
    },
    {
      name: "⚙️ Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen border-r border-gray-800 bg-black p-6">

      <h1 className="mb-10 text-2xl font-bold text-white">
        Saflix AI
      </h1>

      <nav className="space-y-3">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            href={item.path}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-900 hover:text-white"
            }`}
          >
            {item.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
}