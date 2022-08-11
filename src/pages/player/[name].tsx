import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PlayerContent from '../../components/player.content';
import PlayerSummary from '../../components/player.summary';
import SideNav from '../../components/sidenav';
import { SelectedTab } from '../../model/ui';

const PlayerNamePage: NextPage = () => {
    const router = useRouter();
    const name = router.query.name as string;
    const [selected, setSelected] = useState(SelectedTab.none);

    return (
        <>
            <Head>
                <title>{`Shark | ${name}`}</title>
                <meta name="description" content="OSRS stats dashboard" />
            </Head>
            <SideNav />
            <div className="flex flex-col h-full py-10 pr-10 w-[30rem] bg-gray-1st text-gray-font">
                <PlayerSummary
                    name={name}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
            <div className="flex flex-1 flex-col p-10">
                <PlayerContent name={name} selected={selected} />
            </div>
        </>
    );
};

export default PlayerNamePage;
