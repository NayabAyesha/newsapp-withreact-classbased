import React, { Component } from 'react'; 
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'; // Import LoadingBar

export class News extends Component {
  // Default props
  static defaultProps = {
    country: 'us',
    pageSize: 6,
    category: 'general',
    searchTerm: '',
    apikey: process.env.REACT_APP_NEWS_API, // Set default for searchTerm
  }

  // Prop types definition
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    searchTerm: PropTypes.string,
    apikey: PropTypes.string.isRequired, // Add searchTerm as a prop
  }

  // Constructor
  constructor() {
    super();
    this.loadingBarRef = React.createRef(); // Create a ref for the loading bar
    this.state = {
      articles: [],
      page: 1, 
      totalResults: 0, 
      loading: false
    };
  }

  // Fetch data from API
  async fetchArticles() {
    const { country, category, pageSize, searchTerm } = this.props; // Destructure props
    const { page } = this.state;

    // Use the API key from the environment variables
    const apikey = process.env.REACT_APP_NEWS_API;
    console.log("Fetching from API:", apikey);
    // Use different API endpoint based on search query
    const api = searchTerm
      ? `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pageSize=${pageSize}`; 

    this.loadingBarRef.current.continuousStart(); // Start the loading bar
    this.setState({ loading: true }); // Set loading to true
    try {
      let response = await fetch(api);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();
      this.setState(prevState => ({
        articles: prevState.articles.concat(data.articles), // Append new articles
        totalResults: data.totalResults,
        loading: false // Set loading to false after fetch
      }));
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.setState({ loading: false }); // Ensure loading is false if there is an error
    } finally {
      this.loadingBarRef.current.complete(); // Complete the loading bar
    }
  }

  // Fetch articles on component mount
  async componentDidMount() {
    await this.fetchArticles();
    window.addEventListener('scroll', this.handleScroll);
  }

  // Cleanup event listener on unmount
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Handle scroll event
  handleScroll = () => {
    // Check if we are near the bottom of the page
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
      const { loading, totalResults, articles } = this.state;

      if (!loading && articles.length < totalResults) {
        this.setState(prevState => ({
          page: prevState.page + 1
        }), () => {
          this.fetchArticles(); // Fetch next articles
        });
      }
    }
  };

  // Fetch new data when props change
  async componentDidUpdate(prevProps) {
    // Check if country, category, or searchTerm has changed
    if (this.props.country !== prevProps.country || 
        this.props.category !== prevProps.category || 
        this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ articles: [], page: 1 }, async () => {
        await this.fetchArticles(); // Fetch new articles
      });
    }
  }

  render() {
    return (
      <div className="container my-3">
        <LoadingBar color="#f11946" ref={this.loadingBarRef} /> {/* Add LoadingBar */}
        <h1 className="text-center">Top News Headlines</h1>
        {this.state.loading && <Spinner />} {/* Show spinner if loading */}
        <div className="news-grid">
          {this.state.articles.map((article, index) => (
            <div className="news-item" key={index}>
              <NewsItem
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                url={article.url}
                author={article.author}
                date={article.publishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
