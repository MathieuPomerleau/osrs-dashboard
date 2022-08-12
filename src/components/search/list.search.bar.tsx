import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { Setter } from '../../model/ui';
import { FadeIn } from '../animation';

export default function ListSearchBar({
    placeholder,
    search,
    setSearch,
}: {
    placeholder: string;
    search: string;
    setSearch: Setter<string>;
}) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="group flex items-center h-10 w-[14.25rem]">
            <SearchIcon
                className={`w-6 h-6 mr-4 group-hover:text-gray-font transition-all duration-200 ease-out ${
                    isFocused ? 'text-gray-font' : 'text-gray-font-light'
                }`}
            />
            <input
                className="bg-transparent focus:outline-none text-gray-font placeholder:font-light placeholder:text-gray-font-light"
                placeholder={placeholder}
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            ></input>

            {search !== '' && (
                <div className="h-6">
                    <FadeIn>
                        <button onClick={() => setSearch('')}>
                            <XIcon className="w-6 h-6 text-gray-font-light hover:text-gray-font transition-all duration-200 ease-out active:text-white" />
                        </button>
                    </FadeIn>
                </div>
            )}
        </div>
    );
}
