import { gql } from "@apollo/client"

export const JobDetailsFragments = gql`
  fragment JobDetails on Job {
    id
    title
    description
    date
    company {
      id
      name
    }
  }
`
