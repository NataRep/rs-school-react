import DetailView from '@/components/search/detail/Detail';
import SearchForm from '@/components/search/search-form/SearchForm';
import SearchResult from '@/components/search/search-result/SearchResult';
import { SelectedItemsFlyout } from '@/components/search/selected-items-flyout/SelectedItemsFlyout';
import Tabs from '@/components/tab/Tabs';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import style from './page.module.scss';

interface SearchPageProps {
  searchParams: Promise<{
    query?: string;
    category?: string;
    page?: string;
    details?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const t = await getTranslations('Search');
  const querySuffix = params.query ? ` — "${params.query}"` : '';

  return {
    title: `${t('metaTitle')}${querySuffix}`,
    description: t('metaDescription'),
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const currentQuery = params.query || '';
  const currentCategory = params.category || 'people';
  const currentPage = params.page || '1';
  const currentDetailsId = params.details || '';

  const t = await getTranslations('Search');

  return (
    <div className={style.container}>
      <h1>{t('title')}</h1>

      <SearchForm initialQuery={currentQuery} />

      <Tabs
        currentCategory={currentCategory}
        tabs={[
          { label: t('tabs.people'), value: 'people' },
          { label: t('tabs.planets'), value: 'planets' },
          { label: t('tabs.starships'), value: 'starships' },
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
