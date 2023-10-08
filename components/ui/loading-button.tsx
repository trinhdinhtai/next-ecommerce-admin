"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"
import LoadingDots from "@/components/ui/loading-dot"

import { Button, ButtonProps, buttonVariants } from "./button"
import { Skeleton } from "./skeleton"

const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    isLoading: boolean
  }
>(({ className, variant, size, isLoading, ...props }, ref) => {
  const mounted = useMounted()

  if (!mounted)
    return (
      <Skeleton
        className={cn(
          buttonVariants({ variant, size, className }),
          "bg-muted text-muted-foreground"
        )}
      >
        {props.children}
      </Skeleton>
    )

  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      ref={ref}
      disabled={isLoading}
    >
      {isLoading && <LoadingDots className="mr-2" />}
      {props.children}
    </Button>
  )
})
LoadingButton.displayName = "LoadingButton"

export default LoadingButton
