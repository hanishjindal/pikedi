import React, { useState } from 'react'
import { FaSearch, FaSortAmountDown } from "react-icons/fa";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { PiCalendarThin } from "react-icons/pi";
import { HiChevronDown } from "react-icons/hi";
import { RxReset } from "react-icons/rx";

type sortType = 'acc' | 'dec'

const SearchBar = () => {
    const [selectionRange, setSelectionRange] = useState<any>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const [showDate, setShowDate] = useState<boolean>(false)
    const [sort, setSort] = useState<sortType>('acc')

    const handleSelect = (ranges: any) => {
        setSelectionRange(ranges.selection);
        setShowDate(false)
    };

    return (
        <div className='bg-gray-600 p-4 lg:p-2 lg:px-4 rounded-xl flex flex-col lg:flex-row gap-2 justify-between'>
            <div className='flex bg-white w-full lg:w-1/3 h-full py-1 rounded-sm items-center pr-3'>
                <select
                    name="seatchType"
                    id="searchType"
                    className='h-full border-r-2 p-1 text-sm whitespace-nowrap rounded-l-md'
                >
                    <option value="value">Name</option>
                    <option value="id">Id</option>
                </select>
                <input className='px-1 rounded-md w-full' placeholder='search' />
                <FaSearch size={20} />
            </div>
            <div className='flex gap-4 items-center'
                onMouseLeave={() => setShowDate(false)}
            >
                <div className='relative'>
                    <div
                        className='bg-white px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer'
                        onClick={() => setShowDate(e => !e)}
                    >
                        <PiCalendarThin /> Date <HiChevronDown className={showDate ? '' : 'rotate-180'} />
                    </div>
                    {showDate &&
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            className='absolute -right-1/2 lg:-right-0 top-full z-[2] border border-black'
                        />
                    }
                </div>

                <div
                    className='bg-white p-3 py-1 rounded-md cursor-pointer flex items-center gap-2'
                    onClick={() => setSort(sort === 'acc' ? 'dec' : 'acc')}
                >
                    <FaSortAmountDown className={sort === 'acc' ? 'rotate-180' : ''} /> Sort
                </div>

                <div className='bg-white p-3 py-1 rounded-md cursor-pointer flex items-center gap-2'>
                    <RxReset /> Reset
                </div>
            </div>

        </div>
    )
}

export default SearchBar