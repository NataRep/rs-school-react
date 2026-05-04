import { Component } from 'react';
import type { Person, Planet, Starship } from '../../services/api-models';
import { ApiService, type CategoryMap } from '../../services/api-service';
import { StorageService } from '../../services/storage-service';
import SearchForm from '../search/search-form/SearchForm';
import Tabs from '../shared/tab/Tabs';
import style from './Search.module.scss';

type SearchState = {
  category: keyof CategoryMap;
  searchQuery: string;
  items: (Person | Planet | Starship)[];
  isLoading: boolean;
  error: null | Error;
};

export default class Search extends Component<object, SearchState> {
  state: SearchState = {
    category: "people",
    searchQuery: '',
    items: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    const storageData = StorageService.getSearchQuery();
    if (storageData.category) {
      this.setState(
        {
          searchQuery: storageData.query || '',
          category: storageData.category,
        },
        () => {
          this.search(this.state.searchQuery);
        }
      );
    }
  }

  onTabSelect = (value: keyof CategoryMap) => {
    this.setState(
      {
        searchQuery: '',
        category: value,
      },
      () => {
        StorageService.saveSearchQuery(this.state.category, this.state.searchQuery);
        this.search(this.state.searchQuery);
      }
    );
  }

  setSearchQuery = (value: string) => {
    this.setState(
      {
        searchQuery: value,
      }
    );
  }

  search = async (value: string) => {
    try {
      this.setState({
        searchQuery: value,
        isLoading: true,
        error: null
      },
        () => { StorageService.saveSearchQuery(this.state.category, this.state.searchQuery); });

      const data = await ApiService.getData(this.state.category, value);

      this.setState({
        items: data.results,
        isLoading: false
      });

    } catch (err) {
      this.setState({
        error: err instanceof Error ? err : new Error("Unknown error"),
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div className={style.container}>
        <h1>Star Wars Universe Search</h1>

        <SearchForm
          onSearch={this.search}
          searchQuery={this.state.searchQuery}
          onInputChange={this.setSearchQuery} />

        <Tabs
          tabs={[
            { label: "People", value: "people" },
            { label: "Planets", value: "planets" },
            { label: "Starships", value: "starships" }
          ] as const}
          activeTab={this.state.category as keyof CategoryMap}
          onSelect={this.onTabSelect}
        />
      </div>
    );
  }
}