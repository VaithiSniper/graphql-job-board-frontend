import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createJobMutation } from '../lib/graphql/mutations'

function CreateJobPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [mutate, { loading }] = useMutation(createJobMutation);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createJobInput = {
      title,
      description
    }
    const { data: { job: { id } } } = await mutate({
      mutation: createJobMutation,
      variables: { input: createJobInput },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: createJobMutation,
          variables: { id: data.job.id },
          data
        })
      }
    })
    navigate(`/jobs/${id}`)
  };

  return (
    <div>
      <h1 className="title">
        New Job
      </h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">
              Title
            </label>
            <div className="control">
              <input className="input" type="text" value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Description
            </label>
            <div className="control">
              <textarea className="textarea" rows={10} value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleSubmit} disabled={loading}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
