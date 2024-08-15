import { Fullscreen } from "lucide-react";
import Image from "next/image"

// About Page Done
const AboutUsPage = () => {
  return (
    <> 
    <div className="my-20 mx-auto w-full max-w-screen-xl px-4 md:px-15 ">
        <div className="container-x mx-auto h-full">
            <div className="w-full px-4 mx-auto sm:px-8 mt-24">
                <blockquote className=" grid items-center bg-white shadow-xl md:grid-cols-3 rounded-xl">
                    <img className=" object-cover w-full h-full rounded-l-xl md:block pb-8 lg:pb-0 md:pb-0  clip-image "  src="https://klbtheme.com/partdo/wp-content/uploads/2022/10/image-03.jpg" /> 
                    <article className="relative px-6 md:px-8 md:col-span-2">
                        <div className="space-y-8">
                            <h2 className="font-krub font-bold text-4xl text-black ">YOU'VE COME TO THE RIGHT PLACE!</h2>
                            <p className="font-krub text-base sm:leading-relaxed text-black font-normal">
                                <a href="buyparts.com.html" className="text-emerald-500">BuyUrParts</a> is one of the fastest-growing online retailers of automotive parts and 
                                accessories today. Whether you’re looking for performance gear, interior accessories, or 
                                style upgrades, we’ve got you covered. We also offer you the best one-on-one customer 
                                service anywhere for every one of our products.
                            </p>

                            <p className="font-krub text-base sm:leading-relaxed text-black font-normal">
                                We are devoted to offering our customers an easy and convenient way to shop for auto 
                                parts online. At Buy Ur Parts, our goal is to provide customers with direct access to 
                                auto parts dealers in a timely manner so they can get the automotive components they 
                                need. We want you to have a great shopping experience while browsing our catalog. Our 
                                customer service team is available 24/7. With every service we provide, you can be sure 
                                of getting top-notch quality in a timely manner.
                            </p> 
                        </div>
                    </article>
                </blockquote>
            </div>
        </div>
    </div>
     
    </>
   
  )};

export default AboutUsPage;
