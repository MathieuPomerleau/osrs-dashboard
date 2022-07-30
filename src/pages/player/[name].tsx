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
            <PlayerSummary
                name={name}
                selected={selected}
                setSelected={setSelected}
            />
            <PlayerContent selected={selected} />
        </>
    );
};

export default PlayerNamePage;
