import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaUserFriends, FaTrophy, FaArrowRight } from "react-icons/fa";

const AllContests = () => {
    const [searchParams] = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedType, setSelectedType] = useState('');

    const axiosPublic = useAxiosPublic();

    const { data: contests = [] } = useQuery({
        queryKey: ['contests', selectedType, initialSearch],
        queryFn: async () => {
            let url = '/contests';
            if (selectedType || initialSearch) {
                url += `?type=${selectedType}&search=${initialSearch}`;
            }
            const res = await axiosPublic.get(url);
            return res.data;
        }
    });

    const contestTypes = ['All', 'Article Writing', 'Image Design', 'Business Idea', 'Marketing'];

    const handleTabSelect = (index) => {
        setTabIndex(index);
        setSelectedType(index === 0 ? '' : contestTypes[index]);
    };

    const formatDeadline = (deadline) => {
        const date = new Date(deadline);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Ended";
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        return `${diffDays} days left`;
    };

    return (
        <div className="my-10 w-full mx-auto px-4 md:px-8 lg:px-12">
            <h2 className="text-3xl text-center font-bold mb-8 text-gray-900 dark:text-white">All Contests</h2>

            <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect} className="w-full">
                <TabList className="flex flex-wrap justify-center gap-2 mb-8 border-b-0 p-0">
                    {contestTypes.map((type, idx) => (
                        <Tab
                            key={idx}
                            selectedClassName="!bg-primary !text-white !border-primary shadow-lg ring-2 ring-primary/20"
                            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary outline-none select-none bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                            {type}
                        </Tab>
                    ))}
                </TabList>

                {contestTypes.map((type, idx) => (
                    <TabPanel key={idx}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contests.map((contest, index) => (
                                <Link
                                    to={`/contest/${contest._id}`}
                                    key={contest._id}
                                    className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 flex flex-col h-full w-full"
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    {/* Image Section */}
                                    <figure className="h-32 overflow-hidden relative shrink-0">
                                        <img
                                            src={contest.image}
                                            alt={contest.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                                        {/* Badge */}
                                        <div className="absolute top-2 right-2 z-10">
                                            <span className="bg-white/95 text-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                                                {contest.type}
                                            </span>
                                        </div>

                                        {/* Overlay Text */}
                                        <div className="absolute bottom-2 left-3 right-3 z-10">
                                            <h2 className="text-sm font-bold text-white mb-0.5 line-clamp-1 drop-shadow-md group-hover:text-secondary transition-colors">
                                                {contest.name}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-medium">
                                                <FaUserFriends className="text-blue-300" />
                                                <span>{contest.participantsCount} Joined</span>
                                            </div>
                                        </div>
                                    </figure>

                                    {/* Content Body */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Prize</span>
                                                <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                                    <FaTrophy className="text-accent text-xs" /> ${contest.prize}
                                                </span>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">Ends In</span>
                                                <span className={`text-[10px] font-bold ${formatDeadline(contest.deadline) === 'Ended' ? 'text-red-500' : 'text-green-600'}`}>
                                                    {formatDeadline(contest.deadline)}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-[11px] line-clamp-2 mb-3 leading-relaxed">
                                            {contest.description}
                                        </p>

                                        <div className="mt-auto">
                                            <button className="w-full btn btn-primary btn-xs min-h-[1.75rem] h-7 rounded-md text-white font-bold text-[10px] shadow-sm hover:shadow group-hover:scale-[1.02] transition-transform">
                                                View Details <FaArrowRight className="ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default AllContests;
