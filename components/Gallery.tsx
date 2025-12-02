import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface Project {
    id: string;
    coverImage: string;
    images: string[];
}

const PROJECTS: Project[] = [
    {
        id: 'mercedes-gle',
        coverImage: '/gallery/mercedes-gle/1.png',
        images: [
            '/gallery/mercedes-gle/1.png',
            '/gallery/mercedes-gle/2.png',
            '/gallery/mercedes-gle/3.png',
            '/gallery/mercedes-gle/4.jpg'
        ]
    },
    {
        id: 'ford-ranger',
        coverImage: '/gallery/ford-ranger/1.png',
        images: [
            '/gallery/ford-ranger/1.png',
            '/gallery/ford-ranger/2.png',
            '/gallery/ford-ranger/3.png',
            '/gallery/ford-ranger/4.png',
            '/gallery/ford-ranger/5.png'
        ]
    },
    {
        id: 'lexus-is',
        coverImage: '/gallery/lexus-is/2.png',
        images: [
            '/gallery/lexus-is/2.png',
            '/gallery/lexus-is/1.png',
            '/gallery/lexus-is/3.png',
            '/gallery/lexus-is/4.jpg',
            '/gallery/lexus-is/5.png'
        ]
    },
    {
        id: 'chevy-camaro',
        coverImage: '/gallery/chevy-camaro/1.jpg',
        images: [
            '/gallery/chevy-camaro/1.jpg',
            '/gallery/chevy-camaro/2.jpg',
            '/gallery/chevy-camaro/3.jpg',
            '/gallery/chevy-camaro/4.jpg',
            '/gallery/chevy-camaro/5.jpg'
        ]
    },
    {
        id: 'project-5',
        coverImage: '/gallery/project-5/1.jpg',
        images: [
            '/gallery/project-5/1.jpg'
        ]
    },
    {
        id: 'project-6',
        coverImage: '/gallery/project-6/1.jpg',
        images: [
            '/gallery/project-6/1.jpg',
            '/gallery/project-6/2.jpg'
        ]
    },
    {
        id: 'project-7',
        coverImage: '/gallery/project-7/1.jpg',
        images: [
            '/gallery/project-7/1.jpg',
            '/gallery/project-7/2.jpg',
            '/gallery/project-7/3.jpg',
            '/gallery/project-7/4.jpg',
            '/gallery/project-7/5.jpg'
        ]
    },
    {
        id: 'project-8',
        coverImage: '/gallery/project-8/1.jpg',
        images: [
            '/gallery/project-8/1.jpg',
            '/gallery/project-8/2.jpg',
            '/gallery/project-8/3.jpg'
        ]
    }
];

export const Gallery: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openProject = (project: Project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedProject) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Our Recent Work
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Browse our portfolio of transformed vehicles. From daily drivers to luxury exotics, we treat every car with showroom-level care.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => openProject(project)}
                        >
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-900">
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                                <img
                                    src={project.coverImage}
                                    alt="Gallery Project"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    <div className="bg-black/50 backdrop-blur-sm p-3 rounded-full text-white">
                                        <Camera size={24} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={closeProject}
                    >
                        <button
                            onClick={closeProject}
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50"
                        >
                            <X size={32} />
                        </button>

                        <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
                            <div className="relative w-full aspect-video md:aspect-[16/9] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                    key={currentImageIndex}
                                    src={selectedProject.images[currentImageIndex]}
                                    alt={`Gallery Image ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                />

                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-gold hover:text-black text-white p-2 rounded-full transition-all backdrop-blur-sm"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>

                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-gold hover:text-black text-white p-2 rounded-full transition-all backdrop-blur-sm"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {selectedProject.images.length > 1 && (
                                <div className="mt-4 flex gap-2 overflow-x-auto max-w-full pb-2 px-4">
                                    {selectedProject.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex(idx);
                                            }}
                                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-brand-gold opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                                                }`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
