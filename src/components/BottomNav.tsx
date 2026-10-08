"use client";

import { Home, FolderKanban, Package, Send } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import whatsappIcon from "@/assets/whatsapp.svg";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type NavItem =
  | { icon: typeof Home; label: string; to: string }
  | { icon: null; label: "WhatsApp"; to?: never };

function navActive(pathname: string, itemTo: string): boolean {
  if (itemTo === "/") return pathname === "/";
  if (itemTo === "/bangalore") return pathname === "/bangalore" || pathname.startsWith("/bangalore/");
  return pathname === itemTo || pathname.startsWith(`${itemTo}/`);
}

const BottomNav = () => {
  const pathname = usePathname() ?? "";

  const homeTo = "/";
  const projectsTo = "/bangalore/journeys";
  const packagesTo = "/bangalore/packages";

  const navItems: NavItem[] = [
    { icon: Home, label: "Home", to: homeTo },
    { icon: Package, label: "Packages", to: packagesTo },
    { icon: null, label: "WhatsApp" },
    { icon: FolderKanban, label: "Journeys", to: projectsTo },
    { icon: Send, label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav safe-area-bottom">
      <div className="flex items-end justify-around px-2 pt-2 pb-2">
        {navItems.map((item) => {
          if (item.icon === null) {
            return (
              <a
                key={item.label}
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="relative -mt-5 flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#1f7a5a] flex items-center justify-center shadow-xl transition-colors duration-300 hover:bg-[#176448]">
                  <img
                    src={whatsappIcon.src}
                    alt="Chat on WhatsApp with Zikhra travel planners"
                    className="w-7 h-7 brightness-0 invert"
                  />
                </div>
                <span className="text-[10px] font-sans text-[#1f7a5a] mt-1">{item.label}</span>
              </a>
            );
          }

          const Icon = item.icon;
          const isActive = navActive(pathname, item.to);

          return (
            <Link key={`${item.label}-${item.to}`} href={item.to} className="flex flex-col items-center py-1 px-3 group">
              <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"}`} />
              <span
                className={`text-[10px] font-sans mt-1 transition-colors ${isActive ? "text-gold" : "text-muted-foreground group-hover:text-gold"}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

