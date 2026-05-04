import { Component } from "react";
import type { Person, Planet, Starship } from "../../../services/api-models";
import { ApiService, type CategoryMap } from "../../../services/api-service";
import SearchResultItem from "../search-result-item/SearchResultItem";
import style from './SearchResult.module.scss';

type SearchResultState = {
  category: keyof CategoryMap;
  searchQuery: string;
  items: (Person | Planet | Starship)[];
  isLoading: boolean;
  error: null | Error;
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
      error: null
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
      this.setState({
        error: err instanceof Error ? err : new Error("Unknown error"),
        isLoading: false
      });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    if (this.state.isLoading) {
      return <div className={style.container}>
        <p>Loading...</p>
      </div>

    }
    return <div className={style.container}>
      <ul className={style.itemList}>
        {this.state.items.map((item) => (
          <li className={style.item}>
            <SearchResultItem item={item}></SearchResultItem>
          </li>
        ))}
      </ul>
    </div>
  }
}