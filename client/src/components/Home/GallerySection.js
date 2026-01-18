import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../../utils/api';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const GallerySection = () => {
    const { data: images = [], isLoading } = useQuery('gallery-images-public', () =>
        api.get('/gallery').then(res => res.data)
    );

    // If no images or loading, show nothing or skeleton
    if (!isLoading && images.length === 0) return null;

    // Duplicate images content for seamless loop if not enough images
    const displayImages = images.length < 10 ? [...images, ...images, ...images, ...images] : [...images, ...images];

    return (
        <section className="py-24 bg-gray-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

            <div className="container-max mb-12 relative z-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Camera size={20} className="text-cyan-500" />
                        <span className="text-cyan-500 font-bold tracking-wider text-sm uppercase">Moment Captures</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Life at <span className="text-gradient from-cyan-400 to-blue-500">MIBCS</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        A glimpse into our events, workshops, and community gatherings.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden py-8">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-950 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-950 to-transparent z-20 pointer-events-none"></div>

                <div className="flex space-x-6 w-max animate-marquee hover:[animation-play-state:paused]">
                    {displayImages.map((img, idx) => (
                        <div
                            key={`${img._id}-${idx}`}
                            className="relative group w-80 h-64 md:w-[450px] md:h-80 flex-shrink-0"
                        >
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>

                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
                                <img
                                    src={img.image.url}
                                    alt={img.title || 'Gallery'}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                                {img.title && (
                                    <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white text-sm font-medium truncate">{img.title}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default GallerySection;
