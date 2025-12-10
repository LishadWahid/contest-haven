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

            <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
                <TabList>
                    {contestTypes.map((type, idx) => (
                        <Tab key={idx}>{type}</Tab>
                    ))}
                </TabList>

                {contestTypes.map((type, idx) => (
                    <TabPanel key={idx}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {contests.map(contest => (
                                <div key={contest._id} className="card bg-base-100 shadow-xl dark:bg-gray-800 dark:text-gray-100 border dark:border-gray-700">
                                    <figure><img src={contest.image} alt={contest.name} className="h-48 w-full object-cover" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title flex justify-between">
                                            <span className="truncate">{contest.name}</span>
                                            <div className="badge badge-secondary whitespace-nowrap text-xs">{contest.type}</div>
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-2">{contest.description.slice(0, 100)}...</p>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="font-semibold text-sm">Participants: {contest.participantsCount}</span>
                                        </div>
                                        <div className="card-actions justify-end mt-4">
                                            <Link to={`/contest/${contest._id}`} className="btn btn-primary btn-sm w-full">Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                ))}
            </Tabs>
        </div>
    );
};

export default AllContests;
