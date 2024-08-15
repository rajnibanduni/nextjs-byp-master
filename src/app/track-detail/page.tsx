import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard } from "lucide-react"

export default function TrackDetailPage() {
    return(
        <div className="bg-muted/40">
      <div className="container px-4 py-12 md:py-16 lg:py-20">
        <div className="grid gap-8 md:gap-12 lg:gap-16">
          <div className="grid gap-4 md:gap-6 lg:gap-8">
            <div className="bg-background rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
              <div className="flex items-center justify-between">
                <div className="grid gap-1">
                  <div className="text-muted-foreground text-sm md:text-base">Order #OE31b70H</div>
                  <div className="text-2xl md:text-3xl font-bold">Preparing for Shipment</div>
                  <div className="text-muted-foreground text-sm md:text-base">Estimated Delivery: June 23, 2023</div>
                </div>
                 
              </div>
            </div>
          </div>
          <div className="grid gap-8 md:gap-12 lg:gap-16">
            <div className="bg-background rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
              <div className="grid gap-6 md:gap-8 lg:gap-10">
                <div className="grid gap-2 md:gap-3 lg:gap-4">
                  <div className="text-2xl md:text-3xl font-bold">Order Timeline</div>
                  <div className="text-muted-foreground text-sm md:text-base">Track the progress of your order.</div>
                </div>
                <div className="after:absolute after:inset-y-0 after:w-px after:bg-muted-foreground/20 relative pl-6 after:left-0 grid gap-6 md:gap-8 lg:gap-10">
                  <div className="grid gap-2 md:gap-3 lg:gap-4 relative">
                    <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                    <div className="font-medium text-sm md:text-base">June 20, 2023 - Order Placed</div>
                    <div className="text-muted-foreground text-sm md:text-base">
                      Your order was successfully placed.
                    </div>
                  </div>
                  <div className="grid gap-2 md:gap-3 lg:gap-4 relative">
                    <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                    <div className="font-medium text-sm md:text-base">June 21, 2023 - Order Processed</div>
                    <div className="text-muted-foreground text-sm md:text-base">
                      Your order is being processed for shipment.
                    </div>
                  </div>
                  <div className="grid gap-2 md:gap-3 lg:gap-4 relative">
                    <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                    <div className="font-medium text-sm md:text-base">June 22, 2023 - Order Shipped</div>
                    <div className="text-muted-foreground text-sm md:text-base">
                      Your order has been shipped and is on its way.
                    </div>
                  </div>
                  <div className="grid gap-2 md:gap-3 lg:gap-4 relative">
                    <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                    <div className="font-medium text-sm md:text-base">June 23, 2023 - Delivered</div>
                    <div className="text-muted-foreground text-sm md:text-base">Your order has been delivered.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-8 md:gap-12 lg:gap-16">
            <div className="bg-background rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
              <div className="grid gap-6 md:gap-8 lg:gap-10">
                <div className="grid gap-2 md:gap-3 lg:gap-4">
                  <div className="text-2xl md:text-3xl font-bold">Order Details</div>
                  <div className="text-muted-foreground text-sm md:text-base">Review the details of your order.</div>
                </div>
                <div className="grid gap-6 md:gap-8 lg:gap-10">
                  <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <div className="font-semibold text-base md:text-lg lg:text-xl">Order Items</div>
                    <div className="grid gap-4 md:gap-6 lg:gap-8">
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">
                          Glimmer Lamps x <span>2</span>
                        </div>
                        <div>$250.00</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">
                          Aqua Filters x <span>1</span>
                        </div>
                        <div>$49.00</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4 md:my-6 lg:my-8" />
                  <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <div className="font-semibold text-base md:text-lg lg:text-xl">Order Summary</div>
                    <div className="grid gap-2 md:gap-3 lg:gap-4">
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Subtotal</div>
                        <div>$299.00</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Shipping</div>
                        <div>$5.00</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-muted-foreground">Tax</div>
                        <div>$25.00</div>
                      </div>
                      <div className="flex items-center justify-between font-semibold">
                        <div className="text-muted-foreground">Total</div>
                        <div>$329.00</div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-4 md:my-6 lg:my-8" />
                  <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <div className="font-semibold text-base md:text-lg lg:text-xl">Shipping Information</div>
                    <address className="grid gap-2 md:gap-3 lg:gap-4 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <Separator className="my-4 md:my-6 lg:my-8" />
                  <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <div className="font-semibold text-base md:text-lg lg:text-xl">Billing Information</div>
                    <div className="text-muted-foreground">Same as shipping address</div>
                  </div>
                  <Separator className="my-4 md:my-6 lg:my-8" />
                  <div className="grid gap-4 md:gap-6 lg:gap-8">
                    <div className="font-semibold text-base md:text-lg lg:text-xl">Payment Information</div>
                    <div className="grid gap-2 md:gap-3 lg:gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CreditCard />
                          Visa
                        </div>
                        <div>**** **** **** 4532</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}



 

 
 