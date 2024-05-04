import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

interface ServerAuthResponse {
  status: number;
  body: string;
}

const serverAuth = async (req: NextApiRequest): Promise<ServerAuthResponse> => {
  const session = await getSession({ req });

  if (!session?.user?.email) {
    return {
      status: 401,
      body: JSON.stringify({ error: "Not signed in" }),
    };
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    return {
      status: 401,
      body: JSON.stringify({ error: "User not signed in or does not exist" }),
    };
  }

  return {
    status: 200,
    body: JSON.stringify({ currentUser }),
  };
};

export default serverAuth;
