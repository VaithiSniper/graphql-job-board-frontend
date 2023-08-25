import { JobDetailsFragments } from './fragments';
import { gql } from '@apollo/client';

export const getCompanyByIDQuery = gql`
  query getCompany($id: ID!) {
    company(id: $id) {
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`

export const getJobByIDQuery = gql`
    query getJob($id: ID!) {
  job(id: $id) {
        ...JobDetails
  }
}
    ${JobDetailsFragments}
`

export const getJobsQuery = gql`
    query getJobs {
      jobs {
    id
    title
        company {
      name
    }
    date
  }
}
`;



