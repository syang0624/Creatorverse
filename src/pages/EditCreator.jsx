import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client'; // Import supabase client

const EditCreator = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCreator({ ...creator, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq('id', id);
    if (error) {
      console.error('Error updating creator:', error);
    } else {
      history.push('/');
    }
  };

  return (
    <div>
      <h1>Edit {creator.name}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={creator.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
        <textarea
          name="description"
          value={creator.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="url"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
          placeholder="Image URL (optional)"
        />
        <button type="submit">Update Creator</button>
      </form>
    </div>
  );
};

export default EditCreator;
