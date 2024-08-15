import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import PartsFinderComponent from "../Filters/PartsFinder";

const PartsFinder = ({
  className,
  strokeWidth,
  size = 20,
}: {
  className?: string;
  strokeWidth?: number;
  size?: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="lg:bg-gray-100 lg:hover:bg-gray-200 lg:rounded-lg lg:p-2">
        <Warehouse
          strokeWidth={strokeWidth}
          className={cn("", className)}
          size={size}
        />
        <Label className="lg:hidden uppercase text-[.7rem] cursor-pointer">
          Parts Finder
        </Label>
      </DialogTrigger>
      <DialogContent className="h-full  lg:h-auto">
        {/* <DialogHeader>
          <DialogTitle>CHOOSE A NEW VEHICLE</DialogTitle>
        </DialogHeader> */}

        <PartsFinderComponent />
      </DialogContent>
    </Dialog>
  );
};
export default PartsFinder;
//  <Tabs defaultValue="makeModel" className="bg-gray-300">
//           <TabsList className="flex space-x-5 justify-start  rounded-none">
//             <TabsTrigger
//               className="rounded-none font-semibold data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
//               value="makeModel"
//             >
//               MAKE/MODEL
//             </TabsTrigger>
//             <TabsTrigger
//               className="rounded-none font-semibold data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
//               value="license"
//             >
//               LICENSE
//             </TabsTrigger>
//             <TabsTrigger
//               className="rounded-none font-semibold data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
//               value="vin"
//             >
//               VIN
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="makeModel" className="p-5">
//             {/* Make/Model Form */}
//             <div className="flex space-x-5">
//               <Input placeholder="1 | Year" className="h-[3.5rem]" />
//               <Input placeholder="2 | Make" className="h-[3.5rem]" />
//               <Input placeholder="3 | Model" className="h-[3.5rem]" />
//               <Input placeholder="4 | Engine" className="h-[3.5rem]" />
//             </div>
//           </TabsContent>
//           <TabsContent value="license" className="p-5">
//             {/* license form */}
//             <div className="flex space-x-5">
//               <Input placeholder="State" className="h-[3.5rem] w-40" />
//               <Input
//                 placeholder="Enter License Plate Number"
//                 className="h-[3.5rem]"
//               />
//               <Button className="w-full h-[3.5rem]">Add Vehicle</Button>
//             </div>
//           </TabsContent>
//           <TabsContent value="vin" className="p-5">
//             {/* Vin Form */}
//             <div className="flex space-x-5 justify-between">
//               <Input placeholder="VIN" className="h-[3.5rem]" />
//               <Button className="w-full h-[3.5rem]">Add Vehicle</Button>
//             </div>
//           </TabsContent>
//         </Tabs>

//         <div className="flex justify-between gap-x-4">
//           {/* Currently Shopping for */}
//           <div>
//             <Label>Currently shopping for:</Label>
//             <Card className="shadow-sm pt-5">
//               <CardContent className="flex justify-between space-x-2">
//                 {/* Img */}
//                 <Image
//                   src="/images/car.avif"
//                   alt="vehicle"
//                   height={50}
//                   width={70}
//                 />
//                 {/* Text */}
//                 <span className="text-wrap">
//                   2023 Audi A3 Premium Plus 2.0L FI Turbo DOHC 4cyl
//                 </span>
//               </CardContent>
//             </Card>
//           </div>
//           <span className="border-l"></span>
//           {/* Saved vehicles */}
//           <div>
//             <Label>Saved vehicles:</Label>
//             <Card className="shadow-sm pt-5">
//               <CardContent className="flex justify-between space-x-2">
//                 {/* Img */}
//                 <Image
//                   src="/images/car.avif"
//                   alt="vehicle"
//                   height={50}
//                   width={70}
//                 />
//                 {/* Text */}
//                 <span className="text-wrap">
//                   2023 Audi A3 Premium Plus 2.0L FI Turbo DOHC 4cyl
//                 </span>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
