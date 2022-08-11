import { SearchIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useState } from 'react';

function SearchBar() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setSearch('');
            router.push(`/player/${search}`);
        }
    };

    return (
        <div className="flex items-center w-80 h-14 border-2 border-gray-font-light rounded-lg px-4 py-3">
            <SearchIcon className="w-6 h-6 text-gray-font-light mr-4" />
            <input
                className="bg-transparent focus:outline-none text-gray-font placeholder:font-light placeholder:text-gray-font-light"
                placeholder="Search for a player..."
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onKeyDown={(e: any) => handleKeyDown(e)}
            ></input>
        </div>
    );
}

export default SearchBar;
