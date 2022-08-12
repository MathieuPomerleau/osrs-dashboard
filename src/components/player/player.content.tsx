import { PlayerGet, QuestGetAll } from '../../model/queries';
import { MappedQuest, SelectedTab, Skill } from '../../model/ui';
import { trpc } from '../../utils/trpc';
import { FadeIn } from '../animation';
import { ResolveIconByKey, WindRoseIcon } from '../icons';
import SearchBar from '../search/search.bar';
import Image from 'next/image';
import ListSearchBar from '../search/list.search.bar';
import { CompletedPill, InProgressPill, NotStartedPill } from '../pills';
import { useState } from 'react';
import DotsButton from '../dots.button';
import { ExclamationContainer } from '../containers';
import QuestModal from '../modal/quest.modal';
import { Quest } from '@prisma/client';

type PlayerContentProps = {
    name: string;
    selected: SelectedTab;
};

function PlayerContent({ name, selected }: PlayerContentProps) {
    const { data, isLoading, error } = trpc.useQuery(['player.get', name], {
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (error) {
        return (
            <FadeIn>
                <div className="flex w-full justify-between items-center">
                    <SearchBar />
                </div>
            </FadeIn>
        );
    }

    if (isLoading) {
        return (
            <FadeIn>
                <div className="flex w-full justify-between items-center">
                    <SearchBar />
                </div>
            </FadeIn>
        );
    }

    const playerData = data as PlayerGet;
    return (
        <>
            <div className="flex w-full justify-between items-center">
                <FadeIn>
                    <SearchBar />
                </FadeIn>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <RenderContainerBySelected
                    data={playerData}
                    selected={selected}
                />
            </div>
        </>
    );
}

function RenderContainerBySelected({
    data,
    selected,
}: {
    data: PlayerGet;
    selected: SelectedTab;
}) {
    switch (selected) {
        case SelectedTab.stats:
            return <StatContainer data={data} />;
        case SelectedTab.quests:
            return <QuestContainer playerData={data} />;
        default:
            return <EmptyContainer />;
    }
}

function StatContainer({ data }: { data: PlayerGet }) {
    return (
        <FadeIn>
            <div className="grid grid-cols-3 grid-rows-8 gap-y-4 gap-x-8">
                {Array.from(data.skills.values()).map((value) => (
                    <StatBox key={value.name} value={value} />
                ))}
            </div>
        </FadeIn>
    );
}

function StatBox({ value }: { value: Skill }) {
    return (
        <div className="flex flex-row items-center text-gray-font">
            <ResolveIconByKey
                skillName={value.name}
                className="w-12 h-12 fill-primary mr-3 mt-3"
            />
            <div className="flex flex-col items-center mx-auto">
                <div className="text-4xl text-gray-font">{value.level}</div>
                <div className="border border-gray-font-light w-full h-0.5 mt-1 rounded-full" />
                <div className="text-gray-font-light">99</div>
            </div>
        </div>
    );
}

function QuestContainer({ playerData }: { playerData: PlayerGet }) {
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [viewedQuest, setViewedQuest] = useState<MappedQuest | undefined>(
        undefined
    );
    const { data, isLoading, error } = trpc.useQuery(['quest.getAll'], {
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (error) {
        return (
            <ExclamationContainer
                title="Quest list unreachable"
                subtitle="Failed to fetch quest list. Please try again later."
            />
        );
    }

    if (isLoading) {
        return <div className="text-gray-font">Loading...</div>;
    }

    const questdata = data as QuestGetAll;
    return (
        <div className="w-[44rem] h-4/5">
            <QuestModal
                open={modalOpen}
                setOpen={setModalOpen}
                viewedQuest={viewedQuest}
            />
            <FadeIn>
                <div className="flex text-gray-font border-b-2 border-b-gray-font-light justify-between pb-2">
                    <div className="text-4xl font-thin">Quests</div>
                    <ListSearchBar
                        placeholder="Search for a quest..."
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <div className="text-gray-font px-4 divide-y-2 divide-gray-font-lightest transition-all max-h-[32rem] overflow-y-scroll scrollbar">
                    {questdata
                        .filter(
                            (x) =>
                                x.title === '' ||
                                x.title
                                    .toLocaleLowerCase()
                                    .includes(search.toLocaleLowerCase())
                        )
                        .map((quest) => (
                            <FadeIn key={quest.id}>
                                <div className="flex py-6 items-center">
                                    <div className="text-xl font-thin text-gray-font-light w-72">
                                        {quest.title}
                                    </div>
                                    <div className="flex mr-16">
                                        <div className="text-blue w-3">
                                            {quest.questPoints}
                                        </div>
                                        <WindRoseIcon className="w-6 h-6 stroke-blue" />
                                    </div>
                                    <GetPill state={'notstarted'} />
                                    <button
                                        className="text-gray-font-light border-2 border-gray-font-light rounded-lg px-3 py-1 ml-auto transition-all duration-200 ease-out
                                                    hover:text-gray-font hover:border-gray-font active:text-white active:border-white mr-4"
                                        onClick={() => {
                                            setViewedQuest(quest);
                                            setModalOpen(true);
                                        }}
                                    >
                                        View
                                    </button>
                                    <DotsButton
                                        markAsCompleted={() => {}}
                                        markAsInProgress={() => {}}
                                        markAsNotStarted={() => {}}
                                    />
                                </div>
                            </FadeIn>
                        ))}
                </div>
            </FadeIn>
        </div>
    );
}

function GetPill({ state }: { state: string }) {
    switch (state) {
        case 'completed':
            return <CompletedPill />;
        case 'inprogress':
            return <InProgressPill />;
        case 'notstarted':
            return <NotStartedPill />;
    }
    return <div>Not found</div>;
}

function EmptyContainer() {
    return (
        <FadeIn>
            <div className="flex flex-1 flex-col items-center justify-center">
                <div className="relative w-[20rem] h-[20rem] opacity-60">
                    <Image
                        src="/images/choose.svg"
                        layout="fill"
                        alt="Empty search image"
                    />
                </div>
                <div className="text-4xl text-gray-font mb-2 mt-8">
                    No category selected
                </div>
                <div className="text-lg font-light text-gray-font-light w-[26rem] text-center">
                    Each category expands into a more detailed view. Select one
                    to get started.
                </div>
            </div>
        </FadeIn>
    );
}

export default PlayerContent;
