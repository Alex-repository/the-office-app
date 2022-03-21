import { useState } from 'react';
import Trie from "../utilities/trie";

const useTrie = () => {
    var trie = new Trie();
    const [prefix, setPrefix] = useState("");
    const [suggestion, setSuggestion] = useState("");

    const prepareTrie = (words: string[]) => {
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            trie.insert(word.toLowerCase())
        }
    }

    return [trie, prepareTrie, prefix, setPrefix, suggestion, setSuggestion] as const
}

export default useTrie;