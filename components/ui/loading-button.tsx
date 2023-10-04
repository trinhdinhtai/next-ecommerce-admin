"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { useMounted } from "@/hooks/use-mounted"

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
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {props.children}
    </Button>
  )
})
LoadingButton.displayName = "LoadingButton"

export default LoadingButton
