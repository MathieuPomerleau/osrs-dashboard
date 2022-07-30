import {
    ChartBarIcon,
    ChevronLeftIcon,
    ExternalLinkIcon,
    RefreshIcon,
    XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { SelectedTab, Setter } from '../model/ui';
import { IronManIcon, WindRoseIcon } from './icons';

interface PlayerSummaryProps {
    name: string | undefined;
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
}

function PlayerSummary({ name, selected, setSelected }: PlayerSummaryProps) {
    const router = useRouter();
    const isEmpty = name === undefined;

    return (
        <div className="flex flex-col h-full py-10 pr-10 w-[30rem] bg-gray-1st text-gray-font">
            {isEmpty ? (
                <EmptyContent />
            ) : (
                <>
                    <PlayerHeader name={name} />
                    <PlayerContent
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <button
                        className="flex items-center transition-all duration-100 ease-in text-primary mt-auto ml-auto border-b border-b-transparent hover:border-b-primary"
                        onClick={() =>
                            router.push(
                                'https://secure.runescape.com/m=hiscore_oldschool/overall'
                            )
                        }
                    >
                        View Highscores on the OSRS site
                        <ExternalLinkIcon className="w-5 h-5 ml-2" />
                    </button>
                </>
            )}
        </div>
    );
}

function EmptyContent() {
    return <div>Couldn't find the requested player</div>;
}

interface PlayerHeaderProps {
    name: string;
}

function PlayerHeader({ name }: PlayerHeaderProps) {
    return (
        <div className="flex items-center px-6 pb-10">
            <div className="flex bg-red rounded-full bg-opacity-50 w-12 h-12 items-center justify-center mr-8">
                <IronManIcon className="w-6 h-6 stroke-red" />
            </div>
            <div>
                <div className="text-3xl">{name}</div>
                <div className="text-gray-font-light font-light">
                    Lvl 100 Combat
                </div>
            </div>
            <button
                className="w-8 h-8 transition-all duration-200 ease-out text-gray-font-light ml-auto hover:text-gray-font active:text-white"
                onClick={() => {}}
            >
                <RefreshIcon />
            </button>
        </div>
    );
}

function PlayerContent({
    selected,
    setSelected,
}: {
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
}) {
    return (
        <div className="flex flex-col space-y-4">
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.stats}
                textColor="text-purple"
                hoverTextColor="hover:text-purple"
                groupHoverTextColor="group-hover:text-purple"
                bgColor="bg-purple"
                text={'2277 Total Levels'}
            >
                <ChartBarIcon className="w-7 h-7 stroke-purple" />
            </Tab>
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.quests}
                textColor="text-blue"
                hoverTextColor="hover:text-blue"
                groupHoverTextColor="group-hover:text-blue"
                bgColor="bg-blue"
                text={'165 Quest Points'}
            >
                <WindRoseIcon className="w-7 h-7 stroke-blue" />
            </Tab>
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.diaries}
                textColor="text-green"
                hoverTextColor="hover:text-green"
                groupHoverTextColor="group-hover:text-green"
                bgColor="bg-green"
                text={'24 Diaries Completed'}
            >
                <WindRoseIcon className="w-7 h-7 stroke-green" />
            </Tab>
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.combatTasks}
                textColor="text-taupe"
                hoverTextColor="hover:text-taupe"
                groupHoverTextColor="group-hover:text-taupe"
                bgColor="bg-taupe"
                text={'16 Combat Tasks Done'}
            >
                <WindRoseIcon className="w-7 h-7 stroke-taupe" />
            </Tab>
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.bosses}
                textColor="text-orange"
                hoverTextColor="hover:text-orange"
                groupHoverTextColor="group-hover:text-orange"
                bgColor="bg-orange"
                text={'45 Bosses Logged'}
            >
                <WindRoseIcon className="w-7 h-7 stroke-orange" />
            </Tab>
            <Tab
                selected={selected}
                setSelected={setSelected}
                triggerSelected={SelectedTab.clues}
                textColor="text-yellow"
                hoverTextColor="hover:text-yellow"
                groupHoverTextColor="group-hover:text-yellow"
                bgColor="bg-yellow"
                text={'74 Clues Completed'}
            >
                <WindRoseIcon className="w-7 h-7 stroke-yellow" />
            </Tab>
        </div>
    );
}

interface TabProps {
    children: JSX.Element;
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
    triggerSelected: SelectedTab;
    textColor: string;
    hoverTextColor: string;
    groupHoverTextColor: string;
    bgColor: string;
    text: string;
}

function Tab({
    children,
    selected,
    setSelected,
    triggerSelected,
    textColor,
    hoverTextColor,
    groupHoverTextColor,
    bgColor,
    text,
}: TabProps) {
    const isSelected = selected == triggerSelected;

    return (
        <div
            className={`group transition-all duration-200 ease-out flex px-6 py-4 hover:bg-gray-2nd rounded-lg hover:cursor-pointer items-center ${
                isSelected ? 'bg-gray-2nd' : 'active:bg-gray-3rd'
            }`}
            onClick={() => setSelected(triggerSelected)}
        >
            <div
                className={`flex items-center duration-300 ease-out ${
                    isSelected ? ' translate-x-8' : ''
                }`}
            >
                <div
                    className={`flex ${bgColor} rounded-full bg-opacity-50 w-12 h-12 items-center justify-center mr-8`}
                >
                    {children}
                </div>
                <div
                    className={`text-xl duration-200 ease-out ${groupHoverTextColor} ${
                        isSelected ? textColor : 'text-gray-font-light'
                    }`}
                >
                    {text}
                </div>
            </div>
            {isSelected && (
                <button
                    className={`w-8 h-8 ml-auto text-gray-font-light duration-200 ease-out ${hoverTextColor} active:text-gray-font`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelected(SelectedTab.none);
                    }}
                >
                    <ChevronLeftIcon />
                </button>
            )}
        </div>
    );
}

export default PlayerSummary;
