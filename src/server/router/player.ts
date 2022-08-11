import { createRouter } from './context';
import { z } from 'zod';
import { mapHighscoresToSkillMap } from '../../utils/skill.mapper';
import * as trpc from '@trpc/server';

export const playerRouter = createRouter()
    .query('get', {
        input: z.string(),
        async resolve({ ctx, input }) {
            const statReponse = await fetch(
                `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${input}`
            );

            if (!statReponse.ok) {
                throw new trpc.TRPCError({
                    code: 'BAD_REQUEST',
                    message:
                        "This player isn't listed within the Old School Runescape leaderboards.",
                });
            }

            let player = await ctx.prisma.player.findUnique({
                where: { name: input },
            });

            if (!player) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: "This player doesn't exist within Shark yet.",
                });
            }

            const skills = mapHighscoresToSkillMap(await statReponse.text());
            return {
                player,
                skills,
            };
        },
    })
    .mutation('create', {
        input: z.string(),
        async resolve({ ctx, input }) {
            const statReponse = await fetch(
                `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${input}`
            );

            if (!statReponse.ok) {
                throw new trpc.TRPCError({
                    code: 'BAD_REQUEST',
                    message:
                        "This player isn't listed within the Old School Runescape leaderboards.",
                });
            }

            await ctx.prisma.player.create({
                data: { name: input },
            });
        },
    });
