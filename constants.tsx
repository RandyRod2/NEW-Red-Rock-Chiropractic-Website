
import { Service, Testimonial } from './types';

// Replace this URL with your own image link
export const ABOUT_IMAGE = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format,compress&fit=crop&q=80&w=2000";

export const SERVICES: Service[] = [
  {
    id: 'spinal-adjustments',
    name: 'Spinal Adjustments',
    description: 'Expert manual and instrument-assisted adjustments to restore proper alignment and optimize nervous system function.',
    price: 65,
    duration: '20 mins',
    icon: 'fa-bone'
  },
  {
    id: 'pain-relief',
    name: 'Back & Neck Pain Relief',
    description: 'Targeted therapy for acute and chronic pain conditions, helping you return to your active Sedona lifestyle.',
    price: 85,
    duration: '30 mins',
    icon: 'fa-user-doctor'
  },
  {
    id: 'sports-injury',
    name: 'Sports Injury Recovery',
    description: 'Care for hikers and mountain bikers. We focus on joint stability and performance optimization.',
    price: 95,
    duration: '45 mins',
    icon: 'fa-person-running'
  },
  {
    id: 'postural-correction',
    name: 'Postural Correction',
    description: 'Long-term solutions for posture-related fatigue and modern posture issues through therapy and education.',
    price: 75,
    duration: '30 mins',
    icon: 'fa-person-rays'
  },
  {
    id: 'wellness-care',
    name: 'Wellness & Preventative Care',
    description: 'Proactive management to maintain mobility and prevent injuries before they start.',
    price: 60,
    duration: '20 mins',
    icon: 'fa-heart-pulse'
  }
];

export const CONDITIONS = [
  { name: 'Lower Back Pain', description: 'Expert clinical care focused on spinal alignment and pressure relief for the lumbar region.' },
  { name: 'Neck Pain & Stiffness', description: 'Gentle adjustments to restore mobility and alleviate tension in the cervical spine.' },
  { name: 'Sciatica', description: 'Correcting pelvic and lumbar misalignments to reduce nerve compression and radiating pain.' },
  { name: 'Tension Headaches', description: 'Upper neck adjustments designed to reduce headache frequency and intensity.' },
  { name: 'Shoulder & Hip Pain', description: 'Ensuring balanced biomechanics in the extremities for healthy movement.' },
  { name: 'Sports Strains', description: 'Recovery protocols for the active trail runners and cyclists of Sedona.' },
  { name: 'Postural Imbalance', description: 'Correcting rounded shoulders and forward head posture to reduce chronic fatigue.' },
  { name: 'Wellness Maintenance', description: 'Routine care to keep your spine healthy and your nervous system responsive.' }
];

export const OFFICE_HIGHLIGHTS = [
  { title: '"No Wait Policy"', desc: 'We value your time; all of our patients are seen immediately upon arrival.', icon: 'fa-hourglass-start' },
  { title: 'All Ages Welcome', desc: 'Expert care for everyone—Dr. Cox has treated patients from 4 days old to 94 years old.', icon: 'fa-people-group' },
  { title: 'Affordable Care', desc: 'Reasonable fees and flexible payment plans for self-pay or high-deductible patients.', icon: 'fa-hand-holding-dollar' },
  { title: 'Insurance Support', desc: 'Most major insurance accepted; we handle all the clinical paperwork for you.', icon: 'fa-file-invoice-dollar' },
  { title: 'Medicare Provider', desc: 'Medicare covers chiropractic care and Dr. Cox is a registered provider.', icon: 'fa-hospital-user' },
  { title: 'Injury Expertise', desc: 'Extensive knowledge of auto and work injuries. Compensation often covers up to 100%.', icon: 'fa-car-burst' }
];

export const FAQS = [
  {
    question: "Do I need a referral to see Dr. Cox?",
    answer: "No, chiropractors are primary contact providers. You can schedule an appointment directly without a referral from a medical doctor."
  },
  {
    question: "Does the adjustment hurt?",
    answer: "Most patients find chiropractic adjustments to be very relieving. Dr. Cox uses precise, gentle techniques refined over 20 years."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major insurance plans including BCBS, Aetna, United Healthcare, and Medicare. We also offer affordable self-pay rates."
  }
];

export const DR_BIO = {
  name: "Dr. Steven Cox, DC",
  title: "Chiropractor in Sedona, Arizona",
  philosophy: "Optimal health is the foundation for an active life, and the preservation of health is our duty.",
  history: "Dr. Steven Cox graduated from Palmer College and has over 20 years of clinical experience. He specializes in precise Palmer and Gonstead adjusting techniques.",
  extendedBio: "Dr. Steven Cox is dedicated to providing the highest degree of family health care. Unlike most practices, we firmly believe that prescribing drugs is not always the way. We take the time to properly diagnose our patients and determine whether or not the patient will benefit from Chiropractic care. We are not afraid to recommend medical treatments and work with local medical clinics as needed to manage care.",
  credentials: [
    "Doctor of Chiropractic, Palmer College-West",
    "Expert in Palmer & Gonstead Techniques",
    "Over 20 Years of Clinical Experience",
    "Sedona Community Member for Decades"
  ]
};

export const CONTACT_INFO = {
  phone: '(928) 282-7646',
  fax: '(928) 282-3493',
  email: 'RedRockChiropractic@live.com',
  address: '2155 West Hwy 89A, Suite 110, Sedona, AZ 86336',
  locationDetail: 'In the Plaza West Mall',
  hours: [
    { days: 'Monday', time: '9:00 AM - 1:00 PM' },
    { days: 'Tuesday', time: 'CLOSED' },
    { days: 'Wednesday', time: '9:00 AM - 1:00 PM' },
    { days: 'Thursday', time: '3:00 PM - 6:00 PM' },
    { days: 'Friday', time: '9:00 AM - 1:00 PM' },
    { days: 'Sat & Sun', time: 'CLOSED' }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', author: 'S. Miller', text: "Dr. Cox is incredible. As a hiker, his care has kept me on the trails pain-free for years.", rating: 5 },
  { id: '2', author: 'J. Reynolds', text: "Professional, knowledgeable, and truly cares. The landmark Plaza West location is very convenient.", rating: 5 },
  { id: '3', author: 'E. Karis', text: "Best chiropractic experience in Northern Arizona. I highly recommend his clinical approach.", rating: 5 },
  { id: '4', author: 'M. Thompson', text: "Finally found a chiropractor who listens. My chronic back pain is gone and I feel 10 years younger!", rating: 5 }
];
