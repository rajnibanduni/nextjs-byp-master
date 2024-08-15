"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import React from "react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);
  // TODO: fix this layout in mobile
  return (
    <BreadcrumbPrimitive>
      <BreadcrumbList className="text-xs gap-x-1">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    <span className="capitalize">{path}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    <span className="capitalize">{path}</span>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
}
