import { MutationCache, QueryClient } from "@tanstack/react-query";

import { ApiError } from "@/api/client";
import { toast } from "@/components/ui/toast";

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _onMutateResult, mutation) => {
      const title = mutation.meta?.successMessage;
      if (title) toast.add({ type: "success", title });
    },
    onError: (error, _variables, _onMutateResult, mutation) => {
      if (mutation.meta?.silentError) return;

      toast.add({
        type: "error",
        title: mutation.meta?.errorMessage ?? "Something went wrong",
        // не-ApiError это сетевой сбой (fetch бросил TypeError)
        description:
          error instanceof ApiError
            ? error.message
            : "Can't reach the server. Try again in a moment.",
      });
    },
  }),
});
