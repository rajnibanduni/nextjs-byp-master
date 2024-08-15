import React from 'react'
import Link from 'next/link'
import { BadgeInfo, BadgePercent, ChevronDown } from 'lucide-react'
import { MEGAMENU_ITEMS } from '@/constants'
import MegamenuList from './MegaMenuList'

const Navbar = () => {
  return (
    <>
     <div className="flex justify-between  max-w-screen-2xl px-5 ">
      <div className="flex lg:gap-3 xl:gap-6 md:gap-2 text-sm font-semibold justify-center items-center md:pr-12">
        {MEGAMENU_ITEMS.map((Item) => (
          <div key={Item.category} className="group">
            <Link
              href={Item.href}
              className="flex items-center content-center justify-center lg:text-base md:text-sm font-semibold py-1 hover:text-red-600 "
            > 
              {Item.category}
              <div className="inline-block ">
                {Item.product && <ChevronDown className="w-4 h-4 font-extrabold"/> } 
              </div>
              
              {Item.product && <MegamenuList product={Item.product} />}
            </Link>
          </div>
        ))}
      </div>
      <div>
       
       {/* <Link className="flex" href={"/"}> 
       <BadgePercent />
            Top Offer</Link>
          */}
      <Link className="flex gap-1 lg:text-base md:text-sm font-semibold py-1 hover:text-red-600  " href={"/"}> 
        <BadgeInfo />Help Center </Link>
       </div>
    </div>
    </>
   
  )
}

export default Navbar