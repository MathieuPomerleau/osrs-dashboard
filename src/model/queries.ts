import { inferQueryOutput } from '../utils/trpc';

export type PlayerGet = inferQueryOutput<'player.get'>;
export type QuestGetAll = inferQueryOutput<'quest.getAll'>;
