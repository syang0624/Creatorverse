import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../client'; // Import supabase client
import './EditCreator.css'; // Import CSS file
import { Link } from 'react-router-dom'; // Import Link and useNavigate

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
        .eq('creator_id', id) // Updated to match your column name
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
      .eq('creator_id', id); // Updated to match your column name
    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate('/'); // Use navigate for routing
    }
  };

  return (
    <div className="edit-creator-container">
      <h1 className="edit-creator-title">Edit {creator.name}</h1>
      <form onSubmit={handleSubmit} className="edit-creator-form">
        <label className="edit-creator-label">Creator name</label>
        <input
          type="text"
          name="name"
          value={creator.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="edit-creator-input"
        />
        <label className="edit-creator-label">Creator URL</label>
        <input
          type="url"
          name="url"
          value={creator.url}
          onChange={handleChange}
          placeholder="URL"
          required
          className="edit-creator-input"
        />
        <label className="edit-creator-label">Description</label>
        <textarea
          name="description"
          value={creator.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="edit-creator-textarea"
        />
        <label className="edit-creator-label">Image URL</label>
        <input
          type="url"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="edit-creator-input"
        />
        <button type="submit" className="edit-creator-button">
          Update Creator
        </button>
      </form>
      <Link to="/" className="button">
        Back to All Creators
      </Link>
    </div>
  );
};

export default EditCreator;
