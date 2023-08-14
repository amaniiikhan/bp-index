import Link from "next/link"

export default function Header() {
  return (
    <>
      <header className='flex justify-between items-center shrink 
      h-[90px] w-screen bg-gray-100 px-20 shadow-lg'>
        <Link href='/'>
          <p className='font-bold text-2xl hover:text-gray-500'>BPI LOGO</p>
        </Link>
        <div className='flex justify-between items-center'>
          <p className="font-bold text-xl hover:link">Data</p>
          <p className="font-bold text-xl ml-14 hover:link">About</p>
          <button className="btn bg-gray-300 text-xl ml-14 h-8 py-2 rounded-3xl">File Claim</button>
        </div>
      </header>
    </>
  )
}
