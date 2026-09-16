import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row gap-8 items-center bg-zinc-800">
      <Link href="/">
        <div>Navbar</div>
      </Link>
      <Link href="/">
        <div>Navbar</div>
      </Link>
    </nav>
  )
}

export default Navbar
