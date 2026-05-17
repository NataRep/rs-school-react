import { Outlet } from 'react-router-dom';
import Tabs from '../shared/tab/Tabs';
import SearchForm from './search-form/SearchForm';
import style from './Search.module.scss';



export default function Search() {

  return <div className={style.container}>
    <h1>Star Wars Universe Search</h1>
    <SearchForm />
    <Tabs
      tabs={[
        { label: "People", value: "people" },
        { label: "Planets", value: "planets" },
        { label: "Starships", value: "starships" },
        { label: "Get 404", value: "error" }
      ] as const}
    />
    <div className={style.resultWrapper}>
      <Outlet />
    </div>
  </div>
}

/*
type SearchState = {
  category: keyof CategoryMap;
  searchQuery: string;
  searchTerm: string;
  isLoading: boolean;
  error: unknown
};

type SearchProps = Record<string, never>;


export default class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    category: "people",
    searchQuery: '',
    searchTerm: '',
    isLoading: false,
    error: null
  };

  constructor(props: SearchProps) {
    super(props);

    const storageData = StorageService.getSearchQuery();

    this.state = {
      category: storageData.category || "people",
      searchQuery: storageData.query || '',
      searchTerm: storageData.query || '',
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    if (this.state.searchTerm) {
      this.search(this.state.searchTerm);
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
            { label: "Starships", value: "starships" },
            { label: "Get 404", value: "error" }
          ] as const}
          activeTab={this.state.category as keyof CategoryMap}
          onSelect={this.onTabSelect}
        />
        <div className={style.resultWrapper}>
          <ErrorBoundary resetCondition={this.state.category}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}*/