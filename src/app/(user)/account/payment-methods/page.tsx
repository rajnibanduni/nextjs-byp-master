"use client";

import Breadcrumb from "@/components/Breadcrumb"
import { Separator } from "@radix-ui/react-separator"
import { ArrowDown, ArrowUp, BadgeAlert, FileText, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

export default function PaymentMethods() {
  return(
    <div className="h-full mx-auto w-full max-w-screen-xl px-4 md:px-15 ">
    {/* Breadcrum Goes */}
    <section className="my-5">
      <Breadcrumb />
    </section>
    {/* Breadcrum End */}

    <div className="w-full lg:px-6 py-6 mx-auto">
            <div className="lg:flex md:flex lg:flex-wrap   lg:-mx-3">
                {/* Billing Information goes  */}
                <div className="w-full max-w-full lg:px-3 md:w-8/12 md:flex-none">
                    <div className="relative flex flex-col min-w-0 break-words bg-white  shadow-soft-xl rounded-2xl bg-clip-border">
                      <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                        <h6 className="mb-0 ">Payment Information</h6>
                      </div>
                      <div className="flex-auto p-4 pt-6">
                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                          <li className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                            <div className="flex flex-col">
                              <h6 className="mb-4 leading-normal  text-sm">Lorem ipsum</h6>
                              <span className="mb-2 leading-tight  text-xs">Bank Name: <span className="font-semibold text-slate-700 sm:ml-2">Lorem ipsum</span>
                              </span>
                              <span className="mb-2 leading-tight  text-xs">Email Address: <span className="font-semibold text-slate-700 sm:ml-2">text@test.com</span>
                              </span>
                              <span className="leading-tight  text-xs">Lorem ipsum: <span className="font-semibold text-slate-700 sm:ml-2">123456780</span>
                              </span>
                            </div>
                            <div className="ml-auto text-right">
                              <Link href="/"  className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gradient-to-tl from-red-600 to-rose-400 hover:scale-102 active:opacity-85  bg-clip-text">
                                  <Trash2 className="h-4 w-4 mr-2 text-gray-800" /> Delete 
                              </Link>
                              <Link href="/" className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gray-800 hover:scale-102 active:opacity-85  bg-clip-text">
                                <Pencil className="h-4 w-4 mr-2 text-gray-800" />Edit
                              </Link>
                            </div>
                          </li>
                          <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-xl bg-gray-50">
                            <div className="flex flex-col">
                              <h6 className="mb-4 leading-normal  text-sm">Lorem ipsum</h6>
                              <span className="mb-2 leading-tight  text-xs">Bank Name: <span className="font-semibold text-slate-700 sm:ml-2">Lorem ipsum</span>
                              </span>
                              <span className="mb-2 leading-tight  text-xs">Email Address: <span className="font-semibold text-slate-700 sm:ml-2">test@stest.com</span>
                              </span>
                              <span className="leading-tight  text-xs">Lorem ipsum: <span className="font-semibold text-slate-700 sm:ml-2">123456780</span>
                              </span>
                            </div>
                            <div className="ml-auto text-right">
                            <Link href="/"  className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gradient-to-tl from-red-600 to-rose-400 hover:scale-102 active:opacity-85  bg-clip-text">
                                  <Trash2 className="h-4 w-4 mr-2 text-gray-800" /> Delete 
                              </Link>
                              <Link href="/" className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gray-800 hover:scale-102 active:opacity-85  bg-clip-text">
                                <Pencil className="h-4 w-4 mr-2 text-gray-800" />Edit
                              </Link>
                            </div>
                          </li>
                          <li className="relative flex p-6 mt-4 mb-2 border-0 rounded-b-inherit rounded-xl bg-gray-50">
                            <div className="flex flex-col">
                              <h6 className="mb-4 leading-normal  text-sm">Lorem ipsum</h6>
                              <p className="mb-2 leading-tight text-xs">Bank Name: <span className="font-semibold text-slate-700 sm:ml-2">Lorem ipsum</span> </p>
                              <p className="mb-2 leading-tight text-xs">Email Address: <span className="font-semibold text-slate-700 sm:ml-2">test@test.com</span> </p>
                              <p className="leading-tight  text-xs">Lorem ipsum: <span className="font-semibold text-slate-700 sm:ml-2">123456780</span> </p>
                            </div>

                            <div className="ml-auto text-right">
                                <Link href="/"  className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gradient-to-tl from-red-600 to-rose-400 hover:scale-102 active:opacity-85  bg-clip-text">
                                  <Trash2 className="h-4 w-4 mr-2 text-gray-800" /> Delete 
                                </Link>
                                <Link href="/" className="relative z-10 inline-flex items-center  px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-gray-800 hover:scale-102 active:opacity-85  bg-clip-text">
                                  <Pencil className="h-4 w-4 mr-2 text-gray-800" />Edit
                              </Link> 
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
              {/* -Billing Information End */}

              {/* Invoices Goes */}
              <div className="w-full max-w-full lg:px-3 lg:w-1/3 lg:flex-none">
                <div className="flex flex-col h-full min-w-0 break-words bg-white  shadow-soft-xl rounded-2xl bg-clip-border">

                  <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                    <div className="flex flex-wrap -mx-3">
                      <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                        <h6 className="mb-0 ">Invoices</h6>
                      </div>
                      <div className="flex-none w-1/2 max-w-full px-3 text-right">
                      <Link href="/" className="inline-block px-8 py-2 mb-0 font-bold text-center  uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xsactive:opacity-85 hover:scale-102   border-primary text-primary hover:opacity-75">
                        View All
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex-auto p-4 pb-0">
                    <h4 className="mb-2">March 2023</h4>
                    <Separator />
                    <ul className="flex flex-col mb-0 rounded-lg border divide-y divide-dashed px-2">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold  leading-normal text-sm text-slate-700">March, 01, 2020</h6>
                          <span className="leading-tight  text-xs">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center text-sm  leading-normal"> $180 
                          <Link href="/" className="inline-flex px-0 py-3 mb-0 ml-6 font-bold  leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700">
                          <FileText className="w-4 h-4 mr-1" />PDF </Link>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold leading-normal text-sm  text-slate-700">February, 10, 2021</h6>
                          <span className="leading-tight text-xs ">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center leading-normal text-sm "> $250 
                          <Link href="/" className="inline-flex px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center  uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700"> 
                          <FileText className="w-4 h-4 mr-1" />PDF </Link>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold leading-normal text-sm  text-slate-700">February, 10, 2021</h6>
                          <span className="leading-tight text-xs ">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center leading-normal text-sm "> $250 
                          <button className="inline-flex px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center  uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700">
                           
                            <FileText className="w-4 h-4 mr-1" />PDF </button>
                        </div>
                      </li>

                    </ul>
                    <h4 className="my-2">April 2023</h4>
                    <Separator />
                    <ul className="flex flex-col mb-0 rounded-lg border divide-y divide-dashed px-2">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold  leading-normal text-sm text-slate-700">March, 01, 2020</h6>
                          <span className="leading-tight  text-xs">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center text-sm  leading-normal"> $180 
                          <Link href="/" className="inline-flex px-0 py-3 mb-0 ml-6 font-bold  leading-normal text-center uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700">
                          <FileText className="w-4 h-4 mr-1" />PDF </Link>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold leading-normal text-sm  text-slate-700">February, 10, 2021</h6>
                          <span className="leading-tight text-xs ">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center leading-normal text-sm "> $250 
                          <Link href="/" className="inline-flex px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center  uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700"> 
                          <FileText className="w-4 h-4 mr-1" />PDF </Link>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-xl text-inherit">
                        <div className="flex flex-col">
                          <h6 className="mb-1 font-semibold leading-normal text-sm  text-slate-700">February, 10, 2021</h6>
                          <span className="leading-tight text-xs ">Lorem ipsum</span>
                        </div>
                        <div className="flex items-center leading-normal text-sm "> $250 
                          <button className="inline-flex px-0 py-3 mb-0 ml-6 font-bold leading-normal text-center  uppercase align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer ease-soft-intext-sm active:opacity-85 hover:scale-102   text-slate-700">
                           
                            <FileText className="w-4 h-4 mr-1" />PDF </button>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
               {/* Invoices End */}
            </div>

            {/* Transactions History Goes */}
           <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 mt-6 md:w-6/12 md:flex-none">
                    <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 px-4 pb-0   bg-white border-b-0 rounded-t-2xl mb-2">
                    <div className="flex flex-wrap -mx-3">
                      <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                        <h6 className="mb-0 ">Your Transactions</h6>
                      </div>
                      <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                        <i className="mr-2 far fa-calendar-alt" aria-hidden="true"></i>
                        <small className="">23 - 30 March 2022</small>
                      </div>
                    </div>
                  </div>
                  <div className="flex-auto p-4 pt-6 border rounded-md">
                    <h6 className="mb-4 font-bold  leading-tight uppercase text-xs text-primary">Newest</h6>
                    <ul className="flex flex-col pl-0 mb-0 rounded-lg divide-y divide-dashed">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                        <div className="flex items-center">
                          <Link href="/" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2 mr-4 mb-0 flex cursor-pointer items-center justify-center text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                            <ArrowDown  className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight text-xs ">27 March 2022, at 12:30 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold  leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 text-sm bg-clip-text">- $ 2,500</p>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white rounded-b-inherit text-inherit rounded-xl">
                        <div className="flex items-center">
                          <Link href="/" className="leading-pro ease-soft-in text-xsw-6.35 h-6.35 p-1.2 rounded-3.5xl mr-4 mb-0 flex cursor-pointer items-center justify-center text-center align-middle font-bold uppercase text-primary transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal text-sm text-slate-700 ">Lorem ipsum</h6>
                            <span className="leading-tight text-xs ">27 March 2020, at 04:30 AM 1</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-gray-600   text-sm bg-clip-text">+ $ 2,000</p>
                        </div>
                      </li> 
                    </ul>
                    <h6 className="my-4 font-bold leading-tight  uppercase text-xs text-slate-500">Yesterday</h6>
                    <ul className="flex flex-col pl-0 mb-0 rounded-lg divide-y divide-dashed">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-inherit rounded-xl">
                        <div className="flex items-center">
                          <Link href="" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2 rounded-3.5xl  mr-4 mb-0 flex cursor-pointer items-center justify-center  text-center align-middle font-bold uppercase text-gray-600 transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight  text-xs">26 March 2020, at 13:45 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-gray-600  text-sm bg-clip-text">+ $ 750</p>
                        </div>
                      </li>

                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2">
                        <div className="flex items-center">
                          <Link href="" className="leading-pro ease-soft-in text-xsw-6.35 h-6.35 p-1.2 rounded-3.5xl   mr-4 mb-0 flex cursor-pointer items-center justify-center text-center align-middle font-bold uppercase text-gray-600 transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight  text-xs">26 March 2020, at 13:45 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold  leading-normal text-gray-600  text-sm bg-clip-text">+ $ 750</p>
                        </div>
                      </li>

                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0">
                        <div className="flex items-center">
                          <Link href="" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2 mr-4 mb-0 flex cursor-pointer items-center justify-center  text-center align-middle font-bold uppercase text-gray-600 transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight  text-xs">26 March 2020, at 13:45 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold  leading-normal text-gray-600  text-sm bg-clip-text">+ $ 750</p>
                        </div>
                      </li>
                         
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-full px-3 mt-6 md:w-6/12 md:flex-none">
                    <div className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                        <div className="p-6 px-4 pb-0   bg-white border-b-0 rounded-t-2xl mb-2">
                    <div className="flex flex-wrap -mx-3">
                      <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                        <h6 className="mb-0 ">Your Transactions</h6>
                      </div>
                      <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                        <i className="mr-2 far fa-calendar-alt" aria-hidden="true"></i>
                        <small className="">01 - 30 April 2022</small>
                      </div>
                    </div>
                  </div>
                  <div className="flex-auto p-4 pt-6 border rounded-md">
                    <h6 className="mb-4 font-bold  leading-tight uppercase text-xs text-primary">Newest</h6>
                    <ul className="flex flex-col pl-0 mb-0 rounded-lg divide-y divide-dashed">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white ">
                        <div className="flex items-center">
                          <Link href="/" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2   mr-4 mb-0 flex cursor-pointer items-center justify-center bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                            <ArrowDown  className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight text-xs ">27 March 2022, at 12:30 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold  leading-normal text-transparent bg-gradient-to-tl from-red-600 to-rose-400 text-sm bg-clip-text">- $ 2,500</p>
                        </div>
                      </li>
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white">
                        <div className="flex items-center">
                          <Link href="/" className="leading-pro  ease-soft-in text-xsw-6.35 h-6.35 p-1.2 rounded-3.5xl   mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-transparent bg-transparent text-center align-middle font-bold uppercase text-primary transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal text-sm text-slate-700 ">Lorem ipsum</h6>
                            <span className="leading-tight text-xs ">27 March 2020, at 04:30 AM 1</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-gray-600   text-sm bg-clip-text">+ $ 2,000</p>
                        </div>
                      </li> 
                    </ul>
                    <h6 className="my-4 font-bold leading-tight  uppercase text-xs text-slate-500">Yesterday</h6>
                    <ul className="flex flex-col pl-0 mb-0 rounded-lg divide-y divide-dashed">
                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white">
                        <div className="flex items-center">
                          <Link href="" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2 rounded-3.5xl mr-4 mb-0 flex cursor-pointer items-center justify-center text-center align-middle font-bold uppercase text-gray-600 transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight  text-xs">26 March 2020, at 13:45 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold leading-normal text-gray-600  text-sm bg-clip-text">+ $ 750</p>
                        </div>
                      </li>

                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 ">
                        <div className="flex items-center">
                          <Link href="" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2 mr-4 mb-0 flex cursor-pointer items-center justify-center text-center align-middle font-bold uppercase text-gray-600 transition-all hover:opacity-75">
                            <ArrowUp className="h-5 w-5"/>
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal  text-sm text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight  text-xs">26 March 2020, at 13:45 PM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="relative z-10 inline-block m-0 font-semibold  leading-normal text-gray-600  text-sm bg-clip-text">+ $ 750</p>
                        </div>
                      </li>

                      <li className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white  text-inherit rounded-xl">
                        <div className="flex items-center">
                          <Link href="/" className="leading-pro ease-soft-in text-xs w-6.35 h-6.35 p-1.2   mr-4 mb-0 flex cursor-pointer items-center justify-center  bg-transparent text-center align-middle font-bold uppercase text-slate-700 transition-all hover:opacity-75">
                            <BadgeAlert className="h-5 w-5" />
                          </Link>
                          <div className="flex flex-col">
                            <h6 className="mb-1 leading-normal text-sm  text-slate-700">Lorem ipsum</h6>
                            <span className="leading-tight text-xs ">26 March 2020, at 05:00 AM</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                          <p className="flex items-center m-0 font-semibold  leading-normal text-sm text-slate-700">Pending</p>
                        </div>
                      </li>
                         
                    </ul>
                  </div>
                </div>
              </div>
            </div>  
            {/* Transactions History End */}
          </div>

    </div>
  )
}
