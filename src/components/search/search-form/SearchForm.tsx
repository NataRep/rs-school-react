import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StorageService } from "../../../services/storage-service/storage-service";
import Button from "../../shared/button/Button";
import style from "./SearchForm.module.scss";

export default function SearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('search') || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [prevQueryFromUrl, setPrevQueryFromUrl] = useState(queryFromUrl);

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
      setSearchParams(newParams);
      return;
    }

    if (trimmed === queryFromUrl) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');
    newParams.set('search', trimmed);
    setSearchParams(newParams);

    StorageService.saveSearchQuery(trimmed);
  };

  return (
    <form
      autoComplete="off"
      className={style.form}
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