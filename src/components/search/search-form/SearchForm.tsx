import { Component } from "react";
import Button from '../../shared/button/Button';
import style from './SearchForm.module.scss';

type SearchFormProps = {
  searchQuery: string;
  onSearch?: (value: string) => void;
  onInputChange: (value: string) => void;
};

type SearchFormState = {
  lastSentValue: string;
};

export default class SearchForm extends Component<
  SearchFormProps,
  SearchFormState
> {
  state: SearchFormState = {
    lastSentValue: ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onInputChange(e.target.value);
  };

  submit = () => {
    const trimmed = this.props.searchQuery.trim()

    if (!trimmed) return;
    if (trimmed === this.state.lastSentValue) return;

    this.setState({ lastSentValue: trimmed });

    this.props.onSearch?.(trimmed);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
    }
  };

  render() {
    return (
      <form
        autoComplete="off"
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          this.submit();
        }}
      >
        <div className={style.inputContainer}>
          <input
            type="text"
            name="search"
            className={style.input}
            placeholder="Find a character, planet, or starship"
            value={this.props.searchQuery}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>

        <Button
          text="Search"
          callback={this.submit}
          disabled={false}
          className="blue"
          icon="search"
          iconPosition="left"
        />
      </form>
    );
  }
}