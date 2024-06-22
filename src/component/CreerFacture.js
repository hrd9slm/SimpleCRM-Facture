import React, { Component } from 'react';
import AjouterDetailsFacture from './AjouterDetailsFacture';
import ArticleList from './ArticleList';

class CreerFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    this.setState({ articles: storedArticles });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.articles !== this.state.articles) {
      localStorage.setItem('articles', JSON.stringify(this.state.articles));
    }
  }

  handleArticlesChange = (articles) => {
    this.setState({ articles });
  };

  handleResetArticles = () => {
    this.setState({ articles: [] });
    localStorage.removeItem('articles');
  
  };

  handleFactureAdded = () => {
    if (this.props.onFactureAdded) {
      this.props.onFactureAdded();
    }
  };

  render() {
    const { clients, onAddClient } = this.props;
    const { articles } = this.state;

    return (
      <div className="CreerFacture">
        <AjouterDetailsFacture 
          onAddClient={onAddClient} 
          clients={clients} 
          articles={articles} 
          onResetArticles={this.handleResetArticles}
          onFactureAdded={this.handleFactureAdded} 
        /> 
        <ArticleList 
          articles={articles} 
          onArticlesChange={this.handleArticlesChange} 
        />
      </div>
    );
  }
}

export default CreerFacture;
