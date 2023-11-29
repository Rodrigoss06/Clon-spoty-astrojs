import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import cn from "clsx"

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex  touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-600">
      <SliderPrimitive.Range className="absolute h-full bg-white" />
    </SliderPrimitive.Track>

    <SliderPrimitive.Thumb className="hidden group-hover:block h-3 w-3 bg-white rounded-full border-2 border-yellow-700 ring-offset-gray-700   hover:bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2   focus-visible:bg-white  disabled:pointer-events-none disabled:opacity-50 " />

  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

