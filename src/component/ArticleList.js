import React, { Component } from 'react';
import Article from './Article';


class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: this.props.articles,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.articles !== this.props.articles) {
      this.setState({ articles: this.props.articles });
    }
  }

  addArticle = () => {
    this.setState((prevState) => {
      const newArticle = {
        id: this.state.articles.length + 1,
        name: 'a',
        quantity: 0,
        price: 100,
        discount: 10,
        amount: 0,
      };
      const newArticles = [...prevState.articles, newArticle];
      this.props.onArticlesChange(newArticles);
      return { articles: newArticles };
    });
  };

  handleArticleUpdate = (updatedArticle) => {
    this.setState((prevState) => {
      const articles = prevState.articles.map(article =>
        article.id === updatedArticle.id ? updatedArticle : article
      );
      this.props.onArticlesChange(articles);
      return { articles };
    });
  };

  render() {
    const { articles } = this.state;
    return (
      <div className="ArticleList">
        <button onClick={this.addArticle}>Ajouter Article</button>
        {articles.map((article) => (
          <Article
            key={article.id}
            article={article}
            onArticleUpdate={this.handleArticleUpdate}
          />
        ))}
      </div>
    );
  }
}

export default ArticleList;
