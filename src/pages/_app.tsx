import '../styles/globals.css';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <div className="flex h-screen bg-gray-base">
            <Component {...pageProps} />
        </div>
    );
};

export default withTRPC<AppRouter>({
    config({ ctx }) {
        if (typeof window !== 'undefined') {
            // during client requests
            return {
                transformer: superjson, // optional - adds superjson serialization
                url: '/api/trpc',
            };
        }
        // during SSR below

        // optional: use SSG-caching for each rendered page (see caching section for more details)
        const ONE_DAY_SECONDS = 60 * 60 * 24;
        ctx?.res?.setHeader(
            'Cache-Control',
            `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
        );

        // The server needs to know your app's full url
        // On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`
        const url = process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/api/trpc`
            : 'http://localhost:3000/api/trpc';

        return {
            url,
            transformer: superjson,
            headers: {
                'x-ssr': '1',
            },
        };
    },
    ssr: true,
})(MyApp);
