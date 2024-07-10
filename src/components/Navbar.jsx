import React from 'react'

function Navbar() {
  return (
    <nav className='sticky top-0 bg-slate-800 text-white z-10'>
        <div className="mycontainer flex justify-between items-center px-8 py-5 h-14">

        <div className="logo font-bold text-white text-2xl">
            
            <span className='text-green-700'>&lt;</span>
            Pass
            <span className='text-green-700'>Lock/&gt;</span>
            

        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <button className='text-white bg-blue-900 border-4  border-black my-5 rounded-full flex justify-between items-center ring-white ring-1 '>
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="github" />
          <span className='font-bold px-2'>Github</span>
        </button>
        </div>
      
    </nav>
  )
}

export default Navbar
