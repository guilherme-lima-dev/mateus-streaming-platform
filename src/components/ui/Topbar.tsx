import Link from "next/link";

export function Topbar() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-gray-800 bg-gray-900 px-4"
      role="banner"
    >
      <Link
        href="/"
        className="text-xl font-bold text-white hover:text-gray-200 transition-colors"
      >
        Mateus Tube
      </Link>
    </header>
  );
}
