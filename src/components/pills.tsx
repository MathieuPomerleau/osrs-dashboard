export function CompletedPill() {
    return (
        <div className="text-sm bg-green/20 rounded-full text-green px-4 py-1">
            Completed
        </div>
    );
}

export function InProgressPill() {
    return (
        <div className="text-sm bg-yellow/20 rounded-full text-yellow px-4 py-1">
            In progress
        </div>
    );
}

export function NotStartedPill() {
    return (
        <div className="text-sm bg-red/20 rounded-full text-red px-4 py-1">
            Not started
        </div>
    );
}

export function OutlineCompletedPill() {
    return (
        <div className="text-sm border-2 green-red rounded-full text-green px-4 py-1">
            Completed
        </div>
    );
}

export function OutlineInProgressPill() {
    return (
        <div className="text-sm border-2 border-yellow rounded-full text-yellow px-4 py-1">
            In progress
        </div>
    );
}

export function OutlineNotStartedPill() {
    return (
        <div className="text-sm border-2 border-red rounded-full text-red px-4 py-1">
            Not started
        </div>
    );
}
