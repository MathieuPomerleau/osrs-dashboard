import { createRouter } from './context';
import superjson from 'superjson';
import { playerRouter } from './player';
import { questRouter } from './quest';

export const appRouter = createRouter()
    .transformer(superjson)
    .merge('player.', playerRouter)
    .merge('quest.', questRouter);

export type AppRouter = typeof appRouter;
