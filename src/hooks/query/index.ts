import { useQuery } from "react-query";

export * from "./contract"

export const useConfiguredQuery = (name: string, queryFn: Function, keys?: any, enable?: boolean) => {
  return useQuery({
    queryFn: context => queryFn(context),
    queryKey: [ name, keys ],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    retry: false,
    enabled: enable,
    onSuccess: data => {
      console.info('data', data)
    }
  })
}
