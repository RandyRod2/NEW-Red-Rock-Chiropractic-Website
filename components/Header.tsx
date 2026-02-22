
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';

interface HeaderProps {
  activePage: string;
  onNavigate: (id: string) => void;
  onBookClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate, onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Conditions', id: 'conditions' },
    { name: 'New Patients', id: 'new-patients' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getLinkStyle = (id: string) => {
    const isActive = activePage === id;
    const baseStyle = "text-[10px] font-black uppercase tracking-[0.35em] transition-all duration-300 whitespace-nowrap font-heading py-2";
    
    if (isActive) {
      return `${baseStyle} text-terracotta scale-110`;
    }
    
    return isScrolled ? `${baseStyle} text-charcoal/70 hover:text-terracotta` : `${baseStyle} text-white hover:text-terracotta`;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled 
          ? 'bg-offwhite/95 backdrop-blur-2xl shadow-2xl py-5 border-b border-sage/10' 
          : 'bg-transparent py-10'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={() => handleLinkClick('home')} className="flex items-center group">
          <div className="flex flex-col -space-y-1.5 text-left">
            <span className={`text-2xl sm:text-3xl font-black tracking-tighter uppercase transition-colors duration-500 font-heading ${isScrolled ? 'text-charcoal' : 'text-white'}`}>
              DR. STEVEN COX
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-[0.6em] transition-colors duration-500 font-heading ${isScrolled ? 'text-charcoal/30' : 'text-white/30'}`}>Red Rock Chiropractic</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center space-x-10">
          {navLinks.map(link => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)}
              className={getLinkStyle(link.id)}
            >
              {link.name}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-10">
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className={`font-black text-[11px] tracking-widest flex items-center gap-2 transition-colors duration-500 font-heading ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}
          >
            <i className="fa-solid fa-phone text-terracotta text-sm"></i>
            {CONTACT_INFO.phone}
          </a>
          <button 
            onClick={onBookClick}
            className="bg-terracotta hover:bg-charcoal text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all transform hover:scale-105 active:scale-95 font-heading"
          >
            Book Visit
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden w-14 h-14 rounded-2xl flex items-center justify-center transition-all z-[110] relative ${
            isScrolled || mobileMenuOpen ? 'text-charcoal bg-sage/5' : 'text-white bg-white/10'
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl transition-transform duration-500 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 w-full h-screen bg-offwhite z-[90] p-10 flex flex-col pt-36 transition-all duration-700 ease-in-out transform ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col space-y-8 mb-auto">
          {navLinks.map((link, index) => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 75}ms` : '0ms' }}
              className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-left transition-all duration-500 transform font-heading ${
                mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              } ${activePage === link.id ? 'text-terracotta pl-6 sm:pl-8 border-l-4 sm:border-l-8 border-terracotta' : 'text-charcoal/30 hover:text-charcoal'}`}
            >
              {link.name}
            </button>
          ))}
        </nav>
        
        <div 
          className={`pt-12 border-t border-sage/10 flex flex-col space-y-10 shrink-0 transition-all duration-700 delay-500 transform ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="space-y-3">
            <p className="text-[10px] font-black text-charcoal/20 uppercase tracking-[0.6em] font-heading">Red Rock Chiropractic Office</p>
            <a href={`tel:${CONTACT_INFO.phone}`} className="text-3xl sm:text-5xl font-black text-terracotta tracking-tighter font-heading hover:scale-105 transition-transform inline-block origin-left">
              {CONTACT_INFO.phone}
            </a>
          </div>
          <button 
            onClick={() => {
              onBookClick();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-charcoal text-white py-10 rounded-[3rem] font-black text-2xl shadow-2xl uppercase tracking-[0.3em] font-heading hover:bg-terracotta transition-all transform active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
