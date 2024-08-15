import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../client'; // Import supabase client
import Card from '../components/Card';

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);

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

  if (!creator) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{creator.name}</h1>
      <Card
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.imageURL}
      />
      <Link to={`/edit/${creator.id}`}>Edit</Link>
      <Link to="/">Back to All Creators</Link>
    </div>
  );
};

export default ViewCreator;
