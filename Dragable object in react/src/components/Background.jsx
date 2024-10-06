import React from 'react'

const Background = () => {
  return (
    <div className='w-full h-screen fixed z-[2]'>
      <div className='absolute to[-[5%] w-full py-10 flex justify-center text-zinc-600 text-xl font-semibold'>Documents</div>
      <h1 className='absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] text-zinc-900 text-[15vw] leading-none tracking-tighter font-semibold'>Docs</h1>
    </div>
  )
}

export default Background

