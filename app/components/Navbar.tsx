import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row gap-8 items-center">
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
