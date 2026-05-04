import { Component } from "react";
import type { Person, Planet, Starship } from "../../../services/api-models";
import { ApiService, type CategoryMap } from "../../../services/api-service";
import Button from "../../shared/button/Button";
import SearchResultItem from "../search-result-item/SearchResultItem";
import style from './SearchResult.module.scss';

type SearchResultState = {
  category: keyof CategoryMap;
  searchQuery: string;
  items: (Person | Planet | Starship)[];
  isLoading: boolean;
  error: null | Error;
  shouldThrow: boolean;
};

interface SearchProps {
  category: keyof CategoryMap;
  searchQuery: string;
}

export default class SearchResult extends Component<SearchProps, SearchResultState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      category: props.category || "people",
      searchQuery: props.searchQuery || '',
      items: [],
      isLoading: false,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount(): void {
    this.getResult();
  }

  componentDidUpdate(prevProps: SearchProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.setState({
        category: this.props.category,
        searchQuery: this.props.searchQuery
      }, () => {
        this.getResult();
      });
    }
  }

  private async getResult() {
    this.setState({
      isLoading: true,
      error: null
    });

    try {
      const data = await ApiService.getData(this.props.category, this.props.searchQuery);

      this.setState({
        items: data.results,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ error: err as Error, isLoading: false });
    }
  }

  handleThrowError = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error("Критическая ошибка рендеринга!");
    }

    if (this.state.error) {
      return <div className={style.error}>Ошибка API: {this.state.error.message}. Попробуйте еще раз</div>;
    }

    if (this.state.isLoading) {
      return <div className={style.container}>
        <p>Loading...</p>
      </div>

    }
    return <div className={style.container}>

      <Button
        text="Show Error Boundary"
        callback={this.handleThrowError}
        disabled={false}
        className="red"
        icon="error"
        iconPosition="left"
      />

      <ul className={style.itemList}>
        {this.state.items.map((item) => (
          <li key={item.url} className={style.item}>
            <SearchResultItem item={item}></SearchResultItem>
          </li>
        ))}
      </ul>
    </div>
  }
}