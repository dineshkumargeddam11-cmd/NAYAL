import React from "react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-yellow-100 text-brand-gold text-xs font-semibold px-2 py-1 rounded-full uppercase mb-2">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-brand-grey mb-2 group-hover:text-brand-gold transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 text-base line-clamp-3">
          {project.description}
        </p>
      </div>
    </div>
  );
};
