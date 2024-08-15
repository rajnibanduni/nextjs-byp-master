import { Item } from '@radix-ui/react-accordion'
import React from 'react'
import { map } from 'zod'

const MegamenuList = ({product}: any) => {
  return ( 
        <div className="absolute top-44 left-0 z-50 mt-5 items-center justify-center w-full min-h-screen text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300">
          <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-10  px-12 py-10  bg-white border rounded-lg shadow-md">
            {product.map((item: any, i: number) => (
              <div key={i} className="font-semibold space-y-2">
                <h4 className="text-base  text-[#c8cdd3]">{item.title}</h4>
                <div className="space-y-3">
                  {item.items.map((item: any, i: number) => (
                    <p key={i} className="text-sm opacity-70 hover:opacity-100 hover:bg-[#FFF4F6] hover:text-[#EF233C] rounded-[8px] px-2 py-1">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
  )
}

export default MegamenuList