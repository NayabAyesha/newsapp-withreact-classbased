import React from 'react';

export class NewsItem extends React.Component {
    render() {
        const { title, description, imageUrl, url, author, date } = this.props;

        // Fallback image URL
        const defaultImage = "https://via.placeholder.com/150"; // Placeholder image URL

        return (
            <div className="news-item">
                <div className="card">
                    <img
                        src={imageUrl || defaultImage} // Use fallback if imageUrl is not provided
                        className="card-img-top"
                        alt="news-thumbnail"
                        onError={(e) => {
                            e.target.src = defaultImage; // Fallback to default image on error
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title} <span className='badge bg-danger'>New</span></h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {!author? "Unknown" : author} on {new Date(date).toGMTString()}}</small></p>
                        <a 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn"
                        >
                            More Info
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItem;
