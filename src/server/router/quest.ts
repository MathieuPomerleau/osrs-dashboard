import { Quest } from '@prisma/client';
import { Cache } from '../../model/cache';
import { MappedQuest, SkillRequirement } from '../../model/ui';
import { createRouter } from './context';

const cacheKey = 'quests';
const questCache = new Cache<MappedQuest[]>(360000);

export const questRouter = createRouter().query('getAll', {
    async resolve({ ctx }) {
        const cached = questCache.get(cacheKey);
        if (cached) {
            console.log('Returned from cache');
            return cached;
        }

        const allQuests = (await ctx.prisma.quest.findMany()) as Quest[];
        const fetched = allQuests.map((x) => parseAndMapJsonValues(x));

        console.log('Fetched from live');
        questCache.set(cacheKey, fetched);

        return fetched;
    },
});

function parseAndMapJsonValues(quest: Quest): MappedQuest {
    const statReqs = JSON.parse(
        JSON.stringify(quest.statReqs)
    ) as SkillRequirement[];

    const questReqs = JSON.parse(JSON.stringify(quest.questReqs)) as string[];
    const itemReqs = JSON.parse(JSON.stringify(quest.itemReqs)) as string[];

    return { ...quest, statReqs, questReqs, itemReqs };
}
