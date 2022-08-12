import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import {
    CheckCircleIcon,
    QuestionMarkCircleIcon,
    XCircleIcon,
} from '@heroicons/react/solid';

export default function DotsButton({
    markAsCompleted,
    markAsInProgress,
    markAsNotStarted,
}: {
    markAsCompleted: () => void;
    markAsInProgress: () => void;
    markAsNotStarted: () => void;
}) {
    return (
        <Menu
            as="div"
            className="relative h-8 text-gray-font-light hover:text-gray-font active:text-white"
        >
            <div>
                <Menu.Button className="transition-all duration-200 ease-out">
                    <DotsVerticalIcon className="h-8 w-8" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md bg-gray-2nd focus:outline-none z-10">
                    <div className="flex flex-col divide-y divide-gray-font-lightest items-center">
                        <Menu.Item>
                            <button
                                className="flex w-full px-4 py-3 text-sm items-center text-gray-font hover:bg-gray-3rd active:bg-gray-font-light rounded-t-md justify-center transition-all duration-200 ease-out"
                                onClick={markAsCompleted}
                            >
                                <CheckCircleIcon className="w-6 h-6 text-green mr-2" />
                                Mark as completed
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                className="flex w-full px-4 py-3 text-sm items-center text-gray-font hover:bg-gray-3rd active:bg-gray-font-light justify-center transition-all duration-200 ease-out"
                                onClick={markAsInProgress}
                            >
                                <QuestionMarkCircleIcon className="w-6 h-6 text-yellow mr-2" />
                                Mark as in progress
                            </button>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                className="flex w-full px-4 py-3 text-sm items-center text-gray-font hover:bg-gray-3rd active:bg-gray-font-light rounded-b-md justify-center transition-all duration-200 ease-out"
                                onClick={markAsNotStarted}
                            >
                                <XCircleIcon className="w-6 h-6 text-red mr-2" />
                                Mark as not started
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
