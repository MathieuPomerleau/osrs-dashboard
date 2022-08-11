import {
    ChartBarIcon,
    ChevronLeftIcon,
    ExclamationIcon,
    ExternalLinkIcon,
    RefreshIcon,
} from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PlayerGet } from '../model/queries';
import { SelectedTab, Setter } from '../model/ui';
import {
    calculateCombatLevel,
    getTotalLevels,
} from '../utils/skill.calculator';
import { trpc } from '../utils/trpc';
import { FadeIn, LoadingSpinner, Shimmer } from './animation';
import { IronManIcon, WindRoseIcon } from './icons';
import { motion } from 'framer-motion';

type PlayerSummaryProps = {
    name: string;
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
};

function PlayerSummary({ name, selected, setSelected }: PlayerSummaryProps) {
    const router = useRouter();
    const [isManualFetching, setIsManualFetching] = useState(false);
    const { data, isLoading, error, refetch } = trpc.useQuery(
        ['player.get', name],
        {
            retry: false,
            refetchOnWindowFocus: false,
            onSettled: () => setIsManualFetching(false),
        }
    );

    if (error) {
        return (
            <div className="flex flex-1 items-center justify-center text-center">
                <FadeIn>
                    <PlayerSummaryError name={name} error={error} />
                </FadeIn>
            </div>
        );
    }

    if (isLoading) {
        return (
            <FadeIn>
                <PlayerHeaderSkeleton />
                <div className="space-y-4">
                    <PlayerContentSkeleton />
                    <PlayerContentSkeleton />
                    <PlayerContentSkeleton />
                </div>
            </FadeIn>
        );
    }

    const playerData = data as PlayerGet;
    return (
        <>
            <PlayerHeader
                data={playerData}
                refetch={refetch}
                isManualFetching={isManualFetching}
                setIsManualFetching={setIsManualFetching}
            />

            <PlayerContent
                data={playerData}
                selected={selected}
                setSelected={setSelected}
            />

            <button
                className="flex items-center transition-all duration-100 ease-in text-primary mt-auto ml-auto border-b border-b-transparent hover:border-b-primary"
                onClick={() =>
                    window.open(
                        `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${name}`
                    )
                }
            >
                View Highscores on the OSRS site
                <ExternalLinkIcon className="w-5 h-5 ml-2" />
            </button>
        </>
    );
}

function PlayerSummaryError({ name, error }: { name: string; error: any }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const trpcUtils = trpc.useContext();
    const mutation = trpc.useMutation(['player.create'], {
        onSuccess: () => {
            trpcUtils.invalidateQueries(['player.get']);
        },
        onSettled: () => {
            setIsRegistering(false);
        },
    });

    const registerHandler = () => {
        setIsRegistering(true);
        mutation.mutate(name);
    };

    if (error.data.code === 'BAD_REQUEST') {
        return (
            <ExclamationContainer
                title="Player doesn't exist"
                subtitle={`Player ${name} doesn't exist within the OSRS Highscores.`}
            />
        );
    }

    if (error.data.code === 'NOT_FOUND') {
        return (
            <div className="flex flex-col space-y-6 items-center">
                <ExclamationContainer
                    title="Player not found"
                    subtitle={`Player ${name} doesn't exist within Shark.`}
                />
                <button
                    className="flex items-center bg-green text-black font-medium text-lg rounded-lg px-3 py-1 hover:bg-green-light"
                    onClick={registerHandler}
                >
                    {isRegistering ? (
                        <LoadingSpinner className="w-5 h-5 mr-2" />
                    ) : (
                        <LightningBoltIcon className="w-5 h-5 mr-2" />
                    )}
                    Register profile
                </button>
            </div>
        );
    }

    return (
        <ExclamationContainer
            title="Unexpected error"
            subtitle={`Failed to display information for ${name}.`}
        />
    );
}

function ExclamationContainer({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <ExclamationIcon className="w-24 h-24 text-gray-font-lightest" />
            <div className="text-2xl pt-4">{title}</div>
            <div className="text-gray-font-light pt-1">{subtitle}</div>
        </div>
    );
}

function PlayerHeaderSkeleton() {
    return (
        <div className="pb-10">
            <Shimmer>
                <div className="flex items-center">
                    <div className="bg-white/20 rounded-full w-12 h-12 items-center justify-center mr-8" />
                    <div className="space-y-3">
                        <div className="w-40 h-7 bg-white/20 rounded-lg" />
                        <div className="w-28 h-5 bg-white/10 rounded-lg" />
                    </div>
                </div>
            </Shimmer>
        </div>
    );
}

