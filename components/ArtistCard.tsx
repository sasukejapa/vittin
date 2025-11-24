/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Video } from '../types';
import { Play } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col gap-4 cursor-pointer"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#8c4c27] bg-[#264039] shadow-lg">
        <motion.img 
          src={video.thumbnail} 
          alt={video.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="w-12 h-12 rounded-full bg-[#f29849] flex items-center justify-center text-[#264039]">
              <Play fill="currentColor" className="w-5 h-5 ml-1" />
           </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 text-xs font-mono text-[#f29f8d] rounded">
          {video.duration}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-[#507306]/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-white rounded-sm border border-[#507306]">
          {video.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold font-heading text-white leading-tight group-hover:text-[#f29849] transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-[#f29f8d]/80 line-clamp-2">
          {video.description}
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-[#507306]">
          <span>{video.views} views</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;