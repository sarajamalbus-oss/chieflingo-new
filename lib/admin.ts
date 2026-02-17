import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_37I9q5oZbnVD0qlCuAnY42r7AJY"];

export const getIsAdmin = async () => {
  const { userId } = await auth();
  if (!userId) return false;
  return adminIds.includes(userId);
};
