import React, { useState, useEffect } from 'react';
import { FaSearch, FaSortAmountDown } from 'react-icons/fa';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { PiCalendarThin } from 'react-icons/pi';
import { HiChevronDown } from 'react-icons/hi';
import { RxReset } from 'react-icons/rx';

type sortType = 'acc' | 'dec';

interface SearchBarProps {
    list: any[];
    setList: (value: any[]) => void;
    originalList: any[];
    setOriginalList: (value: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    list,
    setList,
    originalList,
    setOriginalList
}) => {
    const [selectionRange, setSelectionRange] = useState<any>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [showDate, setShowDate] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>('');
    const [clickOutDate, setClickOutDate] = useState<boolean>(false);
    const [sort, setSort] = useState<sortType>('acc');

    useEffect(() => {
        if (!originalList.length)
            setOriginalList(list);
    }, [list]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            handleReset();
        }
    };

    const handleReset = () => {
        setList(originalList);
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        });
        setShowDate(false)
        setSearchInput('');
        setSort('acc');
        setClickOutDate(false);
    };

    const handleDate = (value: boolean) => {
        if (value === false && clickOutDate) {
            handleDateSearch();
        }
        setShowDate(value);
    };

    const handleSelect = (ranges: any) => {
        setClickOutDate(true);
        setSelectionRange(ranges.selection);
    };

    const handleDateSearch = () => {
        const formattedStartDate = new Date(selectionRange.startDate);
        const formattedEndDate = new Date(selectionRange.endDate);

        formattedStartDate.setHours(0, 0, 0, 0);
        formattedEndDate.setHours(23, 59, 59, 999);

        const filteredList = originalList.filter(
            (item) =>
                new Date(item.createdAt) >= formattedStartDate &&
                new Date(item.createdAt) <= formattedEndDate
        );

        setList(filteredList);
        setClickOutDate(false);
    };

    const handleSearch = () => {
        if (!searchInput.trim()) {
            handleReset();
            return;
        }

        const filteredList = originalList.filter(
            (item) =>
                item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.imageId.toString() === searchInput
        );

        setList(filteredList);
    };

    const handleSort = () => {
        const sortedList = [...originalList];

        sortedList.sort((a, b) => {
            const dateA: Date = new Date(a.createdAt);
            const dateB: Date = new Date(b.createdAt);

            if (sort === 'dec') {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        });

        setList(sortedList);
        setSort(sort === 'acc' ? 'dec' : 'acc');
    };

    return (
        <div className='bg-lighest-theme border border-theme p-3 md:p-2 md:px-4 rounded-xl flex flex-col md:flex-row gap-2 justify-between w-full'>
            <div className='flex bg-white w-full lg:w-1/3 h-full py-1 rounded-md items-center pr-3 border-2 border-theme'>
                <select
                    name="searchType"
                    id="searchType"
                    className='h-full border-r-2 p-1 text-sm whitespace-nowrap rounded-l-md bg-white'
                >
                    <option value="value">Name</option>
                    <option value="id">Id</option>
                </select>
                <input
                    className='px-2 rounded-md w-full text-sm'
                    placeholder='search'
                    value={searchInput}
                    onChange={(e) => {
                        if (e.target.value === '') {
                            handleReset();
                        }
                        setSearchInput(e.target.value);
                    }}
                />
                <FaSearch size={20} onClick={handleSearch} className='cursor-pointer' />
            </div>
            <div className='flex gap-1 lg:gap-4 items-center justify-end'
                onMouseLeave={() => showDate && handleDate(false)}
            >
                <div className='relative'>
                    <div
                        className='bg-white border-2 border-theme text-sm lg:text-base px-3 py-1 rounded-md flex items-center gap-1 lg:gap-2 cursor-pointer'
                        onClick={() => handleDate(!showDate)}
                    >
                        <PiCalendarThin className={`text-theme`} /> Date <HiChevronDown className={showDate ? '' : 'rotate-180'} />
                    </div>
                    {showDate &&
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            className='absolute left-0 md:left-auto md:-right-0 top-full z-[2] border border-black w-[270%] md:w-auto overflow-x-auto text-xs md:text-base'
                        />
                    }
                </div>

                <div
                    className='bg-white border-2 border-theme text-sm lg:text-base p-3 py-1 rounded-md cursor-pointer flex items-center gap-1 lg:gap-2'
                    onClick={handleSort}
                >
                    <FaSortAmountDown className={`text-theme ${sort === 'acc' ? 'rotate-180' : ''}`} /> Sort
                </div>

                <div
                    className='bg-white border-2 border-theme text-sm lg:text-base p-3 py-1 rounded-md cursor-pointer flex items-center gap-1 lg:gap-2'
                    onClick={handleReset}
                >
                    <RxReset className={`text-theme`} /> Reset
                </div>
            </div>

        </div>
    )
}

export default SearchBar