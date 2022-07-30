import { Dispatch, SetStateAction } from 'react';

enum SelectedTab {
    'none',
    'stats',
    'quests',
    'diaries',
    'combatTasks',
    'bosses',
    'clues',
}

type Setter<T> = Dispatch<SetStateAction<T>>;

export { SelectedTab };
export type { Setter };
