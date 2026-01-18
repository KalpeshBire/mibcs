import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { api } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter,
    Calendar,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
    Camera,
    Image as ImageIcon
} from 'lucide-react';

const Gallery = () => {
    // State
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedYear, setSelectedYear] = useState('All');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [isSticky, setIsSticky] = useState(false);

    // Fetch Data
    const { data: images = [], isLoading } = useQuery('gallery-images-full', () =>
        api.get('/gallery').then(res => res.data)
    );

    // Scroll Listener for Sticky Header
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Disable Body Scroll when Modal Open
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedImageIndex]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowRight') setNextImage();
            if (e.key === 'ArrowLeft') setPrevImage();
            if (e.key === 'Escape') setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    // Filtering Logic
    const categories = ['All', 'Workshops', 'Competitions', 'Achievements', 'Fun & Culture'];
    const years = ['All', '2023', '2024', '2025'];

    const filteredImages = images.filter(img => {
        // Mocking year extraction if date not present, fallback to current year or reliable field
        // Assuming createdAt has the date
        const imgYear = new Date(img.createdAt).getFullYear().toString();
        const categoryMatch = selectedCategory === 'All' || (img.category && img.category.toLowerCase().includes(selectedCategory.toLowerCase())) || (selectedCategory === 'Fun & Culture' && !img.category);
        const yearMatch = selectedYear === 'All' || imgYear === selectedYear;
        return categoryMatch && yearMatch;
    });

    // Navigation Handlers
    const setNextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const setPrevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                {/* Animated Gradient Orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-4"
                >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm mb-6 backdrop-blur-sm">
                        <Camera size={14} />
                        <span className="uppercase tracking-widest font-bold text-xs">Visual Legacy</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Moments that <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Built the Club</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A curated collection of workshops, hackathons, and the memories we create together.
                    </p>
                </motion.div>
            </section>

            {/* Sticky Filter Bar */}
            <div className={`sticky top-0 z-40 transition-all duration-300 border-b border-gray-800 ${isSticky ? 'bg-gray-950/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
                <div className="container-max px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Categories */}
                        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Year Filter */}
                        <div className="flex items-center space-x-2 bg-gray-900 rounded-lg p-1 border border-gray-800">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${selectedYear === year
                                        ? 'bg-gray-800 text-cyan-400 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid - Infinity Scroll Style */}
            <section className="py-12 min-h-screen overflow-hidden">
                <div className="container-max px-6 h-[150vh]">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                            {[1, 2, 3].map((n) => (
                                <div key={n} className="h-full bg-gray-900 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="text-center py-20">
                            <ImageIcon size={48} className="mx-auto text-gray-700 mb-4" />
                            <p className="text-gray-500 text-lg">No images found for this selection.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden relative">
                            {/* Gradient Masks for Top/Bottom fade */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-950 to-transparent z-20 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent z-20 pointer-events-none"></div>

                            {[0, 1, 2].map((colIndex) => {
                                // Distribute images into 3 columns
                                const colImages = filteredImages.filter((_, i) => i % 3 === colIndex);
                                // Duplicate for seamless loop - ensure at least 4 items height logic
                                const displayImages = colImages.length < 5 ? [...colImages, ...colImages, ...colImages, ...colImages] : [...colImages, ...colImages];

                                // Alternating direction: Col 1 (Up), Col 2 (Down), Col 3 (Up)
                                const isReverse = colIndex === 1;

                                return (
                                    <div key={colIndex} className="relative h-full overflow-hidden">
                                        <div
                                            className={`flex flex-col space-y-6 ${isReverse ? 'animate-marquee-vertical-reverse' : 'animate-marquee-vertical'} hover:[animation-play-state:paused]`}
                                        >
                                            {displayImages.map((img, idx) => (
                                                <motion.div
                                                    key={`${img._id}-${colIndex}-${idx}`}
                                                    layoutId={`image-${img._id}-${colIndex}-${idx}`}
                                                    className="group relative rounded-2xl overflow-hidden cursor-zoom-in flex-shrink-0"
                                                    onClick={() => setSelectedImageIndex(filteredImages.indexOf(img))}
                                                >
                                                    {/* Glow Effect */}
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>

                                                    <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                                                        <img
                                                            src={img.image.url}
                                                            alt={img.title || 'Gallery'}
                                                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                                            loading="lazy"
                                                        />

                                                        {/* Hover Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                                {img.category && (
                                                                    <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase mb-1 block">
                                                                        {img.category}
                                                                    </span>
                                                                )}
                                                                <h3 className="text-lg font-bold text-white leading-tight">
                                                                    {img.title || 'Untitled'}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <style jsx>{`
                    @keyframes marquee-vertical {
                        0% { transform: translateY(0); }
                        100% { transform: translateY(-50%); }
                    }
                    @keyframes marquee-vertical-reverse {
                        0% { transform: translateY(-50%); }
                        100% { transform: translateY(0); }
                    }
                    .animate-marquee-vertical {
                        animation: marquee-vertical 40s linear infinite;
                    }
                    .animate-marquee-vertical-reverse {
                        animation: marquee-vertical-reverse 40s linear infinite;
                    }
                `}</style>
            </section>

            {/* Immersive Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImageIndex(null)}
                            className="absolute top-6 right-6 p-2 bg-gray-800/50 text-white rounded-full hover:bg-white hover:text-black transition-all z-50"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setPrevImage(); }}
                            className="absolute left-4 p-3 bg-black/50 text-white rounded-full hover:bg-cyan-500 hover:scale-110 transition-all z-50 hidden md:block"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setNextImage(); }}
                            className="absolute right-4 p-3 bg-black/50 text-white rounded-full hover:bg-cyan-500 hover:scale-110 transition-all z-50 hidden md:block"
                        >
                            <ChevronRight size={28} />
                        </button>

                        {/* Main Image Container */}
                        <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12" onClick={() => setSelectedImageIndex(null)}>

                            <motion.img
                                layoutId={`image-${filteredImages[selectedImageIndex]._id}`}
                                src={filteredImages[selectedImageIndex].image.url}
                                alt="Full screen view"
                                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Image Details Panel */}
                            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="inline-block bg-black/60 backdrop-blur-md px-6 py-4 rounded-2xl pointer-events-auto"
                                >
                                    <div className="text-gray-400 text-xs font-mono mb-1">
                                        {String(selectedImageIndex + 1).padStart(2, '0')} / {String(filteredImages.length).padStart(2, '0')}
                                    </div>
                                    <h2 className="text-xl font-bold text-white">
                                        {filteredImages[selectedImageIndex].title || 'Untitled'}
                                    </h2>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
