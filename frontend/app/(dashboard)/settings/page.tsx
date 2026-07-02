"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import SpotlightCard from "@/components/bits/SpotlightCard";
import { Settings as SettingsIcon, User, Bell, Shield, CreditCard } from "lucide-react";

function Youtube(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

export default function Settings() {
  const sections = [
    { title: "Profile", desc: "Manage your email and creator profile", icon: User },
    { title: "YouTube Integration", desc: "Connect your channel to sync metrics", icon: Youtube, connected: false },
    { title: "Notifications", desc: "Configure credit usage and alert emails", icon: Bell },
    { title: "Billing & Plans", desc: "Manage subscription and credits", icon: CreditCard },
    { title: "Security", desc: "Manage passwords and API tokens", icon: Shield },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8">
        <div className="relative">
          <h1 className="mt-2 font-display text-4xl font-bold flex items-center gap-3">
            <SettingsIcon className="text-accent" size={32} />
            Settings
          </h1>
          <p className="mt-2 text-muted">
            Manage your account preferences and integrations
          </p>
        </div>

        <div className="mt-8 space-y-4 max-w-3xl">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <SpotlightCard key={section.title} className="rounded-xl border border-border-color bg-surface p-5 hover:border-accent/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border-color">
                      <Icon className="text-accent" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{section.title}</h3>
                      <p className="text-xs text-muted mt-0.5">{section.desc}</p>
                    </div>
                  </div>
                  
                  {section.title === "YouTube Integration" ? (
                    <button className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors">
                      Connect
                    </button>
                  ) : (
                    <button className="rounded-lg border border-border-color px-4 py-2 text-xs font-medium hover:bg-background text-foreground transition-colors">
                      Configure
                    </button>
                  )}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}