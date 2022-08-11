import { PlayerGet } from '../model/queries';
import { SelectedTab, Skill } from '../model/ui';
import { trpc } from '../utils/trpc';
import { FadeIn } from './animation';
import { ResolveIconByKey } from './icons';
import SearchBar from './search.bar';
import Image from 'next/image';

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
        default:
            return <EmptyContainer />;
    }
}

function StatContainer({ data }: { data: PlayerGet }) {
    return (
        <FadeIn>
            <div className="grid grid-cols-3 grid-rows-8 gap-y-6 gap-x-12">
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
