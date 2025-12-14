import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

// Flattening recent projects into a "feed" of images
const INSTAGRAM_FEED = [
    { id: 1, image: '/gallery/mercedes-gle/1.png', likes: 124, comments: 8 },
    { id: 2, image: '/gallery/ford-ranger/1.png', likes: 89, comments: 12 },
    { id: 3, image: '/gallery/lexus-is/1.png', likes: 256, comments: 24 },
    { id: 4, image: '/gallery/chevy-camaro/1.jpg', likes: 145, comments: 18 },
    { id: 5, image: '/gallery/project-7/2.jpg', likes: 92, comments: 6 },
    { id: 6, image: '/gallery/project-8/1.jpg', likes: 178, comments: 14 },
    { id: 7, image: '/gallery/mercedes-gle/3.png', likes: 210, comments: 9 },
    { id: 8, image: '/gallery/ford-ranger/3.png', likes: 134, comments: 11 },
    { id: 9, image: '/gallery/lexus-is/2.png', likes: 167, comments: 22 },
    { id: 10, image: '/gallery/chevy-camaro/2.jpg', likes: 198, comments: 15 },
];

export const Gallery: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Approx item width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="py-20 bg-black border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 flex items-center gap-3">
                        <Instagram className="text-brand-gold" size={32} />
                        Latest from the Shop
                    </h2>
                    <p className="text-slate-400">
                        Follow <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">@burrellnco</a> for daily transformations.
                    </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-gold transition-all duration-300"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-gold transition-all duration-300"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 px-6 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-white hover:bg-white/10 hover:border-brand-gold transition-all duration-300"
                    >
                        <span>View Profile</span>
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            {/* Scrolling Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 px-6 md:px-12 pb-8 scrollbar-hide snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {INSTAGRAM_FEED.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-72 md:w-80 relative group snap-center"
                    >
                        <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 border border-white/5 relative">
                            <img
                                src={post.image}
                                alt="Detailing Work"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <Heart className="fill-white" size={24} />
                                    <span className="font-bold">{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MessageCircle className="fill-white" size={24} />
                                    <span className="font-bold">{post.comments}</span>
                                </div>
                            </div>

                            {/* Instagram Icon watermark */}
                            <div className="absolute top-4 right-4 text-white drop-shadow-lg opacity-80">
                                <Instagram size={20} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
