import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge, BookX, CalendarDays, Download, LocateFixedIcon, Pencil, Plane, Trash2, X } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Card, 
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <div className="h-full mx-auto w-full max-w-screen-xl px-4 md:px-15 ">
      {/* Breadcrum Goes */}
      <section className="my-5">
        <Breadcrumb />
      </section>
      {/* Breadcrum End */}

      <section className="py-10">
        <h2 className=" font-extrabold text-3xl lead-10 text-black mb-9 ">
          Order History
        </h2>

        {/* Order Detail Goes Here */}

        {/* For Lg Screens */}
        <Tabs defaultValue="All">
            <div className="block  justify-start">
              <TabsList className="lg:flex md:inline inline lg:space-x-2 items-start justify-start  rounded-none m-0 bg-transparent">
                <TabsTrigger
                  className="font-medium text-lg rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 bg-transparent"
                  value="All"
                >
                  All Order
                  <span className="text-sm text-white ml-1 border rounded-full bg-red-500 w-8 h-8 inline-flex items-center justify-center font-bold">
                   18
                  </span>
                </TabsTrigger>

               

                <TabsTrigger
                  className="font-medium text-lg rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
                  value="Pending"
                >
                  Pending Order
                  <span className="text-sm text-white ml-1 border rounded-full bg-red-500  w-8 h-8 inline-flex items-center justify-center  font-bold">
                     06 
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  className="font-medium text-lg rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
                  value="Delivered"
                >
                  Delivered Order 
                  <span className="text-sm text-white ml-1 border rounded-full bg-red-500  w-8 h-8 inline-flex items-center justify-center  font-bold">
                    10 
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  className="font-medium text-lg rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
                  value="Cancle"
                >
                  Cancle Order
                  <span className="text-sm text-white ml-1 border rounded-full bg-red-500  w-8 h-8 inline-flex items-center justify-center  font-bold">
                     10 
                  </span>
                </TabsTrigger>

              </TabsList>
            </div>{/* Hidden in Small screen */}
            
          {/* <Separator /> */}
          {/* {isPending && <div>Loading...</div>} */}
          <TabsContent value="All"> 

            {/* All Order Detail Goes */}
            <section className="py-5 ">
            <div className="lg:flex md:flex inline items-center justify-between space-x-5 mb-9">
        <h2 className=" font-extrabold text-3xl lead-10 text-black">
          All Order
        </h2>

        <div className="lg:flex md:flex inline max-sm:flex-col items-center justify-end gap-2 max-lg:mt-5">
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <CalendarDays />
                <input
                  type="text"
                  name="from-dt"
                  id="from-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                  placeholder="11-01-2023"
                />
              </div>
              <p className="font-medium text-lg text-center leading-8 text-black">To</p>
              <div className="flex rounded-full py-3 px-4 border border-gray-300 relative">
                <CalendarDays />
                <input
                  type="text"
                  name="to-dt"
                  id="to-dt"
                  className="font-semibold px-2 text-sm text-gray-900 outline-0 appearance-none flex flex-row-reverse cursor-pointer w-28 placeholder-gray-900"
                  placeholder="11-01-2023"
                />
              </div>
            </div>
        </div>
              <div className="w-full max-w-7xl mx-auto lg:px-4 md:px-8">
                <div className="mt-7 border border-gray-300 pt-9 rounded-lg">
                  {/* order detail section */}
                  <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                    <div className="data">
                      <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                        Order ID :
                        <span className="underline text-lg font-semibold">
                          #10234987
                        </span>
                      </p>
                      <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Order Status :
                        <span className="text-green-500 text-lg font-semibold">
                          Delivered
                        </span>
                      </p>
                      <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Order Payment :
                        <span className="underline text-lg font-semibold">
                          18th March 2021
                        </span>
                      </p>
                      <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Delivery Date :
                        <span className="underline text-lg font-semibold">
                          23rd March 2021
                        </span>
                      </p>
                    </div>
                    <div className="lg:flex md:grid inline items-center gap-3 max-md:mt-5 lg:space-x-0 md:space-x-0 space-x-5 ">
                      <button className="rounded-full px-7 py-3 lg:mb-0 md:mb-0 mb-4 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Show Invoice
                      </button>
                      <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Buy Now
                      </button>
                      <button className="rounded-full px-7 py-3 bg-primary shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-red-400 hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1 border rounded-md overflow-hidden">
                        <img
                          src="/images/deal-1.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className=" font-semibold lg:text-2xl md:text-xl text-sm leading-9 text-black mb-3 whitespace-nowrap">
                          VISION® – 147 DAYTONA Hyper Silver
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-4 whitespace-nowrap">
                          In Stock
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            SKU: AG3KO9ED
                          </span>
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: 1
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
                          Delivered
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Delivery Expected by
                        </p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1 border rounded-md overflow-hidden">
                        <img
                          src="/images/deal-2.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className=" font-semibold lg:text-2xl md:text-xl text-sm leading-9 text-black mb-3 whitespace-nowrap">
                        RADAR DIMAX AS-8 215_55R17 94V
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-4 whitespace-nowrap">
                          In Stock
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            SKU: AG3KO9ED
                          </span>
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: 1
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                            Price $80.00
                          </p>
                        </div>
                      </div>

                      
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Delivery Expected by
                        </p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-9" />

                  <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                    <div className="flex max-sm:flex-col-reverse items-center">
                      <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-primary">
                       <X />
                        Show Similar Products
                        {/* cancel order */}
                      </button>
                      <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                        Payment Is Succesfull
                      </p>
                    </div>
                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                      
                      <span className="text-gray-500">Total Price: </span>
                      &nbsp;$200.00
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* All Order Detail End  */}
          </TabsContent> 

          <TabsContent value="Pending">
            <section>
              <h2 className=" my-9 font-extrabold text-3xl lead-10 text-black">
                Pending Order List
              </h2>
              
             <div className="border rounded-md p-4">
             <div className="pt-8 lg:flex md:flex justify-between  items-center">
                <p className="font-medium text-base leading-8 text-gray-500 whitespace-nowrap lg:mb-0 md:mb-0 mb-4">
                  Order ID :
                  <span className=" text-black text-lg font-semibold ml-3">
                    #10234987
                  </span>
                </p>

                <div className="flex items-center gap-3">
                  <button className="flex items-center bg-primary text-white border rounded-md  font-semibold text-sm transition-all duration-500 px-4 py-2">
                    <LocateFixedIcon className="w-4 h-4 mr-1" />Track Order
                  </button>
                  <button className=" text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500  hover:border rounded-md px-4 py-2">
                    Show Invoice
                  </button>
                </div>
              </div>
           
            <div>
              <p className="font-medium text-base leading-8 text-gray-500 whitespace-nowrap ">
                  Order Date :
                <span className=" text-black text-lg font-semibold ml-3">
                  Feb 16, 2023
                </span>
              </p>
              <p className="flex font-medium text-base leading-8 text-gray-500 whitespace-nowrap lg:mb-0 md:mb-0 mb-4">
                 Estimated Delivery :
                <span className="flex items-center  text-green-500 text-lg font-semibold ml-3">
                  <Plane className="w-4 h-4 mr-1"/>May 16, 2023
                </span>
              </p>
            </div>
            <Separator className="my-5"/>

            <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
              <div className="grid grid-cols-4 w-full">
                <div className="col-span-4 sm:col-span-1 border rounded-md overflow-hidden">
                  <img src="/images/deal-1.jpg" alt="" className="max-sm:mx-auto" />
                </div>
                <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                  <h6 className=" font-semibold lg:text-2xl md:text-xl text-sm leading-9 text-black mb-3 whitespace-nowrap">VISION® – 147 DAYTONA Hyper Silver</h6>
                  <p className="font-normal text-lg leading-8 text-gray-500 mb-4 whitespace-nowrap">In Stock</p>
             
                  <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">SKU: AG3KO9ED</span>
                    <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">Qty: 1</span>
                    <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">Price $80.00</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                <div className="flex flex-col justify-center items-start max-sm:items-center">
                  <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Payment</p>
                  <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">Online</p>
                </div>
                
                <div className="flex flex-col justify-center items-start max-sm:items-center">
                  <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">Action</p>
                  <p className="flex gap-4 font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                     <Pencil className="w-4 h-4 mr-1 hover:text-primary"/> 
                    <Trash2 className="w-4 h-4 mr-1 hover:text-primary" />
                    <Download className="w-4 h-4 mr-1 hover:text-primary" />
                  </p>
                </div>
              </div>
            </div>
             </div>

            </section>
            
          </TabsContent>

          <TabsContent value="Delivered">
          <div className="order-history mt-7 pt-9">
              <div className=" border border-gray-300  rounded-lg overflow-hidden mb-5">
                <div className="lg:flex md:flex inline lg:bg-gray-100/60 md:bg-gray-100/60   lg:px-14 lg:py-10 py-10 px-5">
                  <div className="data lg:text-left md:text-left text-center ">
                    <div className="mb-4">
                      <p className="font-medium text-base leading-8 text-gray-500 whitespace-nowrap">
                        Order ID
                      </p>
                      <p className=" text-black text-lg font-semibold">
                        #10234987
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium text-base leading-8 text-gray-500 whitespace-nowrap">
                        Order Date
                      </p>
                      <p className=" text-black text-lg font-semibold">
                        14 January, 2023
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="font-medium text-base leading-8 text-gray-500 whitespace-nowrap">
                        Total Amount
                      </p>
                      <p className=" text-black text-lg font-semibold">$499</p>
                    </div> 

                    <div className="mb-4">
                      <p className="font-medium text-base leading-8 text-gray-500 mt-3 whitespace-nowrap">
                        Order Status
                      </p>
                      <p className="text-green-500 text-lg font-semibold">
                        Delivered
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-8 md:gap-12 w-full lg:px-10">
                    <div className="space-y-6 ">
                      <Card className="!border-none !shadow-none ">
                        <CardContent className=" rounded !p-4">
                          <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src="/images/deal-1.jpg"
                                  alt="Product Image"
                                  width={64}
                                  height={64}
                                  className="rounded-md"
                                  style={{
                                    aspectRatio: "64/64",
                                    objectFit: "cover",
                                    border:"1px gray solid",
                                    
                                  }}
                                />
                                <div className="order-list">
                                  <h3 className="font-bold mb-1 hover:text-primary">Factory Radio AM FM Radio CD Player</h3>
                                  <div className="lg:flex md:flex items-center gap-3  w-full lg:divide-x-2 md:divide-x-2 lg:divide-gray-200 md:divide-gray-200">
                                    <p className="text-black text-sm">
                                    <span className="font-semibold text-gray-500">year:</span> 2012, 2013, 2014, 2015, 2016
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                      <span className="font-semibold text-gray-500">Make:</span> BMW
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                    <span className="font-semibold text-gray-500"> Model: </span> x50, x80
                                    </p>
                                  </div>
                                  
                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Part No:</span> 1236AB
                                  </p>

                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Categories:</span> Tools, Battery & Adhesives
                                  </p> 
                                  <div className="flex items-center gap-3 mt-4  w-full divide-x-2 divide-gray-200">
                                    <button className="bg-primary text-white border px-2 py-1 rounded-md  font-semibold text-sm transition-all duration-500">
                                      View product
                                    </button>
                                    <button className="bg-white text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500  pl-2">
                                      Similar Product
                                    </button>
                                    <button className=" text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500 pl-2">
                                      Show Invoice
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="font-medium">$49.99</div>
                            </div>
                            {/* First order List End */}
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src="/images/deal-1.jpg"
                                  alt="Product Image"
                                  width={64}
                                  height={64}
                                  className="rounded-md"
                                  style={{
                                    aspectRatio: "64/64",
                                    objectFit: "cover",
                                    border:"1px gray solid",
                                    
                                  }}
                                />
                                <div className="order-list">
                                  <h3 className="font-bold mb-1 hover:text-primary">Factory Radio AM FM Radio CD Player</h3>
                                  <div className="lg:flex md:flex items-center gap-3  w-full lg:divide-x-2 md:divide-x-2 lg:divide-gray-200 md:divide-gray-200">
                                    <p className="text-black text-sm">
                                    <span className="font-semibold text-gray-500">year:</span> 2012, 2013, 2014, 2015, 2016
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                      <span className="font-semibold text-gray-500">Make:</span> BMW
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                    <span className="font-semibold text-gray-500"> Model: </span> x50, x80
                                    </p>
                                  </div>
                                  
                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Part No:</span> 1236AB
                                  </p>

                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Categories:</span> Tools, Battery & Adhesives
                                  </p> 
                                  <div className="flex items-center gap-3 mt-4  w-full divide-x-2 divide-gray-200">
                                    <button className="bg-primary text-white border px-2 py-1 rounded-md  font-semibold text-sm transition-all duration-500">
                                      View product
                                    </button>
                                    <button className="bg-white text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500  pl-2">
                                      Similar Product
                                    </button>
                                    <button className=" text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500 pl-2">
                                      Show Invoice
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="font-medium">$49.99</div>
                            </div>
                            {/* Second order list end */}
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src="/images/deal-1.jpg"
                                  alt="Product Image"
                                  width={64}
                                  height={64}
                                  className="rounded-md"
                                  style={{
                                    aspectRatio: "64/64",
                                    objectFit: "cover",
                                    border:"1px gray solid",
                                    
                                  }}
                                />
                              <div className="order-list">
                                  <h3 className="font-bold mb-1 hover:text-primary">Factory Radio AM FM Radio CD Player</h3>
                                  <div className="lg:flex md:flex items-center gap-3  w-full lg:divide-x-2 md:divide-x-2 lg:divide-gray-200 md:divide-gray-200">
                                    <p className="text-black text-sm">
                                    <span className="font-semibold text-gray-500">year:</span> 2012, 2013, 2014, 2015, 2016
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                      <span className="font-semibold text-gray-500">Make:</span> BMW
                                    </p>
                                    <p className="text-black text-sm lg:pl-2 md:pl-2">
                                    <span className="font-semibold text-gray-500"> Model: </span> x50, x80
                                    </p>
                                  </div>
                                  
                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Part No:</span> 1236AB
                                  </p>

                                  <p className="text-black text-sm mt-1">
                                  <span className="font-semibold text-gray-500">Categories:</span> Tools, Battery & Adhesives
                                  </p> 
                                  <div className="flex items-center gap-3 mt-4  w-full divide-x-2 divide-gray-200">
                                    <button className="bg-primary text-white border px-2 py-1 rounded-md  font-semibold text-sm transition-all duration-500">
                                      View product
                                    </button>
                                    <button className="bg-white text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500  pl-2">
                                      Similar Product
                                    </button>
                                    <button className=" text-gray-900 hover:text-primary font-semibold text-sm transition-all duration-500 pl-2">
                                      Show Invoice
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="font-medium">$49.99</div>
                            </div>
                            {/* Third Order List End */}
                          
                          </div>
                        </CardContent>
                        <Separator className="my-5"/>
                        <CardFooter className="flex items-center justify-between lg:!pb-4 md:!pb-4 !py-0">
                          <div className="text-muted-foreground">Subtotal</div>
                          <div className="font-medium">$129.98</div>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                 
                </div>
              </div>
              {/* First End  */}
 
            </div>
          </TabsContent>
          {/* Delivered Order List End */}
          <TabsContent value="Cancle">
          <section className="py-5 ">
              <h2 className=" font-extrabold text-3xl lead-10 text-black">
                Cancle Order
              </h2> 
               <div className="w-full max-w-7xl mx-auto lg:px-4 md:px-8">
                <div className="mt-7 border border-gray-300 pt-9 rounded-lg">
                  {/* order detail section */}
                  <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11">
                    <div className="data">
                      <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
                        Order ID :
                        <span className="underline text-lg font-semibold">
                          #10234987
                        </span>
                      </p>
                      <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Order Status :
                        <span className="text-primary text-lg font-semibold ml-2">
                        Cancle
                        </span>
                      </p>
                      <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Order Payment :
                        <span className="underline text-lg font-semibold">
                          Refund
                        </span>
                      </p>
                      {/* <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
                        Delivery Date :
                        <span className="underline text-lg font-semibold">
                          23rd March 2021
                        </span>
                      </p> */}
                    </div>
                    <div className="lg:flex md:grid inline items-center gap-3 max-md:mt-5 lg:space-x-0 md:space-x-0 space-x-5 ">
                      {/* <button className="rounded-full px-7 py-3 lg:mb-0 md:mb-0 mb-4 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Show Invoice
                      </button> */}
                      <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Buy Now
                      </button>
                      <button className="rounded-full px-7 py-3 bg-primary shadow-sm shadow-transparent text-white font-semibold text-sm transition-all duration-500 hover:shadow-red-400 hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1 border rounded-md overflow-hidden">
                        <img
                          src="/images/deal-1.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className=" font-semibold lg:text-2xl md:text-xl text-sm leading-9 text-black mb-3 whitespace-nowrap">
                          VISION® – 147 DAYTONA Hyper Silver
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-4 whitespace-nowrap">
                          In Stock
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            SKU: AG3KO9ED
                          </span>
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: 1
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                            Price $80.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className="font-semibold text-lg leading-8 text-primary text-left whitespace-nowrap">
                        Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Cancle Date
                        </p>
                        <h2 className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                              March 24, 2023 
                        </h2>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-9" />

                  <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11">
                    <div className="grid grid-cols-4 w-full">
                      <div className="col-span-4 sm:col-span-1 border rounded-md overflow-hidden">
                        <img
                          src="/images/deal-2.jpg"
                          alt=""
                          className="max-sm:mx-auto"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
                        <h6 className=" font-semibold lg:text-2xl md:text-xl text-sm leading-9 text-black mb-3 whitespace-nowrap">
                        RADAR DIMAX AS-8 215_55R17 94V
                        </h6>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-4 whitespace-nowrap">
                          In Stock
                        </p>
                        <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            SKU: AG3KO9ED
                          </span>
                          <span className="font-normal text-lg leading-8 text-gray-500 whitespace-nowrap">
                            Qty: 1
                          </span>
                          <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                            Price $80.00
                          </p>
                        </div>
                      </div>

                      
                    </div>
                    <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Status
                        </p>
                        <p className="font-semibold text-lg leading-8 text-red-500 text-left whitespace-nowrap">
                          Cancelled
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-start max-sm:items-center">
                        <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
                          Delivery Expected by
                        </p>
                        <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
                          23rd March 2021
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-9" />

                  <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
                    <div className="flex max-sm:flex-col-reverse items-center">
                      <button className="flex items-center gap-3 py-10 pr-8 sm:border-r border-gray-300 font-normal text-xl leading-8 text-gray-500 group transition-all duration-500 hover:text-primary">
                       <X />
                        Show Similar Products
                        {/* cancel order */}
                      </button>
                      <p className="font-normal text-xl leading-8 text-gray-500 sm:pl-8">
                        Total Amount  
                      </p>
                    </div>
                    <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
                      
                      <span className="text-gray-500">Total Price: </span>
                      &nbsp;$200.00
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
        {/* For small screens */}
      </section>
    </div>
  );
}
