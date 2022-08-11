import { PlayerGet } from '../model/queries';
import { SelectedTab, Skill } from '../model/ui';
import { trpc } from '../utils/trpc';
import { ResolveIconByKey } from './icons';
import SearchBar from './search.bar';

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
        return <div>Error</div>;
    }

    if (isLoading) {
        return <div>isLoading</div>;
    }

    const playerData = data as PlayerGet;
    return (
        <>
            <div className="flex w-full justify-between items-center">
                <SearchBar />
            </div>
            <div className="flex flex-1 items-center justify-center">
                <RenderContainerBySelected
                    data={playerData}
                    selected={SelectedTab.stats}
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
            return <div>Unknown selection</div>;
    }
}

function StatContainer({ data }: { data: PlayerGet }) {
    return (
        <div className="grid grid-cols-3 grid-rows-8 gap-y-6 gap-x-12">
            {Array.from(data.skills.values()).map((value) => (
                <StatBox key={value.name} value={value} />
            ))}
        </div>
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

export default PlayerContent;
