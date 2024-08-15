import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function TrackOrderPage() {
  return(
  
    <div className="flex flex-col py-24"> 
      <main className="flex-1 flex flex-col items-center justify-center gap-4 p-4 md:gap-10 md:p-6">
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-3 mb-3">
            <h1 className="text-3xl font-bold">Track your order</h1>
            <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
              Enter your order number to track your package
            </p>
          </div>
          <div className="space-y-4">
            <Input type="text" placeholder="Enter your order number" className="border-gray-200 dark:border-gray-800" />
            <Button size="lg" className="w-full">
              Track Order
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

 