function PlayerHeader({
    data,
    refetch,
    isManualFetching,
    setIsManualFetching,
}: {
    data: PlayerGet;
    refetch: any;
    isManualFetching: boolean;
    setIsManualFetching: Setter<boolean>;
}) {
    return (
        <FadeIn>
            <div className="flex items-center px-6 pb-10">
                <div className="flex bg-red rounded-full bg-opacity-50 w-12 h-12 items-center justify-center mr-8">
                    <IronManIcon className="w-6 h-6 stroke-red" />
                </div>
                <div>
                    <div className="text-3xl">{data.player.name}</div>
                    <div className="text-gray-font-light font-light">
                        Lvl {calculateCombatLevel(data.skills)} combat
                    </div>
                </div>
                <button
                    className="w-8 h-8 transition-all duration-200 ease-out text-gray-font-light ml-auto hover:text-gray-font active:text-white"
                    onClick={() => {
                        setIsManualFetching(true);
                        refetch();
                    }}
                >
                    <RefreshIcon
                        className={`transform rotate-180 ${
                            isManualFetching ? 'animate-reverse-spin' : ''
                        }`}
                    />
                </button>
            </div>
        </FadeIn>
    );
}

function PlayerContentSkeleton() {
    return (
        <FadeIn>
            <div className="h-20">
                <Shimmer>
                    <div className="flex items-center">
                        <div className="bg-white/20 rounded-full w-12 h-12 items-center justify-center mr-8" />
                        <div className="space-y-3">
                            <div className="w-60 h-7 bg-white/10 rounded-lg" />
                        </div>
                    </div>
                </Shimmer>
            </div>
        </FadeIn>
    );
}

function PlayerContent({
    data,
    selected,
    setSelected,
}: {
    data: PlayerGet;
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
}) {
    return (
        <FadeIn>
            <div className="flex flex-col space-y-4">
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.stats}
                    textColor="text-purple"
                    groupHoverTextColor="group-hover:text-purple"
                    bgColor="bg-purple"
                    text={`${getTotalLevels(data.skills)} Total Levels`}
                >
                    <ChartBarIcon className="w-7 h-7 stroke-purple" />
                </Tab>
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.quests}
                    textColor="text-blue"
                    groupHoverTextColor="group-hover:text-blue"
                    bgColor="bg-blue"
                    text={`${0} Quest Points`}
                >
                    <WindRoseIcon className="w-7 h-7 stroke-blue" />
                </Tab>
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.diaries}
                    textColor="text-green"
                    groupHoverTextColor="group-hover:text-green"
                    bgColor="bg-green"
                    text={`${0} Diaries Completed`}
                >
                    <WindRoseIcon className="w-7 h-7 stroke-green" />
                </Tab>
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.combatTasks}
                    textColor="text-taupe"
                    groupHoverTextColor="group-hover:text-taupe"
                    bgColor="bg-taupe"
                    text={`${0} Combat Tasks Done`}
                >
                    <WindRoseIcon className="w-7 h-7 stroke-taupe" />
                </Tab>
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.bosses}
                    textColor="text-orange"
                    groupHoverTextColor="group-hover:text-orange"
                    bgColor="bg-orange"
                    text={`${0} Bosses Logged`}
                >
                    <WindRoseIcon className="w-7 h-7 stroke-orange" />
                </Tab>
                <Tab
                    selected={selected}
                    setSelected={setSelected}
                    triggerSelected={SelectedTab.clues}
                    textColor="text-yellow"
                    groupHoverTextColor="group-hover:text-yellow"
                    bgColor="bg-yellow"
                    text={`${0} Clues Completed`}
                >
                    <WindRoseIcon className="w-7 h-7 stroke-yellow" />
                </Tab>
            </div>
        </FadeIn>
    );
}

type TabProps = {
    children: JSX.Element;
    selected: SelectedTab;
    setSelected: Setter<SelectedTab>;
    triggerSelected: SelectedTab;
    textColor: string;
    groupHoverTextColor: string;
    bgColor: string;
    text: string;
};

function Tab({
    children,
    selected,
    setSelected,
    triggerSelected,
    textColor,
    groupHoverTextColor,
    bgColor,
    text,
}: TabProps) {
    const isSelected = selected == triggerSelected;

    return (
        <div
            className={`group transition-all duration-200 ease-out flex px-6 py-4 hover:bg-gray-2nd rounded-lg hover:cursor-pointer items-center active:bg-gray-3rd ${
                isSelected ? 'bg-gray-2nd' : ''
            }`}
            onClick={() => {
                if (isSelected) {
                    setSelected(SelectedTab.none);
                } else {
                    setSelected(triggerSelected);
                }
            }}
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
            <button
                className={`w-6 h-6 ml-auto text-gray-font-light duration-200 ease-out ${groupHoverTextColor} active:text-gray-font`}
                onClick={() => setSelected(SelectedTab.none)}
            >
                <ChevronLeftIcon
                    className={`transition-all duration-300 ease-out ${
                        isSelected ? 'rotate-0' : 'rotate-180'
                    }`}
                />
            </button>
        </div>
    );
}

export default PlayerSummary;
