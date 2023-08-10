

export default function Header() {
  return (
    <>
      <header className='flex justify-between items-center shrink 
      h-[90px] w-screen bg-gray-100 px-20 shadow-lg'>
        <p className='font-bold text-2xl'>BPI LOGO</p>
        <div className='flex justify-between items-center'>
          <p className="font-bold text-xl">Data</p>
          <p className="font-bold text-xl ml-14">About</p>
          <button className="btn bg-gray-300 text-xl ml-14 h-8 py-2 rounded-3xl">File Claim</button>
        </div>
      </header>
    </>
  )
}
