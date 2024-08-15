import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../client'; // Import supabase client
import './AddCreator.css'; // Import the CSS file

const AddCreator = () => {
  const navigate = useNavigate(); // Use navigate instead of history
  const [creator, setCreator] = useState({
    name: '',
    url: 'https://',
    description: '',
    imageURL: 'https://',
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
    <div className="add-creator-container">
      <h1 className="add-creator-title">Add New Creator</h1>
      <form onSubmit={handleSubmit} className="add-creator-form">
        <p>Creator Name</p>
        <input
          type="text"
          name="name"
          value={creator.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="add-creator-input"
        />
        <p>Creator URL</p>
        <input
          type="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          placeholder="URL"
          required
          className="add-creator-input"
        />
        <p>Description</p>
        <textarea
          name="description"
          value={creator.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="add-creator-textarea"
        />
        <p>Image URL</p>
        <input
          type="url"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="add-creator-input"
        />
        <button type="submit" className="add-creator-button">
          Add Creator
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
