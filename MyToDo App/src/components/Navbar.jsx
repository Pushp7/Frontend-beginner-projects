import React from 'react'

function Navbar() {
    return (
        <div className='bg-[#0d283b] flex items-center justify-between py-3 pl-6 pr-10 select-none'>
            <div className="logo flex items-center gap-1 cursor-pointer">
                <div className='log-image w-8'>
                    <img src="/images/icons8-todo-list.gif" alt="Logo" />
                </div>
                <h1 className='text-2xl font-semibold text-white'>MyToDo</h1>
            </div>
            <div className="navigation">
                <ul className='flex gap-4'>
                    <li className='cursor-pointer hover:underline text-white'>Home</li>
                    <li className='cursor-pointer hover:underline text-white'>About</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar