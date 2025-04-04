"use client";

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { Calendar } from "@/components/ui/calendar"
import { z } from "zod"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { StoryType } from '@/app/dashboard/subjects/[storyId]/page'

const formSchema = z.object({
    heading: z.string().min(2, {
      message: "Heading must be at least 2 characters.",
    }),
    story: z.string().min(1, {
        message: "Story is required.",
    }),
    date: z.date(),
})

const EditStory = ({_id, date, heading, story}: StoryType) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            heading: heading,
            story: story,
            date: new Date(date),
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError(null)

        try {
            // PUT request to update the story using its _id
            const response = await fetch(`http://localhost:5000/api/news/${_id}`, {
                method: "PUT", // Change from POST to PUT
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error("Failed to update the story.")
            }

            // If successful, you can reset the form and show a success message
            form.reset()
            alert("Story updated successfully!")

        } catch (err) {
            setError("Something went wrong. Please try again later.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Edit News Feed</CardTitle>
            </CardHeader>
            <CardContent className='p-6'>
                {error && (
                    <div className="text-red-500 mb-4">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="heading"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Heading</FormLabel>
                                    <FormControl>
                                        <Input className='border border-gray-500' placeholder="Enter your heading" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="story"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Story</FormLabel>
                                    <FormControl>
                                        <Input className='border border-gray-500' placeholder="Enter your story" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
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
                                                        <span>Pick a date</span>
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
                                    <FormDescription>
                                        Select the date.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='w-full'>
                            {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Update Story'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default EditStory
