import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSearchStorage } from "../../../hooks/useSearchStorage";
import Button from "../../shared/button/Button";
import style from "./SearchForm.module.scss";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('search') || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [prevQueryFromUrl, setPrevQueryFromUrl] = useState(queryFromUrl);
  const { saveSearchQuery } = useSearchStorage();

  const location = useLocation();
  const navigate = useNavigate();

  const handleInputClick = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);

    if (pathParts.length > 2) {
      const basePath = '/' + pathParts.slice(0, 2).join('/');

      navigate({
        pathname: basePath,
        search: location.search
      });
    }
  };

  if (queryFromUrl !== prevQueryFromUrl) {
    setSearchQuery(queryFromUrl);
    setPrevQueryFromUrl(queryFromUrl);
  }

  const submit = () => {
    const trimmed = searchQuery.trim();

    if (!trimmed) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('search');
      newParams.set('page', '1');
      newParams.delete('details');
      setSearchParams(newParams);
      return;
    }

    if (trimmed === queryFromUrl) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    newParams.set('search', trimmed);
    newParams.delete('details');
    setSearchParams(newParams);

    saveSearchQuery(trimmed);
  };

  return (
    <form
      autoComplete="off"
      className={style.form}
      onClick={handleInputClick}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={style.inputContainer}>
        <input
          type="text"
          name="search"
          className={style.input}
          placeholder="Find a character, planet, or starship"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Button
        text="Search"
        type="submit"
        disabled={false}
        variant="blue"
        icon="search"
        iconPosition="left"
      />
    </form>
  );
}