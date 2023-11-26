import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import { TbCameraSearch } from 'react-icons/tb';

function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Enter search name');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>
            <TbCameraSearch />
          </span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
