import React from "react";
import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => (
  <div className={cn("rounded-lg shadow-md p-4", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-4", className)} {...props} />
);

export { Card, CardContent };