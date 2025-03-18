import React from "react";
import { cn } from "../../lib/utils.js";

const Button = ({ className, ...props }) => (
  <button
    className={cn("px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600", className)}
    {...props}
  />
);

export { Button };