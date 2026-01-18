import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Github, ExternalLink, Star, ArrowRight, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const FeaturedProjects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { data, isLoading } = useQuery(
        'featured-projects',
        () => api.get('/projects?featured=true&limit=10').then(res => res.data),
        {
            staleTime: 5 * 60 * 1000,
        }
    );

    const featuredProjects = data?.projects || [];
    const itemsPerPage = 3;

    if (isLoading) {
        return (
            <section className="py-20 bg-gray-950">
                <div className="container-max">
                    <div className="flex justify-center">
                        <LoadingSpinner size="lg" />
                    </div>
                </div>
            </section>
        );
    }

    if (featuredProjects.length === 0) {
        return null;
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    const getVisibleProjects = () => {
        // Always return carousel items, even if few
        if (featuredProjects.length === 0) return [];

        const visible = [];
        for (let i = 0; i < itemsPerPage; i++) {
            visible.push(featuredProjects[(currentIndex + i) % featuredProjects.length]);
        }
        return visible;
    };

    const visibleProjects = getVisibleProjects();

    return (
        <section className="py-24 bg-gray-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-purple-900/10 to-transparent"></div>

            <div className="container-max relative z-10 px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-left"
                    >
                        <div className="flex items-center mb-4">
                            <Star size={24} className="text-yellow-500 mr-2" />
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Featured <span className="text-gradient from-cyan-400 to-blue-500">Projects</span>
                            </h2>
                        </div>
                        <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                            Explore the innovative solutions built by our talented community.
                        </p>
                    </motion.div>

                    {/* Navigation Arrows */}
                    {featuredProjects.length > 0 && (
                        <div className="flex space-x-4 mt-6 md:mt-0">
                            <button
                                onClick={handlePrev}
                                className="p-3 rounded-full bg-gray-800/50 border border-gray-700 text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 group"
                            >
                                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-3 rounded-full bg-gray-800/50 border border-gray-700 text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all duration-300 group"
                            >
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Projects Grid / Carousel */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <AnimatePresence mode='wait'>
                        {visibleProjects.map((project, index) => {
                            return (
                                <motion.div
                                    key={`${project._id}-${currentIndex}`} // Force re-render for animation on slide
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group relative h-full flex"
                                >
                                    {/* Glow Effect - Copied from FeaturedEvents */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>

                                    <div className="relative w-full h-[450px] bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group/card">

                                        {/* Project Image - Full Coverage */}
                                        <div className="absolute inset-0 w-full h-full">
                                            {project.images?.[0]?.url ? (
                                                <img
                                                    src={project.images[0].url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                                                    <FolderOpen size={48} />
                                                </div>
                                            )}
                                            {/* Initial Subtle Overlay */}
                                            <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/60 transition-colors duration-500"></div>
                                        </div>

                                        {/* Featured Badge */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                                                <Star size={12} className="mr-1" />
                                                FEATURED
                                            </div>
                                        </div>

                                        {/* Info Overlay - Reveal on Hover */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 translate-y-6 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-y-0 transition-all duration-500 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent">

                                            <div className="transform transition-transform duration-500">
                                                <div className="flex items-center justify-between mb-2">
                                                    {/* Status Badge */}
                                                    <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider ${project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                        project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-400'
                                                        }`}>
                                                        {project.status?.replace('-', ' ')}
                                                    </span>

                                                    {/* Links */}
                                                    <div className="flex space-x-2">
                                                        <a href={project.links?.github || '#'} target={project.links?.github ? "_blank" : "_self"} className="p-2 bg-gray-800/80 rounded-full text-white hover:bg-cyan-500 hover:text-white transition-colors">
                                                            <Github size={16} />
                                                        </a>
                                                        <a href={project.links?.demo || '#'} target={project.links?.demo ? "_blank" : "_self"} className="p-2 bg-gray-800/80 rounded-full text-white hover:bg-cyan-500 hover:text-white transition-colors">
                                                            <ExternalLink size={16} />
                                                        </a>
                                                    </div>
                                                </div>

                                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                                    {project.title}
                                                </h3>

                                                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                                    {project.shortDescription || project.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.techStack?.slice(0, 3).map((tech, i) => (
                                                        <span key={i} className="text-xs text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded flex items-center border border-cyan-500/20">
                                                            <Layers size={10} className="mr-1" />
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <Link
                                                    to={`/projects`}
                                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold tracking-wide flex items-center justify-center group/btn hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 mt-2"
                                                >
                                                    <span>View Project Details</span>
                                                    <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <div className="text-center">
                    <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
                        <span className="border-b border-gray-700 hover:border-white pb-0.5">Explore All Projects</span>
                        <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
