import { useQuery } from "react-query";

export * from "./contract"

export const useConfiguredQuery = (queryFn: Function, keys?: any, enable?: boolean) => {
  return useQuery({
    queryFn: context => queryFn(context),
    queryKey: [ queryFn.name, keys ],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    retry: false,
    enabled: enable || true,
    onSuccess: data => {
      console.info('data', data)
    }
  })
}
