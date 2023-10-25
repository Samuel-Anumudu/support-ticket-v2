"use client";

import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";
function BackButton({ url }: { url: string | any }) {
  return (
    <Link href={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft />
      Back
    </Link>
  );
}

export default BackButton;
