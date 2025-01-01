import React from 'react'

const Sticky = () => {
  return (
    <div className='bg-white fixed bottom-0 left-0 right-0 py-5 w-full flex justify-center items-center shadow-md border-t-2 border-slate-100 z-40'>
        <button className="rounded bg-violet-900 py-3 px-8 text-violet-50 uppercase font-semibold">Acheter maintenant</button>
    </div>
  )
}

export default Sticky