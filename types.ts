
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
}

export interface Membership {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating: number;
}
