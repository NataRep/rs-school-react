import { Component } from 'react';
import { type CategoryMap } from '../../services/api-service';
import { StorageService } from '../../services/storage-service';
import SearchForm from '../search/search-form/SearchForm';
import ErrorBoundary from '../shared/error-boundary/ErrorBoundary';
import Tabs from '../shared/tab/Tabs';
import style from './Search.module.scss';
import SearchResult from './search-result/SearchResult';

type SearchState = {
  category: keyof CategoryMap;
  searchQuery: string;
  searchTerm: string;
};

export default class Search extends Component<SearchState> {
  state: SearchState = {
    category: "people",
    searchQuery: '',
    searchTerm: ''
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

  onTabSelect = (value: string) => {
    const categoryValue = value as keyof CategoryMap;
    this.setState(
      {
        searchQuery: '',
        searchTerm: '',
        category: categoryValue,
      },
      () => {
        StorageService.saveSearchQuery(this.state.category, this.state.searchQuery);
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

  search = (value: string) => {
    this.setState({
      searchQuery: value,
      searchTerm: value,
      isLoading: true,
      error: null
    },
      () => { StorageService.saveSearchQuery(this.state.category, this.state.searchQuery); });
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

        <div className={style.resultWrapper}>
          <ErrorBoundary resetCondition={this.state.category}>
            <SearchResult category={this.state.category} searchQuery={this.state.searchTerm}></SearchResult>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}