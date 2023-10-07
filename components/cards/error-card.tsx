"use client"

import * as React from "react"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export function ErrorCard({
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  className,
  ...props
}: ErrorCardProps) {
  return (
    <Card
      as="section"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn("grid w-full place-items-center", className)}
      {...props}
    >
      <CardHeader>
        <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
          <Icon className="h-10 w-10" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent className="flex min-h-[176px] flex-col items-center justify-center space-y-2.5 text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="line-clamp-4">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
