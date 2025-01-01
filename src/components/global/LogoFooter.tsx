import React from 'react'
import Image from 'next/image'
import Logos from "../../../public/LuxeenBois.png"
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
        <Link href="/">
            <Image src={Logos} className='w-40' alt='Logo' width={122} height={80} />
        </Link>
    </div>
  )
}

export default Logo