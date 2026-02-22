
import React, { useState, useMemo, useRef } from 'react';
import { SERVICES, CONTACT_INFO } from '../constants';

const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    isNewPatient: ''
  });

  // Helper to get local YYYY-MM-DD string
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Helper to generate time slots
  const generateSlots = (startHour: number, endHour: number) => {
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += 20) {
        const h = hour > 12 ? hour - 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const m = min === 0 ? '00' : min;
        slots.push(`${h}:${m} ${ampm}`);
      }
    }
    return slots;
  };

  // Calculate availability based on the selected date
  const availability = useMemo(() => {
    if (!formData.date) return { isClosed: false, slots: [] };

    // Use specific date parts to avoid timezone offsets
    const [year, month, dayStr] = formData.date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, dayStr);
    const day = selectedDate.getDay(); // 0: Sun, 1: Mon, ... 6: Sat

    switch (day) {
      case 1: // Monday
      case 3: // Wednesday
      case 5: // Friday
        return { 
          isClosed: false, 
          slots: generateSlots(9, 13), // 9 AM to 1 PM
          dayName: ['Monday', 'Wednesday', 'Friday'][day === 1 ? 0 : day === 3 ? 1 : 2]
        };
      case 4: // Thursday
        return { 
          isClosed: false, 
          slots: generateSlots(15, 18), // 3 PM to 6 PM
          dayName: 'Thursday'
        };
      case 2: // Tuesday
        return { isClosed: true, dayName: 'Tuesday' };
      case 0: // Sunday
      case 6: // Saturday
        return { isClosed: true, dayName: day === 0 ? 'Sunday' : 'Saturday' };
      default:
        return { isClosed: false, slots: [] };
    }
  }, [formData.date]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSubmitted(false);
      setFormData({ service: '', date: '', time: '', name: '', email: '', phone: '', isNewPatient: '' });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, date: e.target.value, time: '' });
  };

  // Single source of truth for triggering the native picker
  const triggerPicker = (e: React.MouseEvent) => {
    if (dateInputRef.current && 'showPicker' in HTMLInputElement.prototype) {
      try {
        dateInputRef.current.showPicker();
      } catch (err) {
        console.debug('showPicker failed, falling back to focus');
        dateInputRef.current.focus();
      }
    }
  };

  const isFormIncomplete = !formData.service || !formData.date || !formData.time || availability.isClosed;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-md transition-opacity duration-300"
        onClick={handleClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-offwhite w-full max-w-xl rounded-[2rem] sm:rounded-[4rem] shadow-2xl overflow-hidden transition-all duration-300 scale-100 opacity-100 flex flex-col max-h-[90vh]">
        
        {/* Fixed Header */}
        <div className="bg-sage px-6 sm:px-12 py-6 sm:py-10 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-none">Book Visit</h2>
            <p className="text-white/60 text-[10px] sm:text-sm mt-1 serif-text italic">Clinical Care • Sedona, AZ</p>
          </div>
          <button onClick={handleClose} className="bg-white/10 hover:bg-white/20 p-2 sm:p-4 rounded-full transition-colors">
            <i className="fa-solid fa-xmark text-base sm:text-xl"></i>
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {isSubmitted ? (
            <div className="p-8 sm:p-20 text-center space-y-6 sm:space-y-8 animate-fade-in">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-10">
                <i className="fa-solid fa-check text-2xl sm:text-4xl text-sage"></i>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-charcoal uppercase tracking-tighter font-heading">Thank You!</h3>
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-charcoal/60 leading-relaxed font-medium">
                  Your request for <span className="text-charcoal font-black">{formData.service}</span> has been received.
                </p>
                <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-sage/10 shadow-sm">
                  <p className="text-xs sm:text-sm text-charcoal/40 font-bold uppercase tracking-widest">
                    Expect a call or text from our Sedona office within 24 hours to confirm your appointment.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-full bg-charcoal text-white py-6 rounded-full font-black text-lg shadow-xl hover:bg-terracotta transition-all uppercase tracking-widest"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-12">
            {step === 1 ? (
              <div className="space-y-6 sm:space-y-10">
                <div>
                  <label className="block text-[10px] font-black text-charcoal/40 uppercase tracking-[0.4em] mb-4 sm:mb-6 ml-2">1. Select Therapy</label>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {SERVICES.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({...formData, service: s.name})}
                        className={`text-left p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] border-2 transition-all ${
                          formData.service === s.name 
                            ? 'border-terracotta bg-white shadow-xl scale-[1.01]' 
                            : 'border-transparent bg-white/50 hover:bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-black text-base sm:text-xl ${formData.service === s.name ? 'text-terracotta' : 'text-charcoal'}`}>{s.name}</span>
                          <i className={`fa-solid ${formData.service === s.name ? 'fa-circle-check text-terracotta' : 'fa-circle text-charcoal/10'} text-lg sm:text-2xl transition-colors`}></i>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-charcoal/30 mt-1 sm:mt-2 font-black uppercase tracking-[0.2em]">{s.duration} Specialist Consultation</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-charcoal/40 uppercase tracking-[0.4em] mb-4 ml-2">2. Appointment Date</label>
                    <div className="relative cursor-pointer" onClick={triggerPicker}>
                      <i className="fa-solid fa-calendar-days absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 z-10 pointer-events-none"></i>
                      <input 
                        ref={dateInputRef}
                        type="date" 
                        required
                        min={getTodayString()}
                        value={formData.date}
                        onChange={handleDateChange}
                        onKeyDown={(e) => {
                          // Allow Tab for navigation, but block all typing
                          if (e.key !== 'Tab') e.preventDefault();
                        }}
                        className="w-full p-5 pl-12 rounded-2xl bg-white border-none shadow-inner focus:ring-2 focus:ring-sage outline-none font-bold cursor-pointer relative z-0" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-charcoal/40 uppercase tracking-[0.4em] mb-4 ml-2">3. Clinical Time Slot</label>
                    <select 
                      required
                      disabled={!formData.date || availability.isClosed}
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className={`w-full p-5 rounded-2xl bg-white border-none shadow-inner focus:ring-2 focus:ring-sage outline-none font-bold appearance-none transition-opacity ${(!formData.date || availability.isClosed) ? 'opacity-30' : 'opacity-100'}`}
                    >
                      <option value="">{availability.isClosed ? '---' : 'Choose Slot'}</option>
                      {availability.slots.map((slot, i) => (
                        <option key={i} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {!formData.date && (
                  <p className="text-[9px] text-center font-black text-charcoal/30 uppercase tracking-[0.2em] animate-pulse">
                    Note: Office is closed Tue, Sat & Sun
                  </p>
                )}

                {availability.isClosed && (
                  <div className="bg-terracotta/10 border border-terracotta/20 p-6 rounded-3xl flex items-center gap-4 animate-fade-in">
                    <i className="fa-solid fa-circle-exclamation text-terracotta text-xl"></i>
                    <p className="text-[10px] font-black uppercase tracking-widest text-terracotta leading-tight">
                      We are CLOSED on {availability.dayName}s. <br/>Please select a Mon, Wed, Thu, or Fri.
                    </p>
                  </div>
                )}

                {!availability.isClosed && formData.date && (
                  <p className="text-[10px] text-center font-black text-sage uppercase tracking-widest animate-fade-in">
                    {availability.dayName} Availability Loaded
                  </p>
                )}

                <button 
                  type="button"
                  disabled={isFormIncomplete}
                  onClick={() => setStep(2)}
                  className="w-full bg-charcoal hover:bg-terracotta text-white py-6 rounded-full font-black text-xl shadow-2xl transition-all disabled:opacity-20 uppercase tracking-widest"
                >
                  Continue to Details
                </button>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-10">
                <div className="bg-sage/5 p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-sage/10 relative">
                  <h4 className="font-black text-[10px] text-sage uppercase tracking-[0.3em] mb-2 sm:mb-3">Visit Summary</h4>
                  <p className="font-black text-lg sm:text-2xl text-charcoal uppercase tracking-tighter leading-tight">{formData.service}</p>
                  <p className="text-charcoal/50 font-bold serif-text italic mt-1 text-sm sm:text-base">{formData.date} • {formData.time}</p>
                  <button type="button" onClick={() => setStep(1)} className="absolute top-6 sm:top-10 right-6 sm:right-10 text-terracotta font-black text-[10px] uppercase underline tracking-widest">Change</button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-charcoal/40 uppercase tracking-[0.4em] ml-2">Are you a new patient?</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, isNewPatient: 'yes'})}
                        className={`p-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border-2 ${formData.isNewPatient === 'yes' ? 'border-terracotta bg-white text-terracotta shadow-md' : 'border-transparent bg-white/50 text-charcoal/40'}`}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, isNewPatient: 'no'})}
                        className={`p-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border-2 ${formData.isNewPatient === 'no' ? 'border-terracotta bg-white text-terracotta shadow-md' : 'border-transparent bg-white/50 text-charcoal/40'}`}
                      >
                        No
                      </button>
                    </div>
                    {formData.isNewPatient === 'yes' && (
                      <p className="text-[9px] font-black text-terracotta uppercase tracking-[0.2em] ml-2 animate-pulse">
                        * New patient visits require a full clinical assessment and take longer than regular visits.
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <i className="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20"></i>
                    <input 
                      type="text" 
                      placeholder="Full Patient Name"
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-5 pl-12 rounded-2xl bg-white border-none shadow-inner focus:ring-2 focus:ring-sage outline-none font-bold" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="relative">
                      <i className="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20"></i>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-5 pl-12 rounded-2xl bg-white border-none shadow-inner focus:ring-2 focus:ring-sage outline-none font-bold" 
                      />
                    </div>
                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20"></i>
                      <input 
                        type="tel" 
                        placeholder="Contact Number"
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-5 pl-12 rounded-2xl bg-white border-none shadow-inner focus:ring-2 focus:ring-sage outline-none font-bold" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.isNewPatient}
                  className="w-full bg-terracotta text-white py-8 rounded-full font-black text-xl shadow-2xl hover:scale-[1.01] transition-all uppercase tracking-[0.2em] disabled:opacity-20"
                >
                  Confirm Request
                </button>
              </div>
            )}
          </form>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default BookingModal;
