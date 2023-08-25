import { JobDetailsFragments } from "./fragments"
import { getJobByIDQuery } from "./queries"
import { gql } from '@apollo/client';
import { apolloClient } from "./core"

export const deleteJobMutation = gql`
    mutation deleteJob($id: ID!) {
  deleteJob(id: $id) {
    id
    title
  }
}
`

export const createJobMutation = gql`
    mutation CreateJob($input: createJobInput!) {
  job: createJob(input: $input) {
        ...JobDetails
  }
}
    ${JobDetailsFragments}
`

export async function deleteJob({ id }) {
  const job = await apolloClient.mutate({
    mutation: deleteJobMutation,
    variables: { id }
  })
  return job
}

export async function createJob({ input }) {
  const { data: { job } } = await apolloClient.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: getJobByIDQuery,
        variables: { id: data.job.id },
        data
      })
    }
  })
  return job;
}
