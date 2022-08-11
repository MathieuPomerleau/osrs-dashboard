import { Skill, SkillName } from '../model/ui';

export function calculateXpToNextLevel(currentLevel: number) {
    const nextLevel = currentLevel + 1;
    if (nextLevel > 99) {
        return 0;
    }

    const top = Math.pow(2, nextLevel / 7) - Math.pow(2, 1 / 7);
    const bottom = Math.pow(2, 1 / 7) - 1;
    const division = 600 * (top / bottom);
    const total = Math.pow(nextLevel, 2) - nextLevel + division;

    return (0.125 * total) | 0;
}

export function calculateCombatLevel(skills: Map<SkillName, Skill>) {
    const baseLevel =
        (1 / 4) *
        (Math.floor(skills.get('prayer')!.level / 2) +
            skills.get('defence')!.level +
            skills.get('hitpoints')!.level);

    const meleeLevel =
        (13 / 40) *
        (skills.get('attack')!.level + skills.get('strength')!.level);
    const rangeLevel = (13 / 40) * ((3 / 2) * skills.get('ranged')!.level);
    const mageLevel = (13 / 40) * ((3 / 2) * skills.get('magic')!.level);

    return Math.floor(baseLevel + Math.max(meleeLevel, rangeLevel, mageLevel));
}

export function getTotalLevels(skills: Map<SkillName, Skill>) {
    const total = skills.get('total');
    return total ? total.level : 'Unknown';
}
