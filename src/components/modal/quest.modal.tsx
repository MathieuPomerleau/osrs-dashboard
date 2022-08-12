import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MappedQuest, Setter, SkillName } from '../../model/ui';
import { ResolveIconByKey, WindRoseIcon } from '../icons';
import { OutlineNotStartedPill } from '../pills';
import { ExternalLinkIcon } from '@heroicons/react/outline';

export default function QuestModal({
    open,
    setOpen,
    viewedQuest,
}: {
    open: boolean;
    setOpen: Setter<boolean>;
    viewedQuest: MappedQuest | undefined;
}) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-gray-3rd rounded-lg text-left overflow-hidden transform transition-all my-8 min-w-[36rem] w-auto px-12 py-8">
                                {/* <InformationCircleIcon className="h-10 w-10 text-gray-font mr-2" /> */}
                                {/* <WindRoseIcon className="h-8 w-8 stroke-blue mr-4" /> */}
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <div className="text-4xl text-gray-font mb-2 mr-8">
                                            {viewedQuest?.title}
                                        </div>
                                        <OutlineNotStartedPill />
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <div className="text-gray-font-mid font-thin">
                                            {`${viewedQuest?.difficulty[0]?.toUpperCase()}${viewedQuest?.difficulty?.substring(
                                                1
                                            )}`}
                                        </div>
                                        <div className="flex items-center text-blue mr-1">
                                            <span className="text-gray-font-mid mx-1">
                                                -
                                            </span>
                                            {viewedQuest?.questPoints}
                                            <WindRoseIcon className="w-4 h-4 stroke-blue ml-1" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-6">
                                        <div className="flex flex-col max-w-[20rem]">
                                            <div className="text-lg text-gray-font mb-2">
                                                Skill requirements
                                            </div>
                                            <div className="flex flex-col space-y-3 whitespace-nowrap">
                                                {viewedQuest?.statReqs?.map(
                                                    (x) => (
                                                        <div
                                                            key={x.skill}
                                                            className="flex space-x-3"
                                                        >
                                                            <ResolveIconByKey
                                                                skillName={
                                                                    x.skill as SkillName
                                                                }
                                                                className="w-8 h-8 fill-primary"
                                                            />
                                                            <div className="text-gray-font-mid">
                                                                {`${x.level} ${x.skill}`}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                                {viewedQuest?.statReqs
                                                    .length === 0 && (
                                                    <div className="text-gray-font-mid font-thin">
                                                        None
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col max-w-[20rem]">
                                            <div className="text-lg text-gray-font mb-2">
                                                Quest requirements
                                            </div>
                                            {viewedQuest?.questReqs?.map(
                                                (x) => (
                                                    <div
                                                        key={x}
                                                        className="text-gray-font-mid font-thin"
                                                    >
                                                        - {x}
                                                    </div>
                                                )
                                            )}
                                            {viewedQuest?.questReqs.length ===
                                                0 && (
                                                <div className="text-gray-font-mid font-thin">
                                                    None
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-8 flex items-center justify-between">
                                    <button
                                        className="flex items-center h-6 text-sm transition-all duration-100 ease-in text-primary border-b border-b-transparent hover:border-b-primary"
                                        onClick={() =>
                                            window.open(
                                                `https://oldschool.runescape.wiki${viewedQuest?.url}`
                                            )
                                        }
                                    >
                                        Open wiki page for this quest
                                        <ExternalLinkIcon className="w-5 h-5 ml-2" />
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex rounded-md border-2 px-4 py-2 font-medium text-sm transition-all duration-200 ease-out border-gray-font-mid text-gray-font-mid hover:border-gray-font hover:text-gray-font active:text-white active:border-white"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
