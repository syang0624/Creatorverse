import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import supabase from '../client'; // Import supabase client

const AddCreator = () => {
  const navigate = useNavigate(); // Use navigate instead of history
  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCreator({ ...creator, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { error } = await supabase.from('creators').insert([creator]);
    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/'); // Use navigate for routing
    }
  };

  return (
    <div>
      <h1>Add New Creator</h1>
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
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
