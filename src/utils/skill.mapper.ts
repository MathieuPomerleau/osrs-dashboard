import { Skill, SkillName } from '../model/ui';

export function mapHighscoresToSkillMap(
    highscoreArrayString: string
): Map<SkillName, Skill> {
    let skillArray: string[] = highscoreArrayString.split('\n');

    const skillMap = new Map<SkillName, Skill>();

    skillOrder.forEach((x) => {
        const index = skillIndexes.get(x) as number;
        const skill = skillArray[index].split(',');

        skillMap.set(x, {
            name: x,
            level: Number.parseInt(skill[1]),
            xp: Number.parseInt(skill[2]),
        });
    });

    return skillMap;
}

const skillIndexes = new Map<SkillName, number>([
    ['total', 0],
    ['attack', 1],
    ['defence', 2],
    ['strength', 3],
    ['hitpoints', 4],
    ['ranged', 5],
    ['prayer', 6],
    ['magic', 7],
    ['cooking', 8],
    ['woodcutting', 9],
    ['fletching', 10],
    ['fishing', 11],
    ['firemaking', 12],
    ['crafting', 13],
    ['smithing', 14],
    ['mining', 15],
    ['herblore', 16],
    ['agility', 17],
    ['thieving', 18],
    ['slayer', 19],
    ['farming', 20],
    ['runecrafting', 21],
    ['hunter', 22],
    ['construction', 23],
]);

const skillOrder: SkillName[] = [
    'attack',
    'hitpoints',
    'mining',
    'strength',
    'agility',
    'smithing',
    'defence',
    'herblore',
    'fishing',
    'ranged',
    'thieving',
    'cooking',
    'prayer',
    'crafting',
    'firemaking',
    'magic',
    'fletching',
    'woodcutting',
    'runecrafting',
    'slayer',
    'farming',
    'construction',
    'hunter',
    'total',
];
