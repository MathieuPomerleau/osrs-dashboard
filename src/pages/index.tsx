import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FadeIn } from '../components/animation';
import SearchBar from '../components/search.bar';
import SideNav from '../components/sidenav';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Shark</title>
                <meta name="description" content="OSRS stats dashboard" />
            </Head>
            <SideNav />
            <MainLayout />
        </>
    );
};

function MainLayout() {
    return (
        <div className="flex flex-1 flex-col p-10 items-center">
            <div className="w-full">
                <FadeIn>
                    <div className="text-4xl text-gray-font">Shark</div>
                    <div className="text-2xl font-light text-gray-font-light">
                        Cooked and ready
                    </div>
                </FadeIn>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center">
                <FadeIn>
                    <div className="relative w-[22rem] h-[22rem] opacity-60">
                        <Image
                            src="/images/launching.svg"
                            layout="fill"
                            alt="Empty search image"
                        />
                    </div>
                </FadeIn>
                <FadeIn>
                    <div className="text-4xl text-gray-font mb-2">
                        Track your stats with Shark
                    </div>
                </FadeIn>
                <FadeIn>
                    <div className="text-lg font-light text-gray-font-light mb-14">
                        Get started by searching for an OSRS player.
                    </div>
                </FadeIn>
                <FadeIn>
                    <SearchBar />
                </FadeIn>
            </div>
        </div>
    );
}

export default Home;
