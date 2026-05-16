import { Project, Testimonial, ProjectCategory } from './types';

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Luxury Residential Projects',
        category: 'Residential',
        description: 'We specialize in a range of residential projects including luxury villas, and 2, 3, and 4 BHK flats. This project is a stunning blend of minimalist design and luxurious comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
        ],
        dimensions: '6,500 sq ft',
        materials: ['Italian Marble', 'Oak Wood', 'Brass Fittings'],
        style: 'Modern Minimalist',
        budgetRange: '₹40L - ₹60L',
        completionDate: '2023-08-15'
    },
    {
        id: 2,
        title: 'Hotel, Cafe & Restaurant Design',
        category: 'Hotel',
        description: 'A majestic hotel lobby designed to create a lasting first impression with double-height ceilings and bespoke chandeliers.',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542314831-c6a4d14d837e?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '12,000 sq ft',
        materials: ['Travertine Stone', 'Velvet Upholstery', 'Gold Leaf Accents'],
        style: 'Classic Luxury',
        budgetRange: '₹80L - ₹1.2Cr',
        completionDate: '2024-01-20'
    },
    {
        id: 3,
        title: 'Authentic Indian Restaurant',
        category: 'Restaurant',
        description: 'A vibrant and culturally rich dining experience, inspired by the traditions of India with a modern twist.',
        imageUrl: 'https://images.unsplash.com/photo-1599227294324-3537c14a2a14?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1599227294324-3537c14a2a14?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '2,500 sq ft',
        materials: ['Teak Wood', 'Hand-painted Tiles', 'Brass Lamps'],
        style: 'Modern Indian Ethnic',
        budgetRange: '₹15L - ₹30L',
        completionDate: '2023-05-10'
    },
    {
        id: 4,
        title: 'Gourmet Chef\'s Kitchen',
        category: 'Kitchen',
        description: 'A state-of-the-art kitchen designed for a culinary enthusiast, featuring professional-grade appliances and smart storage solutions.',
        imageUrl: 'https://images.unsplash.com/photo-1600585152225-3579fe9d7ae2?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1600585152225-3579fe9d7ae2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '400 sq ft',
        materials: ['Quartz Countertops', 'Walnut Cabinetry', 'Stainless Steel'],
        style: 'Contemporary',
        budgetRange: '₹6L - ₹10L',
        completionDate: '2023-11-30'
    },
    {
        id: 5,
        title: 'Seaside Commercial Complex',
        category: 'Civil Construction',
        description: 'A multi-purpose commercial building featuring robust architecture designed to withstand coastal weather conditions.',
        imageUrl: 'https://images.unsplash.com/photo-1581134080913-9118a1a814d2?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1581134080913-9118a1a814d2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
        ],
        dimensions: '50,000 sq ft',
        materials: ['Reinforced Concrete', 'Corrosion-Resistant Steel', 'Impact Glass'],
        style: 'Functional Modern',
        budgetRange: '₹4Cr+',
        completionDate: '2022-12-01'
    },
    {
        id: 6,
        title: 'Penthouse Apartment, Downtown',
        category: 'Residential',
        description: 'An urban sanctuary with breathtaking city views, blending sophisticated decor with smart home technology.',
        imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '3,200 sq ft',
        materials: ['Polished Concrete', 'Leather', 'Smoked Glass'],
        style: 'Urban Chic',
        budgetRange: '₹30L - ₹50L',
        completionDate: '2024-03-01'
    },
    {
        id: 7,
        title: 'Boutique Hotel "The Onyx"',
        category: 'Hotel',
        description: 'A boutique hotel that offers a unique, art-deco inspired experience for its guests, with custom furniture in every room.',
        imageUrl: 'https://images.unsplash.com/photo-1590447158034-69a47c77c6fc?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1590447158034-69a47c77c6fc?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '25,000 sq ft',
        materials: [' terrazzo flooring', 'Plush Fabrics', 'Art Deco Lighting'],
        style: 'Art Deco Revival',
        budgetRange: '₹1.5Cr - ₹2.5Cr',
        completionDate: '2023-09-22'
    },
    {
        id: 8,
        title: 'Rooftop Bar "Skyline"',
        category: 'Restaurant',
        description: 'An open-air rooftop bar with a focus on natural elements and comfortable lounge seating for a relaxed atmosphere.',
        imageUrl: 'https://images.unsplash.com/photo-1542648821-20935824b423?q=80&w=800&auto=format&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1542648821-20935824b423?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=1200&auto=format&fit=crop'
        ],
        dimensions: '4,000 sq ft',
        materials: ['Teak Wood Decking', 'Outdoor Performance Fabrics', 'LED strip lighting'],
        style: 'Modern Organic',
        budgetRange: '₹25L - ₹40L',
        completionDate: '2024-05-18'
    }
];

export const CATEGORIES: ProjectCategory[] = ['Residential', 'Hotel', 'Restaurant', 'Kitchen', 'Civil Construction'];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: 'Aarav Sharma',
        location: 'Mumbai, India',
        comment: 'NAYA LUXE transformed our villa into a masterpiece. Their attention to detail and commitment to quality is unparalleled. Every corner of our home now reflects elegance and sophistication.',
        imageUrl: 'https://picsum.photos/seed/client1/100/100'
    },
    {
        id: 2,
        name: 'Priya Patel',
        location: 'Bengaluru, India',
        comment: 'Working with the NAYA LUXE team was a seamless experience. They listened to our vision for our restaurant and brought it to life with incredible creativity and professionalism. Highly recommended!',
        imageUrl: 'https://picsum.photos/seed/client2/100/100'
    },
    {
        id: 3,
        name: 'Sameer Khan',
        location: 'Hyderabad, India',
        comment: 'The budget calculator was an amazing tool that helped us plan, and the final result exceeded all our expectations. Our new kitchen is both beautiful and functional. Thank you, NAYA LUXE!',
        imageUrl: 'https://picsum.photos/seed/client3/100/100'
    }
];