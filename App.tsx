
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import { SERVICES, TESTIMONIALS, CONTACT_INFO, DR_BIO, CONDITIONS, FAQS, OFFICE_HIGHLIGHTS, ABOUT_IMAGE } from './constants';

// --- SUB-COMPONENTS ---

const Hero: React.FC<{ onBookClick: () => void; onNavigate: (id: string) => void }> = ({ onBookClick, onNavigate }) => (
  <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a1120]">
    {/* PRIMARY BACKGROUND IMAGE: HIGH-VISIBILITY GLOWING SPINE */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://www.innovationnewsnetwork.com/wp-content/uploads/2022/04/Human-Spine.jpg"
        alt="Chiropractic Spine and Nervous System"
        className="w-full h-full object-cover"
        style={{ opacity: 1 }}
        loading="eager"
        referrerPolicy="no-referrer"
      />
      {/* Subtle Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-[#0a1120]/40"></div>
    </div>
    
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/10 backdrop-blur-xl border border-blue-400/20 rounded-full mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse shadow-[0_0_15px_rgba(195,106,61,1)]"></div>
          <span className="text-white text-[10px] font-bold uppercase tracking-[0.45em] font-heading">Now Accepting New Patients in Sedona</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-[120px] font-black text-white mb-6 tracking-tighter uppercase leading-[0.9] md:leading-[0.85] font-heading drop-shadow-[0_10px_60px_rgba(0,0,0,0.9)]">
          Red Rock <br />
          <span className="text-terracotta drop-shadow-[0_0_50px_rgba(195,106,61,0.8)]">Chiropractic</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-white/95 mb-12 max-w-2xl leading-relaxed font-sans font-medium drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
          Evidence-based spinal care designed to restore movement and eliminate pain at the source.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5">
          <button 
            onClick={onBookClick}
            className="group relative overflow-hidden bg-terracotta text-white px-12 py-7 rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(195,106,61,0.5)] transition-all hover:translate-y-[-4px] active:scale-95"
          >
            <span className="relative z-10 uppercase tracking-[0.2em]">Schedule Consultation</span>
            <div className="absolute inset-0 bg-[#0a1120] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button 
            onClick={() => onNavigate('services')}
            className="px-12 py-7 rounded-2xl border-2 border-white/20 text-white font-black text-lg uppercase tracking-[0.2em] backdrop-blur-md hover:bg-white hover:text-charcoal transition-all active:scale-95"
          >
            Explore Services
          </button>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
      <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Scroll</span>
      <i className="fa-solid fa-chevron-down"></i>
    </div>
  </section>
);

const About: React.FC = () => (
  <section id="about" className="py-32 bg-offwhite">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-charcoal rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/d/13pNgEx-nZskTT7AL99vz4TcT47cXgicr" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Dr. Steven Cox"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[3rem] shadow-2xl border border-sage/10 hidden md:block">
            <p className="font-black text-6xl text-terracotta mb-1 font-heading">20+</p>
            <p className="font-bold text-xs uppercase tracking-[0.2em] text-charcoal/40 leading-tight">Years of Clinical<br/>Expertise</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h4 className="text-terracotta font-black text-xs uppercase tracking-[0.6em] mb-4">The Practitioner</h4>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-charcoal leading-none tracking-tighter uppercase font-heading mb-6">
              Dr. Steven <span className="block opacity-20">Cox, DC</span>
            </h2>
            <p className="text-lg md:text-xl text-charcoal/60 leading-relaxed font-sans max-w-xl">
              {DR_BIO.history}
            </p>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-sage/5">
            <p className="text-2xl text-charcoal serif-text italic leading-relaxed relative z-10">
              "{DR_BIO.philosophy}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DR_BIO.credentials.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-3xl bg-white border border-sage/10">
                <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-check text-sage text-sm"></i>
                </div>
                <span className="font-bold text-[11px] uppercase tracking-wider text-charcoal/70 pt-2">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection: React.FC<{ onBookClick: () => void }> = ({ onBookClick }) => (
  <section id="services" className="py-20 md:py-32 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-6xl relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
        <div className="max-w-2xl">
          <h4 className="text-terracotta font-black text-xs uppercase tracking-[0.6em] mb-4">Our Methodology</h4>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-charcoal uppercase tracking-tighter font-heading">Specialized Care</h2>
        </div>
        <button onClick={onBookClick} className="text-charcoal font-black uppercase tracking-widest text-xs border-b-2 border-terracotta pb-2 hover:text-terracotta transition-colors">
          View All Procedures
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {SERVICES.map((s) => (
          <div key={s.id} className="group bg-offwhite p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] hover:bg-charcoal hover:text-white transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-terracotta rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl mb-8 md:mb-10 group-hover:bg-terracotta group-hover:text-white transition-colors">
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-heading mb-4">{s.name}</h3>
              <p className="text-charcoal/50 group-hover:text-white/50 text-base md:text-lg leading-relaxed mb-8 md:mb-12">{s.description}</p>
            </div>
            <button onClick={onBookClick} className="w-fit flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
              <span>Reserve Session</span>
              <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Specialties: React.FC = () => (
  <section id="conditions" className="py-20 md:py-32 bg-charcoal text-white">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="text-center mb-16 md:mb-24">
        <h4 className="text-terracotta font-black text-xs uppercase tracking-[0.6em] mb-6">Clinical Expertise</h4>
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter font-heading">What We Treat</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
        {CONDITIONS.map((c, i) => (
          <div key={i} className="bg-charcoal p-8 md:p-12 hover:bg-white/5 transition-colors group">
            <h3 className="text-xl font-black mb-4 uppercase tracking-tight font-heading group-hover:text-terracotta transition-colors">{c.name}</h3>
            <p className="text-sm text-white/40 leading-relaxed font-medium">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NewPatientsSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <section id="new-patients" className="py-32 bg-offwhite">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h4 className="text-terracotta font-black text-xs uppercase tracking-[0.6em] mb-4">The Experience</h4>
            <h2 className="text-4xl md:text-7xl font-black text-charcoal mb-10 uppercase tracking-tighter font-heading">Your First <br/>Visit</h2>
            
            <div className="space-y-8">
              <div className="flex gap-8 items-start">
                <span className="text-6xl font-black text-terracotta/20 font-heading leading-none">01</span>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight font-heading mb-2">Discovery</h4>
                  <p className="text-charcoal/50 leading-relaxed">A comprehensive assessment of your clinical history and current physiology.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="text-6xl font-black text-terracotta/20 font-heading leading-none">02</span>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight font-heading mb-2">Implementation</h4>
                  <p className="text-charcoal/50 leading-relaxed">Your first precision adjustment combined with a targeted recovery roadmap.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter font-heading mb-8">Patient Intelligence</h3>
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-sage/5">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-8 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-lg text-charcoal group-hover:text-terracotta font-heading tracking-tight">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-sage/20 flex items-center justify-center transition-all ${openFaq === i ? 'bg-terracotta text-white' : ''}`}>
                    <i className={`fa-solid ${openFaq === i ? 'fa-minus' : 'fa-plus'} text-[10px]`}></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-8 text-charcoal/60 text-base serif-text italic pt-2 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection: React.FC = () => (
  <section id="testimonials" className="py-32 bg-white">
    <div className="container mx-auto px-6">
      <div className="flex overflow-x-auto pb-12 gap-8 no-scrollbar snap-x">
        {TESTIMONIALS.map(t => (
          <div key={t.id} className="min-w-[350px] md:min-w-[500px] bg-offwhite p-16 rounded-[4rem] snap-center">
            <div className="flex gap-1 text-terracotta mb-10">
              {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-xs"></i>)}
            </div>
            <p className="serif-text italic text-3xl leading-snug mb-10 text-charcoal">"{t.text}"</p>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-charcoal flex items-center justify-center text-white font-black text-xs">{t.author.charAt(0)}</div>
              <p className="font-black text-charcoal/30 uppercase tracking-[0.4em] text-[10px] font-heading">{t.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section id="contact" className="py-20 md:py-32 bg-offwhite border-t border-sage/10">
    <div className="container mx-auto px-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
        <div>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-charcoal uppercase tracking-tighter leading-none font-heading mb-8 md:mb-12">VISIT OUR <br/>OFFICE</h2>
          
          <div className="space-y-8 md:space-y-12">
            <div className="flex gap-6 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-xl md:text-2xl text-terracotta shadow-sm shrink-0"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <p className="text-lg md:text-xl font-bold text-charcoal font-heading tracking-tight mb-1">{CONTACT_INFO.address}</p>
                <p className="text-terracotta font-bold italic serif-text text-sm md:text-base">{CONTACT_INFO.locationDetail}</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-xl md:text-2xl text-terracotta shadow-sm shrink-0"><i className="fa-solid fa-phone"></i></div>
              <div>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-2xl sm:text-3xl md:text-5xl font-black text-charcoal hover:text-terracotta transition-colors font-heading tracking-tighter leading-none block mb-2">{CONTACT_INFO.phone}</a>
                <p className="text-charcoal/30 text-[10px] md:text-xs font-black uppercase tracking-widest">Fax: {CONTACT_INFO.fax}</p>
              </div>
            </div>

            <div className="flex gap-6 md:gap-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-xl md:text-2xl text-terracotta shadow-sm shrink-0"><i className="fa-solid fa-envelope"></i></div>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-lg md:text-3xl font-black text-charcoal hover:text-terracotta transition-colors font-heading tracking-tight pt-2 md:pt-3 break-all">
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <div className="bg-charcoal p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] text-white">
          <h4 className="text-terracotta font-black text-xs uppercase tracking-[0.6em] mb-8 md:mb-12">Clinical Schedule</h4>
          <div className="space-y-6 md:space-y-8">
            {CONTACT_INFO.hours.map((h, i) => (
              <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/40">{h.days}</span>
                <span className="text-lg md:text-xl font-bold font-heading">{h.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 md:mt-20 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10">
            <p className="text-terracotta font-black text-xs md:text-sm uppercase tracking-widest mb-3">Instant Care • WALK-INS WELCOMED</p>
            <p className="text-white/60 leading-relaxed font-sans text-xs">We provide immediate clinical triage for acute pain conditions. Our office welcomes walk-in patients for urgent clinical needs during regular hours.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'conditions', 'new-patients', 'testimonials', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActivePage(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite text-charcoal font-sans selection:bg-terracotta/20">
      <Header activePage={activePage} onNavigate={handleNavigate} onBookClick={() => setIsBookingOpen(true)} />
      
      <main>
        <Hero onBookClick={() => setIsBookingOpen(true)} onNavigate={handleNavigate} />
        <About />
        
        {/* Highlight Stats */}
        <section className="bg-white py-20 border-y border-sage/10">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-y-20">
              {OFFICE_HIGHLIGHTS.map((h, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="text-terracotta text-4xl mb-6"><i className={`fa-solid ${h.icon}`}></i></div>
                  <h3 className="text-xl font-black uppercase tracking-tight font-heading mb-3">{h.title}</h3>
                  <p className="text-charcoal/50 text-sm leading-relaxed max-w-[250px]">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesSection onBookClick={() => setIsBookingOpen(true)} />
        <Specialties />
        <NewPatientsSection />
        <TestimonialsSection />
        <Contact />
      </main>

      <footer className="bg-charcoal pt-40 pb-20 text-white/10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <div className="text-center md:text-left">
              <span className="text-3xl font-black text-white uppercase tracking-tighter block font-heading">DR. STEVEN COX</span>
              <span className="text-[10px] font-bold text-terracotta uppercase tracking-[0.6em]">Red Rock Chiropractic Sedona</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              <button onClick={() => handleNavigate('home')} className="hover:text-terracotta transition-colors">Home</button>
              <button onClick={() => handleNavigate('about')} className="hover:text-terracotta transition-colors">About</button>
              <button onClick={() => handleNavigate('services')} className="hover:text-terracotta transition-colors">Services</button>
              <button onClick={() => handleNavigate('contact')} className="hover:text-terracotta transition-colors">Contact</button>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
            <p className="text-[9px] uppercase tracking-widest text-center md:text-left leading-relaxed">
              © {new Date().getFullYear()} Red Rock Chiropractic. Licensed Doctor of Chiropractic, Arizona State Board.
            </p>
            <p className="text-[9px] uppercase tracking-widest text-center md:text-right leading-relaxed max-w-sm">
              All healthcare information provided is intended for educational purposes and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default App;
