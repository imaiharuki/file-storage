"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";
import { getCatImage } from "../getCatImage";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { getAvatarPlaceHolderUrl } from "@/constants";
import { redirect } from "next/navigation";
import { error } from "console";

// Create account flow
// 1. User enters full name and email
// 2. Check if the user already exist using the email (we will use this to identify if we still need to create a user document or not)
// 3. Send OTP to the email
// 4. this will send a secret key for creating a session.
// 5. Crete a new user document if the user is a new user
// 6. Return the user's accountId that will be used to complete the login process
// 7. Verify OTP and authenticate to login

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.error(error, message);
  throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  // console.log("hello", fullName, email);

  const existingUser = await getUserByEmail(email);

  // debug
  // if (existingUser) console.log("hello", existingUser);

  const accountId = await sendEmailOTP({ email });
  // accountId と existingUser.accountIdは同じ値を持つ

  if (!accountId) {
    throw new Error("Failed to create account");
  }

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: await getAvatarPlaceHolderUrl(),
        accountId,
      }
    );
    // debug
    // console.log(accountId);
  }

  return parseStringify({ accountId });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify secret");
  }
};

export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();
  // debug
  // console.log("result / getCurrentUser : user.actions.ts | \n", result);
  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)]
  );

  if (user.total <= 0) return null;
  // debug
  // console.log(
  //   "user.document[0] / getCurrentUser : user.actions.ts | \n",
  //   user.documents[0]
  // );
  return parseStringify(user.documents[0]);
};

export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserByEmail(email);

    // User exists, send OTP
    if (existingUser) {
      await sendEmailOTP({ email });

      //
      // debug
      // console.log("accoundId : user.actions.ts | ", accountId);
      // console.log("existingUser : user.actions.ts | ", existingUser);
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
