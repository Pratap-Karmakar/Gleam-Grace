import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import pendent from '../../assets/ProductIcons/pendent.png';
import ring from '../../assets/ProductIcons/ring.png';
import earring from '../../assets/ProductIcons/earring.png';
import bracelet from '../../assets/ProductIcons/bracelet.png';
import { useNavigate } from 'react-router';
import { useRef } from 'react';

// category data
const category = [
    { image: pendent, name: 'pendent' },
    { image: ring, name: 'ring' },
    { image: bracelet, name: 'bracelet' },
    { image: earring, name: 'earring' },
    { image: bracelet, name: 'bracelet' },
    { image: pendent, name: 'pendent' },
    { image: earring, name: 'earring' },
    { image: bracelet, name: 'bracelet' },
    { image: pendent, name: 'pendent' },
    { image: ring, name: 'ring' },
    { image: bracelet, name: 'bracelet' },
    { image: pendent, name: 'pendent' },
    { image: earring, name: 'earring' },
    { image: bracelet, name: 'bracelet' },
    { image: pendent, name: 'pendent' },
    { image: earring, name: 'earring' },
    { image: bracelet, name: 'bracelet' },
    { image: pendent, name: 'pendent' },
    { image: earring, name: 'earring' },
];

const Category = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            // Width of one category item (including margin)
            const scrollSpeed = scrollContainerRef.current.clientWidth / 2; // Move 50% of the container width
            const scrollAmount = direction === 'left' ? -scrollSpeed : scrollSpeed;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div>
            <h1 className='text-center text-5xl text-pink-700 pt-10 pb-7 font-semibold leading-tight'>
                Top Categories
            </h1>
            <div className="relative">
                {/* Arrow buttons visible only on md and lg screens */}
                <button
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 p-3 bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <FaRegArrowAltCircleLeft size={30} className='text-pink-700'/>
                </button>
                <button
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-gray-200 text-gray-700 rounded-full shadow-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-transform transform hover:scale-105"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <FaRegArrowAltCircleRight size={30}  className='text-pink-700'/>
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-scroll hide-scroll-bar mt-5 px-2"
                >
                    <div className="flex space-x-6 lg:space-x-8">
                        {category.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center cursor-pointer"
                                onClick={() => navigate(`/category/${item.name}`)}
                            >
                                <div className="w-16 h-16 lg:w-24 lg:h-24 rounded-full bg-pink-500 transition-all hover:bg-pink-400 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="w-10 h-10 lg:w-16 lg:h-16" />
                                </div>
                                <h1 className="text-sm lg:text-lg text-center font-medium title-font mt-2">
                                    {item.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollbar hiding class */}
            <style>{`
                .hide-scroll-bar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;  /* Chrome, Safari, and Opera */
                }
            `}</style>
        </div>
    );
};

export default Category;
