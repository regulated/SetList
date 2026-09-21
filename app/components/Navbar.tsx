import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between grid-cols-8 gap-8 px-4 py-2 w-full">
      <div className="flex flex-row gap-4">
        <Link href="/" className="col-start-1">
          <div>Home</div>
        </Link>
        <Link href="/testPage" className="col-start-2">
          <div>Test</div>
        </Link>
      </div>
      <Link href="/signIn" className="col-start-8">
        <div>Sign In</div>
      </Link>
    </nav>
  )
}

export default Navbar
