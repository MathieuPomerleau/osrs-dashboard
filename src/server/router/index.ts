import { createRouter } from './context';
import superjson from 'superjson';
import { playerRouter } from './player';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('player.', playerRouter);

export type AppRouter = typeof appRouter;
