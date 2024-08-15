import PropTypes from 'prop-types';
import './Card.css'; // Ensure this is imported if you have styling

const Card = ({
  name,
  url,
  description,
  imageURL,
  viewUrl,
  editUrl,
  onDelete,
}) => {
  return (
    <div className="card">
      {imageURL && (
        <div className="card-image">
          <img src={imageURL} alt={`${name}'s picture`} />
        </div>
      )}
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{description}</p>
        <a
          href={url}
          className="card-url"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {name}&apos;s page
        </a>
        <div className="card-actions">
          {viewUrl && (
            <a href={viewUrl} className="button">
              View
            </a>
          )}
          {editUrl && (
            <a href={editUrl} className="button">
              Edit
            </a>
          )}
          {onDelete && (
            <button onClick={onDelete} className="button">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageURL: PropTypes.string,
  viewUrl: PropTypes.string,
  editUrl: PropTypes.string,
  onDelete: PropTypes.func,
};

export default Card;
