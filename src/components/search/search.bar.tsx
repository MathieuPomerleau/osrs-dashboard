import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

function SearchBar() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [search, setSearch] = useState('');
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setSearch('');
            router.push(`/player/${search}`);
        }
    };

    return (
        <div
            className={`group flex items-center w-80 h-14 border-2 ${
                isFocused ? 'border-gray-font' : 'border-gray-font-light'
            } rounded-lg px-4 py-3 hover:border-gray-font transition-all duration-200 ease-out`}
        >
            <SearchIcon
                className={`w-6 h-6 group-hover:text-gray-font transition-all duration-200 ease-out mr-4 ${
                    isFocused ? 'text-gray-font' : 'text-gray-font-light'
                }`}
            />
            <input
                className="bg-transparent focus:outline-none text-gray-font placeholder:font-light placeholder:text-gray-font-light"
                placeholder="Search for a player..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onKeyDown={(e: any) => handleKeyDown(e)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            ></input>
        </div>
    );
}

export default SearchBar;
