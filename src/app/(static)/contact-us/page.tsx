import Input from "postcss/lib/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarClock, Headset, MapPinned } from "lucide-react";

// Contact Us Page Done
const ContactUs = () => {
  return(
    <div className=" bg-white my-20 lg:px-8 md:px-8">
    <div className="container mx-auto ">
        <div className="">
                <div className="mb-4">
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <p className="text-base  font-semibold uppercase tracking-wide text-primary dark:text-blue-200"> Contact </p>
                        <h2 className="font-heading mb-4  font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl"> Get in Touch </h2>
                        <p className="mx-auto mt-4 max-w-3xl  text-xl text-gray-600 dark:text-slate-400"> Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                        <div className="h-full pr-6">
                            <p className="mt-3 mb-12  text-lg text-gray-600 dark:text-slate-400">
                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, voluptas in 
                               officiis vero sequi porro assumenda inventore? Quis voluptates aliquam tempora quo et, 
                               nisi accusamus eveniet qui mollitia.
                            </p>
                            <ul className="mb-6 md:mb-0">
                                <li className="flex">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-gray-50">
                                        <MapPinned className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4 mb-5 font-normal text-gray-600 dark:text-slate-400">
                                        <h3 className="mb-1 text-lg  font-semibold leading-6 text-gray-900 dark:text-white">Our Address
                                        </h3>
                                        <p>1230 Maecenas Street Donec Road</p>
                                        <p>New York, EEUU</p>
                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-gray-50">
                                        <Headset className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4 mb-4 font-normal text-gray-600 dark:text-slate-400">
                                        <h3 className="mb-1 text-lg font-semibold leading-6 text-gray-900 dark:text-white">Contact
                                        </h3>
                                        <p className="mb-1 text-sm font-bold">+1 (123) 456-7890</p>
                                        <p className="mb-1 underline">test@mail.com</p>
                                        <p className="mb-1 underline">support@buyurparts.com</p>

                                    </div>
                                </li>
                                <li className="flex">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-gray-50">
                                        <CalendarClock className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4 mb-4 text-gray-600 dark:text-slate-400 font-normal">
                                        <h3 className="mb-2 text-lg font-semibold leading-6 text-gray-900 dark:text-white">Working
                                            hours</h3>
                                        <p className="mb-1">Monday - Friday: 08:00 - 17:00</p>
                                        <p>Saturday &amp; Sunday: 08:00 - 12:00</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-4 text-2xl  font-bold dark:text-white">Ready to Get Started?</h2>
                            <form className="w-full">
                                <div className="first-section">
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" >
                                              First Name *
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200  text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Johon" required />
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                          <label className="block uppercase tracking-wide text-gray-700 text-xs  font-bold mb-2" >
                                            Last Name *
                                          </label>
                                          
                                          <input className="appearance-none block w-full bg-gray-200  text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Doe" required />
                                        </div>
                                    </div>
                                    {/* <!---First or Last Name End--> */}
                                    
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" >
                                              Email Address *
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200  text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="email" type="email" placeholder="Enter e-mail address.." required />    
                                        </div>
                                    </div>
                                    {/* <!--Email Address End--> */}
                                    
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" >
                                              Subject *
                                            </label>
                                            <input className="appearance-none block w-full bg-gray-200  text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="subject" type="text" placeholder="Subject.." required />    
                                        </div>
                                    </div>
                                    {/* <!--Email Address End--> */}

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2" >
                                              Message *
                                            </label>
 
                                            <textarea id="textarea" name="textarea" cols={30} rows={5} placeholder="Write your message..." className="w-full bg-gray-200  text-sm text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                                        </div>
                                    </div>
                                    {/* <!--Message End--> */}
                                    
                                    <div className="flex justify-end gap-4">
                                        <button type="button" className="bg-primary/90 hover:bg-primary rounded-md px-5 py-3 text-white  font-semibold text-sm mb-4">Submit</button>
                                        <button type="button" className="bg-white hover:bg-gray-200 border border-gray-500 rounded-md px-5 py-3 text-black  font-semibold text-sm mb-4">Reset</button>
                                    </div>
                                </div>
                                {/* <!--first End --> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
       
    </div>
    {/* <!--Conatiner Edn--> */}
</div>
  ) 
};

export default ContactUs;