'use client';

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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { commentValidation } from "@/lib/validations/thread";
// import { createThread } from "@/lib/actions/thread.action";

interface CommentProps {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = (commentDetails: CommentProps) => {
    const { threadId, currentUserImg, currentUserId } = commentDetails;

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        // await createThread({text: values.thread, author: userId, communityId: null, path: pathname});

        router.push('/');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                    <FormItem className="flex gap-3 w-full items-center">
                    <FormLabel>
                        <Image 
                            src={currentUserImg}
                            alt="Profile Image"
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                        />
                    </FormLabel>
                    <FormControl className="border-none bg-transparent">
                        <Input type="text" placeholder="Comment..." className="no-focus text-light-1 outline-none"{...field} />
                    </FormControl>
                    </FormItem>
                )}
            />
            <Button type="submit" className="comment-form_btn">Reply</Button>
            </form>
        </Form>
    );
}

export default Comment;