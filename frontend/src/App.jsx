import { Component } from "react";
import { gql } from "@apollo/client";
import { ApolloConsumer } from "@apollo/client";
import {GET_CATEGORIES} from './queries';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;


class App extends Component {
  state = {
    categories: [],
    loading: false,
    error: null,
  };

  handleGetCategories = (req, res, next) => {
    this.setState({ loading: true
      });

    client
    .query({
      query: GET_CATEGORIES,
      })
      .then(result => {
        this.setState
        ({ categories: result.data.categories, loading: false
          });
          })
          .catch(error => {
            this.setState
            ({ error, loading: false
              });
            });
            };

  render() {
    const { categories,loading, error } = this.state;
    return (
      <ApolloConsumer>
        {(client) => (
          <div className="app-container">
            <h1>Categories</h1>
            <button onClick={this.handleGetCategories}>Get Categories</button>
            {loading ? (
              <p>Loading...</p>
              ) : (
                <ul>
                  {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                  ))}

                </ul>
                )}
          </div>
        )}
      </ApolloConsumer>
    );
  }
}
export default App;