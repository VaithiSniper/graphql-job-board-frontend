import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { useCompany } from "../lib/graphql/hooks.js"

function CompanyPage() {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);

  if (loading) {
    return <h1 className='is-5 red'>Loading....</h1>
  }

  if (error) {
    return <h1 className='has-text-danger'>Something wrong happened</h1>
  }

  if (company) {
    return (
      !company ?
        (
          <div>
            Loading...
          </div>
        )
        :
        (
          <div>
            <h1 className="title">
              {company.name}
            </h1>
            <div className="box">
              {company.description}
            </div>
            <h2 className='title is-5'>
              Jobs at {company.name}
            </h2>
            <JobList jobs={company.jobs} />
          </div>
        )
    );
  }
}

export default CompanyPage;
