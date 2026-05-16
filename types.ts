
export type ProjectCategory = 'Residential' | 'Hotel' | 'Restaurant' | 'Kitchen' | 'Civil Construction';

export interface Project {
    id: number;
    title: string;
    category: ProjectCategory;
    description: string;
    imageUrl: string;
    galleryImages?: string[];
    dimensions: string;
    materials: string[];
    style: string;
    budgetRange: string;
    completionDate: string;
}

export interface Testimonial {
    id: number;
    name: string;
    location: string;
    comment: string;
    imageUrl: string;
}
