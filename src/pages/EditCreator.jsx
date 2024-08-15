import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client';
import './EditCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate instead of history
  const [creator, setCreator] = useState({
    name: '',
    url: 'https://',
    description: '',
    imageURL: 'https://',
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('creator_id', id) // Ensure the correct column name is used
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
      .eq('creator_id', id); // Ensure the correct column name is used
    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate('/'); // Use navigate for routing
    }
  };

  return (
    <div className="edit-creator-container">
      <h1 className="edit-creator-title">Edit {creator.name}</h1>
      <form className="edit-creator-form" onSubmit={handleSubmit}>
        <label className="edit-creator-label" htmlFor="name">
          Creator Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="edit-creator-input"
          value={creator.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <label className="edit-creator-label" htmlFor="url">
          Creator URL
        </label>
        <input
          type="url"
          id="url"
          name="url"
          className="edit-creator-input"
          value={creator.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
        <label className="edit-creator-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="edit-creator-textarea"
          value={creator.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <label className="edit-creator-label" htmlFor="imageURL">
          Image URL
        </label>
        <input
          type="url"
          id="imageURL"
          name="imageURL"
          className="edit-creator-input"
          value={creator.imageURL}
          onChange={handleChange}
          placeholder="Image URL (optional)"
        />
        <button type="submit" className="edit-creator-button">
          Update Creator
        </button>
        <button to="/" className="edit-creator-button">
          Back to All Creators
        </button>
      </form>
    </div>
  );
};

export default EditCreator;
