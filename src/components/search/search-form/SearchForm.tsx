import { Component } from "react";
import Button from '../../shared/button/Button';
import style from './SearchForm.module.scss';

type SearchFormProps = {
  onSearch?: (value: string) => void;
};

type SearchFormState = {
  value: string;
  lastSentValue: string;
};

export default class SearchForm extends Component<
  SearchFormProps,
  SearchFormState
> {
  state: SearchFormState = {
    value: '',
    lastSentValue: ''
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  submit = () => {
    const trimmed = this.state.value.trim();

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
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            required
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