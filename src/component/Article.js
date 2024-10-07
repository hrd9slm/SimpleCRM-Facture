import React, { Component } from "react";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.article.name || "a",
      quantity: props.article.quantity || 0,
      price: props.article.price || 100,
      discount: props.article.discount || 10,
      amount: props.article.amount || 0,
    };
  }

  articles = [
    { name: "a", price: 100, discount: 10 },
    { name: "b", price: 200, discount: 20 },
    { name: "c", price: 300, discount: 30 },
    { name: "d", price: 400, discount: 40 },
  ];

  componentDidMount() {
    this.calculateAmount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article !== this.props.article) {
      const { name, quantity, price, discount, amount } = this.props.article;
      if (
        name !== this.state.name ||
        quantity !== this.state.quantity ||
        price !== this.state.price ||
        discount !== this.state.discount ||
        amount !== this.state.amount
      ) {
        this.setState({
          name: name || "a",
          quantity: quantity || 0,
          price: price || 100,
          discount: discount || 10,
          amount: amount || 0,
        });
      }
    }
  }

  handleArticleChange = (e) => {
    const selectedArticle = e.target.value;
    const article = this.articles.find(
      (article) => article.name === selectedArticle
    );

    if (article) {
      this.setState(
        {
          name: selectedArticle,
          price: article.price,
          discount: article.discount,
        },
        () => {
          this.calculateAmount();
          this.props.onArticleUpdate({
            ...this.props.article,
            name: selectedArticle,
            price: article.price,
            discount: article.discount,
            amount: this.state.amount,
          });
        }
      );
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: parseInt(value) || 0 }, () => {
      this.calculateAmount();
      this.props.onArticleUpdate({
        ...this.props.article,
        [name]: parseFloat(value) || 0,
        amount: this.state.amount,
      });
    });
  };

  calculateAmount = () => {
    const { quantity, price, discount } = this.state;
    const amount = quantity * price - (quantity * price * discount) / 100;
    this.setState({ amount: isNaN(amount) ? 0 : amount }, () => {
      this.props.onArticleUpdate({
        ...this.props.article,
        amount: this.state.amount,
      });
    });
  };

  render() {
    const { name, quantity, price, discount, amount } = this.state;
    return (
   
            <div className="Article">
          <select value={name} onChange={this.handleArticleChange}>
            {this.articles.map((article) => (
              <option key={article.name} value={article.name}>
                {article.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Quantité"
            onChange={this.handleInputChange}
          />
          <input
            type="number"
            name="price"
            value={price}
            placeholder="Prix"
            readOnly
          />
          <input
            type="number"
            name="discount"
            value={discount}
            placeholder="Remise"
            readOnly
          />
          <input
            type="number"
            name="amount"
            value={amount}
            placeholder="Montant"
            readOnly
          />
        </div>
    
    );
  }
}

export default Article;
