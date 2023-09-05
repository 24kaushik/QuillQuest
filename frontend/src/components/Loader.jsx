import React from 'react'

const Loader = () => {
  return (
    <div>
      <div className='w-32 h-32 mx-auto mt-9 mb-10 border-t-[1em] border-b-[1em] border-[1em] border-t-violet-400 border-b-green-400 rounded-full animate-spin'></div>
      <h1 className='text-center text-4xl mb-10 font-outfit'>Loading...</h1>
    </div>
  )
}

export default Loader
