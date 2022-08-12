import { ExclamationIcon } from '@heroicons/react/outline';

export function ExclamationContainer({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex flex-col items-center">
            <ExclamationIcon className="w-24 h-24 text-gray-font-lightest" />
            <div className="text-2xl pt-4">{title}</div>
            <div className="text-gray-font-light pt-1">{subtitle}</div>
        </div>
    );
}
