import { getAllProducts, getProductBySlug } from "@/actions/ProductsAction";
import Breadcrumb from "@/components/Breadcrumb";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import CompatibleMessage from "@/components/CompatibleMessage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageCarousel from "@/components/Products/ImageCarousel";
import ProductReel from "@/components/Products/ProductReel";
import ReviewStar from "@/components/ReviewStar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SITE_METADATA } from "@/constants";
import { cn, formatPrice } from "@/lib/utils";
import {
  Check,
  DollarSignIcon,
  Headset,
  Heart,
  IterationCcw,
  Package,
  PhoneOutgoing,
  Store,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { product, error } = await getProductBySlug(params.slug);
  if (!product || error) return;

  return {
    title: `${product.productTitle} | ${SITE_METADATA.name}`,
    description: product.longDescription,
    openGraph: {
      title: product.productTitle,
      description: product.longDescription,
      type: "website",
      url: `${SITE_METADATA.url}/product/${params.slug}`,
      siteName: SITE_METADATA.name,
      images: product.productImages.map((image) => image.url),
    },
  };
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  const { product, error } = await getProductBySlug(params.slug);

  const { products: relatedProducts, totalCount } = await getAllProducts({
    limit: 10,
  });

  if (!product || error) {
    // TODO: throw internal server error
    return;
  }

  return (
    <>
      <MaxWidthWrapper>
        {/* Breadcrumb */}
        <section className="my-4">
          <Breadcrumb />
        </section>
        <div className="mx-auto my-3 lg:space-x-7 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
          <section>
            {/* Product Images */}
            <div className="overflow-hidden">
              <ImageCarousel images={product.productImages} />
            </div>

            {/* Compatibility Table */}
            <div className="hidden lg:block">
              <div className="mt-5 border rounded-xl overflow-hidden">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">Year</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Make</TableCell>
                      <TableCell>BMW</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Model</TableCell>
                      <TableCell>x50, x80</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Sub Model</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm my-2 text-center from-gray-400">
                List of all compatible makes and models.
              </p>
            </div>
          </section>
          {/* Product Info */}
          <div>
            <h1 className="leading-[1.2] font-bold text-[calc(1.375rem+1.5vw)]">
              {product?.productTitle}
            </h1>

            <div className="flex items-center gap-1 lg:gap-2">
              {/* Review / SKU */}
              <div className="flex items-center gap-x-1">
                <ReviewStar rating={4} height={28} />
                <span className="font-semibold text-xs lg:text-sm">
                  {1} review
                </span>
              </div>

              <Separator orientation="vertical" className="h-5" />
              <span className="uppercase text-muted-foreground text-[0.8125rem] font-medium">
                Part No: {product?.partNumber}
              </span>

              {/* Stock */}
              <div
                className={cn(
                  "flex items-center px-2 py-1 rounded-sm",
                  { "bg-green-200/35": product?.productStock > 0 },
                  { "bg-red-200/35": product?.productStock <= 0 }
                )}
              >
                <Package
                  size={17}
                  strokeWidth={1}
                  className={cn({
                    "text-successDark": product?.productStock > 0,
                    "text-red-500": product?.productStock <= 0,
                  })}
                />
                {product.productStock > 0 ? (
                  <span className="font-semibold text-xs ml-2 text-successDark">
                    In Stock
                  </span>
                ) : (
                  <span className="font-semibold text-xs ml-2 text-red-500">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
            {/* Price */}
            <div className="flex my-5 items-end gap-x-2">
              <h3 className="text-2xl text-gray-400">
                <s>{formatPrice(product?.regularPrice)}</s>
              </h3>
              <h3 className="text-primary text-3xl font-semibold">
                {formatPrice(product?.salePrice)}
              </h3>
            </div>
            {/* Short Description */}
            <div className="my-5">
              <h5 className="text-sm text-gray-400 font-normal">
                {product?.longDescription}
              </h5>
            </div>
            <Separator />
            {/* Qty / Add to cart */}
            {product.productStock > 0 && (
              <div className="hidden my-3 lg:flex items-center space-x-3">
                {/* Counter */}
                <AddToCartButton strokeWidth={2} product={product} />
                {/* Compatibility Message */}
                <CompatibleMessage isCompatible={true} />
              </div>
            )}

            {/* Add to favorites */}
            <div className="my-5 flex items-center justify-between">
              <p className="text-xs">
                Did you like this product? Add to favorites now and follow the
                product.
              </p>
              <span className="border cursor-pointer transition duration-200 bg-gray-100 hover:bg-red-100 hover:text-primary rounded-xl p-2">
                <Heart size={20} strokeWidth={1.2} />
              </span>
            </div>

            {/* Contact Seller Goes */}
            <div className="w-full flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 border-2 border-dashed border-gray-200 dark:border-gray-400 rounded-lg">
              <div className="w-full flex justify-center sm:justify-start sm:w-auto">
                <Image
                  src="/images/logo.webp"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="object-cover mt-3 mr-3 rounded-full"
                />
              </div>
              <div className="w-full flex flex-col items-start">
                <p className="flex items-center gap-1 mb-2 font-semibold text-black mx-auto lg:mx-0">
                  Nates Tools and More
                  <Link
                    href={"#reviews"}
                    className="text-gray-500 font-normal text-sm italic"
                  >
                    (2299 reviews)
                  </Link>
                </p>
                <div className="text-gray-500 mb-2 flex items-center gap-3 lg:gap-1 mx-auto lg:mx-0">
                  <p className="font-bold text-sm flex items-center gap-1">
                    <ThumbsUp size={18} />
                    99.7% Positive
                  </p>
                  <Separator orientation="vertical" className="h-5" />
                  <Link
                    href="/"
                    className="hover:text-red-500 font-bold text-sm flex items-center gap-1"
                  >
                    <Store size={18} />
                    Visit Seller Store
                  </Link>
                  <Separator orientation="vertical" className="h-5" />
                  <Link
                    href="/"
                    className="hover:text-red-500 font-bold text-sm flex items-center gap-1"
                  >
                    <PhoneOutgoing size={18} />
                    Contact Seller
                  </Link>
                </div>
              </div>
            </div>

            {/* Marketing Icons  */}
            <div className="grid grid-cols-2 gap-x-5 gap-y-7 mt-5">
              <div className="flex items-center gap-x-2">
                <span className="border rounded-full p-2">
                  <DollarSignIcon />
                </span>
                <p className="flex flex-col font-semibold text-sm">
                  Low prices
                  <span className="text-gray-500 font-normal text-xs">
                    Price match guarantee
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="border rounded-full p-2">
                  <Check />
                </span>
                <p className="flex flex-col font-semibold text-sm">
                  Guaranteed Fitment.
                  <span className="text-gray-500 font-normal text-xs">
                    Always the correct part
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="border rounded-full p-2">
                  <Headset />
                </span>
                <p className="flex flex-col font-semibold text-sm">
                  In-House Experts.
                  <span className="text-gray-500 font-normal text-xs">
                    We know our products
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <span className="border rounded-full p-2">
                  <IterationCcw />
                </span>
                <p className="flex flex-col font-semibold text-sm">
                  Easy Returns.
                  <span className="text-gray-500 font-normal text-xs">
                    Quick & Hassle Free
                  </span>
                </p>
              </div>
            </div>

            <Separator className="mt-10" />

            {/* Category */}
            <div className="mt-5 flex items-center">
              <span className="text-sm font-light text-gray-400 mr-1">
                Categories:
              </span>
              <ul className="flex items-center gap-x-[2px] text-sm">
                <li>
                  <Link href={"#"}>Tools</Link>,
                </li>
                <li>
                  <Link href={"#"}>Battery & Adhesives</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Description/Reviews Tabs */}
        <section className="my-10">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="justify-start bg-transparent lg:mb-2">
              <TabsTrigger
                value="description"
                className="font-medium text-sm lg:text-lg text-gray-400 pl-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="additional-info"
                className="font-medium text-sm lg:text-lg text-gray-400 pl-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Additional Information
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="font-medium text-sm lg:text-lg text-gray-400 pl-0 bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Reviews(5)
              </TabsTrigger>
            </TabsList>
            <Separator className="h-[0.5px]" />

            <TabsContent
              value="description"
              className="font-light text-gray-700 my-5"
            >
              {product.longDescription}
            </TabsContent>
            <TabsContent value="additional-info">
              <div className="mt-5 border rounded-xl overflow-hidden max-w-lg">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold">Year</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Make</TableCell>
                      <TableCell>BMW</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold">Model</TableCell>
                      <TableCell>x50, x80</TableCell>
                    </TableRow>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-bold">Sub Model</TableCell>
                      <TableCell>2012, 2013, 2014, 2015, 2016</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm my-2 text-center from-gray-400">
                List of all compatible makes and models.
              </p>
            </TabsContent>
            <TabsContent value="reviews">sfsdfsd</TabsContent>
          </Tabs>
        </section>

        {/* Related products */}
        {relatedProducts && (
          <section>
            <h3 className="font-bold text-xl">Related Products</h3>
            <Separator className="my-5" />
            <ProductReel products={relatedProducts} />
          </section>
        )}
      </MaxWidthWrapper>
      {/* Qty/Cart - Mobile */}
      {product && product.productStock > 0 && (
        <div className="lg:hidden p-4 fixed bottom-0 bg-white w-full z-50">
          {/* Counter */}
          <AddToCartButton strokeWidth={2} product={product} />
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
