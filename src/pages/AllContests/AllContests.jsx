import { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

    return (
        <div className='my-10 px-4'>
            <h2 className="text-3xl text-center font-bold mb-8">All Contests</h2>

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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-10 gap-6 mt-8">
                            {contests.map((contest, index) => (
                                <Link
                                    to={`/contest/${contest._id}`}
                                    key={contest._id}
                                    className="group bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/30 flex flex-col h-full hover:-translate-y-1"
                                >
                                    <figure className="h-40 overflow-hidden relative">
                                        <img
                                            src={contest.image}
                                            alt={contest.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <span className="badge bg-white/95 text-primary border-none text-[10px] font-bold shadow-sm uppercase tracking-wide">
                                                {contest.type}
                                            </span>
                                        </div>
                                    </figure>

                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-50 mb-1 line-clamp-1 group-hover:text-primary transition-colors text-sm">
                                            {contest.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-200 line-clamp-2 mb-3 leading-relaxed">
                                            {contest.description}
                                        </p>

                                        <div className="mt-auto space-y-3">
                                            <div className="flex justify-between items-center text-xs font-semibold pt-3 border-t border-gray-50 dark:border-gray-700">
                                                <span className="text-secondary flex items-center gap-1">
                                                    🏆 ${contest.prize}
                                                </span>
                                                <span className="text-gray-400 dark:text-gray-300">
                                                    👥 {contest.participantsCount}
                                                </span>
                                            </div>

                                            <button className="btn btn-primary btn-sm w-full min-h-[2rem] h-9 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg group-hover:bg-primary/90 border-none">
                                                View Details
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
