"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const onContact = pathname === "/contact";
  const onIndex = !onContact;

  return (
    <header className="site-head">
      <Link href="/" className="logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="logo-mark"
          src="/mark.png"
          alt=""
          width={28}
          height={28}
        />
        lucasterry
      </Link>
      <nav>
        <Link
          href="/"
          className={onIndex ? "active" : undefined}
          aria-current={onIndex ? "page" : undefined}
        >
          index
        </Link>
        <Link
          href="/contact"
          className={onContact ? "active" : undefined}
          aria-current={onContact ? "page" : undefined}
        >
          contact
        </Link>
      </nav>
    </header>
  );
}
