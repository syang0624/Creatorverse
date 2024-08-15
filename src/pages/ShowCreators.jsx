import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../client';
import Card from '../components/Card';
import './ShowCreators.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
          console.error('Error fetching creators:', error);
        } else {
          console.log('Fetched creators:', data);
          setCreators(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchCreators();
  }, []);

  const handleDelete = async creator_id => {
    console.log('Deleting creator with creator_id:', creator_id);
    if (!creator_id) {
      console.error('No creator_id provided for deletion');
      return;
    }

    try {
      const { error } = await supabase
        .from('creators')
        .delete()
        .eq('creator_id', creator_id);
      if (error) {
        console.error('Error deleting creator:', error);
      } else {
        setCreators(prevCreators =>
          prevCreators.filter(creator => creator.creator_id !== creator_id)
        );
      }
    } catch (error) {
      console.error('Unexpected error during delete:', error);
    }
  };

  return (
    <div className="show-creators-container">
      <h1 className="show-creators-title">Put your favorite YouTubers here!</h1>
      <Link to="/add" className="show-creators-button">
        Add New Creator
      </Link>
      <div className="show-creators-list">
        {creators.length === 0 ? (
          <p className="show-creators-empty">No content creators found.</p>
        ) : (
          creators.map(creator => (
            <Card
              key={creator.creator_id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
              viewUrl={`/view/${creator.creator_id}`}
              editUrl={`/edit/${creator.creator_id}`}
              onDelete={() => handleDelete(creator.creator_id)}
              className="show-creators-card"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
