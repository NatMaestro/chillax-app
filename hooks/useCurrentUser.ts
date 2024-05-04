import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  const { data: session } = useSession();
  const user = session?.user;

  return {
    user,
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;

// const useCurrentUser = () => {
//   const { data: session } = useSession();
//   const user = session?.user;

//   return { user };
// };

// export default useCurrentUser;
