import Image from 'next/image';
import { useRouter } from 'next/router';
import { BookOpenIcon, FireIcon, UserGroupIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function SideNav() {
    return (
        <div className="flex flex-col items-center p-10 space-y-20 bg-gray-1st">
            <Logo />
            <NavIcon href="/group">
                <UserGroupIcon className="text-current w-8 h-8" />
            </NavIcon>
            <NavIcon href="/leagues">
                <FireIcon className="text-current w-8 h-8" />
            </NavIcon>
            <NavIcon href="/wiki">
                <BookOpenIcon className="text-current w-8 h-8" />
            </NavIcon>
        </div>
    );
}

function Logo() {
    return (
        <div className="relative w-16 h-16">
            <Image src="/images/shark.png" layout="fill" />
        </div>
    );
}

interface NavIconProps {
    children: JSX.Element;
    href: string;
}

function NavIcon({ children, href }: NavIconProps) {
    const router = useRouter();
    const isRouteCurrentNav = () => router.pathname == href;

    return (
        <Link href={href}>
            <a
                className={`relative ${
                    isRouteCurrentNav()
                        ? 'text-primary'
                        : 'text-gray-font-light'
                }`}
            >
                {children}
            </a>
        </Link>
    );
}

export default SideNav;
