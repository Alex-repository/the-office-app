import { useContext, useEffect } from 'react';
import DataContext from '../../contexts/dataContext';
import useTrie from '../../hooks/useTrie';
import styles from './SearchBar.module.scss';

const SearchBar = ({ onSearchFilter }: any) => {
    const { charactersNames } = useContext(DataContext);
    const [trie, prepareTrie, prefix, setPrefix, suggestion, setSuggestion] = useTrie();

    useEffect(() => {
        charactersNames && prepareTrie(charactersNames)
    })

    useEffect(() => {
        onSearchFilter(suggestion)
    }, [suggestion])

    const onChange = (e: any) => {
        var value = e.target.value;
        setPrefix(value);
        var words = value.split(" ");
        var trie_prefix = words[words.length - 1].toLowerCase();
        var found_words = trie.find(trie_prefix).sort((a: string, b: string) => {
            return a.length - b.length;
        });
        var first_word = found_words[0];
        if (
            found_words.length !== 0 &&
            value !== "" &&
            value[value.length - 1] !== " "
        ) {
            if (first_word != null) {
                var remainder = first_word.slice(trie_prefix.length);
                setSuggestion(value + remainder);
            }
        } else {
            setSuggestion(value);
        }
    };

    const handleKeyDown = (e: any) => (e.keyCode === 39 || e.keyCode === 9) && setPrefix(suggestion);

    return (
        <div className={styles.searchBar__container}>
            <input
                className={styles.searchBar__input}
                type="text"
                placeholder="Search..."
                value={prefix}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
            <input
                className={`${styles.searchBar__predictive}`}
                type="text"
                value={suggestion}
                onChange={() => null}
            />
        </div>
    );
}

export default SearchBar;