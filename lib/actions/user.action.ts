'use server';

import User from "@/lib/models/user.model";

import { connectToDatabase } from "../mongoose";
import { revalidatePath } from "next/cache";

interface UserActionParams {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
};

export async function updateUser(userDetails: UserActionParams): Promise<void> {
    connectToDatabase();

    const { userId, username, name, bio, image, path } = userDetails;

    try{
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true },
        );

        if(path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new Error(`Error updating user: ${error.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDatabase();

        return await User
                        .findOne({ id: userId })
                        // .populate({
                        //     path: 'communities',
                        //     model: 'Community',
                        // });

    } catch (error: any) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}