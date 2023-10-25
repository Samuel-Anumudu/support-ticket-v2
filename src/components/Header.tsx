"use client";

import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Support Desk</Link>
      </div>
      <Link href="/">
        <FaUser /> Profile
      </Link>
    </header>
  );
}

export default Header;
