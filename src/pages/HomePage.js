import JobList from '../components/JobList';
import { useJobs } from '../lib/graphql/hooks';

function HomePage() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <h1 className='is-5 red'>Loading....</h1>
  }

  if (error) {
    return <h1 className='has-text-danger'>Something wrong happened</h1>
  }

  if (jobs) {
    return (
      <div>
        <h1 className="title">
          Job Board
        </h1>
        <JobList jobs={jobs} />
      </div>
    );
  }

}

export default HomePage;
