import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../client';
import Card from '../components/Card';
import './ViewCreator.css';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('creator_id', id)
        .single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  if (!creator) {
    return <p className="view-creator-loading">Loading...</p>;
  }

  return (
    <div className="view-creator-container">
      <h1 className="view-creator-title">{creator.name}</h1>
      <Card
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.imageURL}
        className="view-creator-card"
      />
      <div className="view-creator-video">
        {creator.featuredVideoUrl && (
          <iframe
            title={`${creator.name} Featured Video`}
            src={`https://www.youtube.com/embed/${creator.featuredVideoUrl}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="view-creator-actions">
        <Link
          to={`/edit/${creator.creator_id}`}
          className="view-creator-button"
        >
          Edit
        </Link>
        <Link to="/" className="view-creator-button">
          Back to All Creators
        </Link>
      </div>
    </div>
  );
};

export default ViewCreator;
