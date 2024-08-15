"use client";
import { promoCodeForm, promoCodeType } from "@/types/checkoutSchema";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CouponCodeForm() {
  const promoForm = useForm<promoCodeType>({
    resolver: zodResolver(promoCodeForm),
    defaultValues: {
      promoCode: "",
    },
  });
  const handlePromoCode = async (values: promoCodeType) => {
    // TODO: handle promo code
    console.log("values", values);
  };
  return (
    <Form {...promoForm}>
      <form
        onSubmit={promoForm.handleSubmit(handlePromoCode)}
        className="flex items-start gap-x-3 justify-between"
      >
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={promoForm.control}
          name="promoCode"
          placeholder="Enter promo code"
        />
        <Button type="submit" variant={"dark"} className="h-11">
          Apply
        </Button>
      </form>
    </Form>
  );
}
