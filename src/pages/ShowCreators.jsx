import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import supabase from '../client'; // Import supabase client
import Card from '../components/Card';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from('creators').select('*');
        if (error) {
          console.error('Error fetching creators:', error);
        } else {
          console.log('Fetched creators:', data); // Debugging statement
          setCreators(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

    fetchCreators();
  }, []);

  const handleDelete = async creator_id => {
    console.log('Deleting creator with creator_id:', creator_id); // Debugging statement
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
    <div>
      <h1>All Content Creators</h1>
      <div className="creators-list">
        {creators.length === 0 ? (
          <p>No content creators found.</p>
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
            />
          ))
        )}
      </div>
      <Link to="/add" className="button">
        Add New Creator
      </Link>
    </div>
  );
};

export default ShowCreators;
