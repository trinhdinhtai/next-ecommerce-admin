"use client"

import { useChangeLocale, useCurrentLocale, useScopedI18n } from "@/i18n/client"
import { i18n } from "@/i18n/config"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { catchError } from "@/lib/error"
import { cn } from "@/lib/utils"
import { accountFormSchema, AccountFormValues } from "@/lib/validations/account"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/ui/loading-button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUserAction } from "@/app/_actions/user"

interface UpdateAccountFormProps {
  user: {
    firstName: string | null
    lastName: string | null
  }
}

export default function UpdateAccountForm({
  user,
}: Readonly<UpdateAccountFormProps>) {
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const localeScope = useScopedI18n("locales")
  const formScope = useScopedI18n("form")
  const buttonScope = useScopedI18n("button")

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      language: currentLocale,
    },
  })

  const {
    control,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (values: AccountFormValues) => {
    try {
      await updateUserAction(values)
      toast.success("Account updated successfully.")
      // @ts-ignore
      changeLocale(values.language)
    } catch (error) {
      toast.error(catchError(error))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl space-y-8"
      >
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formScope("label.firstName")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={formScope("placeholder.firstName")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formScope("label.lastName")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={formScope("placeholder.lastName")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{formScope("label.dob")}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{formScope("placeholder.dob")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{formScope("label.language")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue
                    placeholder={formScope("placeholder.language")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {i18n.locales.map((locale) => (
                      <SelectItem key={locale} value={locale}>
                        {localeScope(locale)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FormDescription>
                {formScope("description.language")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" isLoading={isSubmitting}>
          {buttonScope("updateAccount")}
        </LoadingButton>
      </form>
    </Form>
  )
}
