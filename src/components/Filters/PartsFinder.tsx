"use client";

import { VEHICLE_ATTRIBUTES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { useEffect } from "react";
import SubmitButton from "../SubmitButton";

// Extract valid makes, models, years, and body styles
const makes = VEHICLE_ATTRIBUTES.map((vehicle) => vehicle.make);
const models = VEHICLE_ATTRIBUTES.flatMap((vehicle) =>
  vehicle.models.map((model) => model.name)
);
const years = VEHICLE_ATTRIBUTES.flatMap((vehicle) =>
  vehicle.models.flatMap((model) => model.years)
);
const bodyStyles = VEHICLE_ATTRIBUTES.flatMap((vehicle) =>
  vehicle.models.flatMap((model) => model.bodyStyles)
);

// Zod validation schema
const vehicleFilterSchema = z.object({
  make: z.string().refine((val) => makes.includes(val), {
    message: "Invalid make",
  }),
  model: z.string().refine((val) => models.includes(val), {
    message: "Invalid model",
  }),
  year: z.string().refine((val) => years.includes(val), {
    message: "Invalid year",
  }),
  bodyStyle: z.string().refine((val) => bodyStyles.includes(val), {
    message: "Invalid body style",
  }),
});

export default function PartsFinder() {
  const vehicleFilterForm = useForm({
    resolver: zodResolver(vehicleFilterSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      bodyStyle: "",
    },
  });

  const [selectedMake, selectedModel] = vehicleFilterForm.watch([
    "make",
    "model",
  ]);

  const getModels = () => {
    const make = VEHICLE_ATTRIBUTES.find((v) => v.make === selectedMake);
    return make ? make.models : [];
  };

  const getYears = () => {
    const models = getModels();
    const model = models.find((m) => m.name === selectedModel);
    return model ? model.years : [];
  };

  const getBodyStyles = () => {
    const models = getModels();
    const model = models.find((m) => m.name === selectedModel);
    return model ? model.bodyStyles : [];
  };

  useEffect(() => {
    vehicleFilterForm.reset({
      make: selectedMake,
      model: "",
      year: "",
      bodyStyle: "",
    });
  }, [selectedMake, vehicleFilterForm]);

  const onSubmit = (values: z.infer<typeof vehicleFilterSchema>) => {
    // TODO: Set make model year in redux store
    console.log(values);
  };

  return (
    <div className="relative">
      <h4 className="font-bold text-base">Find the Right Parts Faster</h4>
      <p className="text-gray-400 text-xs my-5">
        Having the right automotive parts and car accessories will help you to
        boost your travel comfort and go on the long-distance journey
        comfortably that you have been planning.
      </p>

      <Form {...vehicleFilterForm}>
        <form
          onSubmit={vehicleFilterForm.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="make"
            placeholder="Select Make"
          >
            {VEHICLE_ATTRIBUTES.map((vehicle) => (
              <SelectItem key={vehicle.make} value={vehicle.make}>
                <p>{vehicle.make}</p>
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="model"
            placeholder="Select Model"
            disabled={!selectedMake}
          >
            {getModels().map((model) => (
              <SelectItem key={model.name} value={model.name}>
                {model.name}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="year"
            placeholder="Select Year"
            disabled={!selectedModel}
          >
            {getYears().map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="bodyStyle"
            placeholder="Select Body Style"
            disabled={!selectedModel}
          >
            {getBodyStyles().map((bodyStyle) => (
              <SelectItem key={bodyStyle} value={bodyStyle}>
                {bodyStyle}
              </SelectItem>
            ))}
          </CustomFormField>

          <SubmitButton isLoading={false} className="w-full font-bold">
            Find Auto Parts
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
