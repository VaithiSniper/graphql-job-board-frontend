import { useQuery } from "@apollo/client";
import { getCompanyByIDQuery, getJobByIDQuery, getJobsQuery } from "./queries";

// Query hooks
export function useCompany(id) {
  const { data, loading, error } = useQuery(getCompanyByIDQuery, {
    variables: { id }
  })
  return { company: data?.company, loading, error: Boolean(error) }
}

export function useJob(id) {
  const { data, loading, error } = useQuery(getJobByIDQuery, {
    variables: { id }
  })
  return { job: data?.job, loading, error: Boolean(error) }
}

export function useJobs() {
  const { data, loading, error } = useQuery(getJobsQuery)
  return { jobs: data?.jobs, loading, error: Boolean(error) }
}
