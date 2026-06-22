import DetailView from '@/components/search/detail/Detail';
import SearchForm from '@/components/search/search-form/SearchForm';
import SearchResult from '@/components/search/search-result/SearchResult';
import { SelectedItemsFlyout } from '@/components/search/selected-items-flyout/SelectedItemsFlyout';
import Tabs from '@/components/tab/Tabs';
import style from './page.module.scss';

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    page?: string;
    details?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const currentQuery = params.query || '';
  const currentCategory = params.category || 'people';
  const currentPage = params.page || '1';
  const currentDetailsId = params.details || '';

  return (
    <div className={style.container}>
      <h1>Star Wars Universe Search</h1>

      <SearchForm initialQuery={currentQuery} />

      <Tabs
        currentCategory={currentCategory}
        tabs={[
          { label: 'People', value: 'people' },
          { label: 'Planets', value: 'planets' },
          { label: 'Starships', value: 'starships' },
        ]}
      />

      <div className={style.content}>
        <SearchResult
          query={currentQuery}
          category={currentCategory}
          page={currentPage}
        />
        {currentDetailsId && (
          <DetailView id={currentDetailsId} categoryName={currentCategory} />
        )}
      </div>

      <SelectedItemsFlyout />
    </div>
  );
}
