import React, { useEffect } from "react";

import { useRouter } from "next/router";
import Preloader from "@/components/loader/loader";
import useFetch from "@/hooks/useFetch";

function ProtectedAdmin({ children }: { children: JSX.Element }) {
  const router = useRouter();

  const {data, loading, error} = useFetch("/routes/users/user");
  useEffect(() => {
    if (!loading) {
      if (!data?.isAdmin) {
        router.push("/admin/login");
      }
    }
  }, [router, loading, data]);

  if (loading && !data) {
    return <Preloader />;
  }

  return children;
}

export default ProtectedAdmin;
