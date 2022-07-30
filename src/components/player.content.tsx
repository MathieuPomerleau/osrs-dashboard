import { SelectedTab, Setter } from '../model/ui';
import { AttackIcon } from './icons';
import SearchBar from './search.bar';

interface PlayerContentProps {
    selected: SelectedTab;
}

function PlayerContent({ selected }: PlayerContentProps) {
    return (
        <div className="flex flex-1 flex-col p-10">
            <div className="flex w-full justify-between items-center">
                <SearchBar />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <StatContainer />
            </div>
        </div>
    );
}

function StatContainer() {
    return (
        <div className="grid grid-cols-3 grid-rows-8 gap-y-6 gap-x-12">
            {Array(24)
                .fill(0, 0, 24)
                .map((_, i) => i)
                .map((num) => (
                    <StatBox num={num} />
                ))}
        </div>
    );
}

interface StatBoxProps {
    num: number;
}

function StatBox({ num }: StatBoxProps) {
    return (
        <div className="flex flex-row items-center text-gray-font">
            <AttackIcon className="w-10 h-10 fill-gray-font mr-3 mt-3" />
            <div className="flex flex-col items-center mx-auto">
                <div className="text-4xl text-primary">{num}</div>
                <div className="border border-gray-font-light w-full h-0.5 mt-1 rounded-full" />
                <div className="text-gray-font-light">99</div>
            </div>
        </div>
    );
}

export default PlayerContent;
