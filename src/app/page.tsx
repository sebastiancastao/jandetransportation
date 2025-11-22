'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, CheckCircle } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  // Removed parallax scroll for transport theme
  const [lang, setLang] = useState<'en' | 'es'>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('lang') as 'en' | 'es') || 'en';
  });

  const t = lang === 'en'
    ? {
        services: 'Services',
        about: 'About',
        fleet: 'Fleet',
        contact: 'Contact',
        getQuote: 'Request Quote',
        startNow: 'Request a Quote',
        viewServices: 'Our Services',
      }
    : {
        services: 'Servicios',
        about: 'Nosotros',
        fleet: 'Flota',
        contact: 'Contacto',
        getQuote: 'Solicitar Cotización',
        startNow: 'Solicitar Cotización',
        viewServices: 'Nuestros Servicios',
      };

  const navLinks = [
    { id: 'services', label: t.services },
    { id: 'fleet', label: t.fleet },
    { id: 'about', label: t.about },
    { id: 'contact', label: t.contact },
  ];

  // Removed parallax variables

  // Contact form hook
  const {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    handleSubmit
  } = useContactForm();

  useEffect(() => {
    setMounted(true);
    try { localStorage.setItem('lang', lang); } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden"
         style={{
           paddingTop: '6rem',
           scrollPadding: '5rem'
         }}>
      {/* Background */}
      <div className="fixed inset-0 space-background" />



      {/* Remove parallax star layers for a cleaner business theme */}

      {/* Top Contact Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm">
          <span className="font-semibold">
            {lang === 'en' ? 'Estimate Contact Us Today!' : '¡Contáctenos hoy para una cotización!'}
          </span>
          <a
            href="mailto:service@jandeexpresstransportation.com"
            className="hover:text-[#6B9FBF] transition-colors"
          >
            service@jandeexpresstransportation.com
          </a>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-12 left-0 right-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="nav-logo flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              
              <div className="logo" aria-label="J&E Express Transportations">
                <Image
                  src="/IMAGEN 12.png"
                  alt="J&E Express Transportations"
                  width={160}
                  height={48}
                  className="h-12 w-auto"
                  priority
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2 ml-auto">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="nav-link transition-all duration-300"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="nav-cta ml-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.getQuote}
              </motion.a>
              {/* Language Toggle */}
              <div className="ml-4 flex items-center gap-1 rounded-full bg-slate-100 p-1 border border-slate-200">
                <button
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${lang==='en' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang==='en'}
                >EN</button>
                <button
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${lang==='es' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                  onClick={() => setLang('es')}
                  aria-pressed={lang==='es'}
                >ES</button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Language Toggle Mobile */}
              <div className="flex items-center gap-1 rounded-full bg-slate-100 p-0.5 border border-slate-200">
                <button
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${lang==='en' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600'}`}
                  onClick={() => setLang('en')}
                  aria-pressed={lang==='en'}
                >EN</button>
                <button
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${lang==='es' ? 'bg-[#0f172a] text-white shadow-sm' : 'text-slate-600'}`}
                  onClick={() => setLang('es')}
                  aria-pressed={lang==='es'}
                >ES</button>
              </div>
              <motion.button
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                  <div className="w-full h-0.5 bg-slate-700 rounded"></div>
                  <div className="w-full h-0.5 bg-slate-700 rounded"></div>
                  <div className="w-full h-0.5 bg-slate-700 rounded"></div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-spacing relative min-h-[80vh] flex items-center justify-center z-10 py-20 md:py-32">
        <div className="content-container text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-card card-padding-xl rounded-3xl mx-auto max-w-6xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
          >
            {/* Animated engagement elements */}
            <motion.div
              className="pointer-events-none absolute -top-10 right-6 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-500/20 to-blue-700/20 blur-2xl"
              animate={{ x: [0, 18, -12, 0], y: [0, -14, 8, 0], rotate: [0, 12, -10, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-gradient-to-tr from-blue-300/20 via-sky-300/20 to-blue-500/20 blur-xl"
              animate={{ x: [0, -10, 6, 0], y: [0, 8, -6, 0], scale: [1, 1.06, 0.98, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <motion.div
              className="pointer-events-none absolute top-6 left-1/2 w-1.5 h-1.5 bg-white/70 rounded-full"
              animate={{ y: [0, -6, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.h1
              className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="hero-title-gradient block">
                {lang === 'en' ? 'J&E Express Transportations' : 'J&E Express Transportations'}
              </span>
            </motion.h1>

            <motion.p
              className="hero-description text-sm sm:text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-normal break-words mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="hero-description-line block text-[#64748b]">
                {lang === 'en'
                  ? 'We are a transportation and logistics company headquartered in New Jersey. Our goal is to provide fast and efficient logistics solutions to our clients. We specialize in handling maritime container transportation services along the Northeastern coast of the United States.'
                  : 'Somos una empresa de transporte y logística con sede en Nueva Jersey. Nuestro objetivo es proporcionar soluciones logísticas rápidas y eficientes a nuestros clientes. Nos especializamos en el manejo de servicios de transporte de contenedores marítimos a lo largo de la costa noreste de los Estados Unidos.'}
              </span>
            </motion.p>

            {/* Hero Images */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/IMAGEN 1.png"
                  alt="J&E Express Transportation Services"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-72 object-cover"
                />
              </motion.div>
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/IMAGEN 2(1).png"
                  alt="Maritime Container Transportation"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-72 object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <motion.a
                href="#contact"
                className="btn-primary rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.startNow}
              </motion.a>
              <motion.a
                href="#services"
                className="btn-secondary rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.viewServices}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-[#0f172a]/60 w-6 h-6" />
        </motion.div>
      </section>

      {/* Service Section */}
      <section id="fleet" className="section-spacing relative min-h-[60vh] flex items-center justify-center z-10 py-16 md:py-24">
        <div className="content-container w-full px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#475569]">
              {lang === 'en' ? 'Service' : 'Servicio'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto"
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/IMAGEN 3.png"
                alt="J&E Express Transportation Services"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-spacing relative min-h-screen flex items-center justify-center z-10 py-16 md:py-24">
        <div className="content-container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#475569] leading-tight mb-6"
            >
              {lang === 'en'
                ? 'Transportation Services - Overland Transportation - Transload - Import'
                : 'Transportation Services - Overland Transportation - Transload - Import'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#64748b] max-w-4xl mx-auto leading-relaxed font-normal mt-4"
            >
              {lang === 'en' ? 'Flexible, insured, and compliant logistics tailored to your operation.' : 'Logística flexible, asegurada y en cumplimiento para tu operación.'}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {[
              { src: '/IMAGEN%204.png', alt: 'Overland transportation equipment' },
              { src: '/IMAGEN%205.png', alt: 'Transload operation in progress' },
              { src: '/IMAGEN%206.png', alt: 'Import logistics handling' }
            ].map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative overflow-hidden rounded-2xl shadow-lg"
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover min-h-[180px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Service cards removed per request */}
        </div>
      </section>

      {/* Export - Freight Services Section */}
      <section className="section-spacing relative min-h-[60vh] flex items-center justify-center z-10 py-16 md:py-24">
        <div className="content-container w-full px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#475569] leading-tight">
              {lang === 'en' ? 'Export - Freight Services' : 'Exportación - Servicios de Carga'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {[
              { src: '/IMAGEN 7.png', alt: 'Export Services' },
              { src: '/IMAGEN 8.png', alt: 'Freight Services' }
            ].map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 60, x: index === 0 ? -30 : 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative overflow-hidden rounded-2xl shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-80 md:h-96 lg:h-[28rem] object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-spacing relative min-h-[60vh] flex items-center justify-center z-10 py-16 md:py-24 bg-white">
        <div className="content-container w-full px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#475569]">
              {lang === 'en' ? 'Why choose J&E Transportation LLC' : '¿Por qué elegir J&E Transportation LLC?'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
            {[
              {
                src: '/IMAGEN 9.png',
                title: lang === 'en' ? 'Efficient Transportation' : 'Transporte Eficiente',
                bgColor: 'bg-black',
                textColor: 'text-white'
              },
              {
                src: '/IMAGEN 10.png',
                title: lang === 'en' ? 'Safe and Secure' : 'Seguro y Confiable',
                bgColor: 'bg-[#6B9FBF]',
                textColor: 'text-white'
              },
              {
                src: '/IMAGEN 11.png',
                title: lang === 'en' ? 'Expert Logistics Team' : 'Equipo de Logística Experto',
                bgColor: 'bg-white',
                textColor: 'text-black'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="flex flex-col shadow-lg rounded-lg overflow-hidden"
              >
                {/* Header Box */}
                <div className={`${item.bgColor} ${item.textColor} py-8 px-8 flex items-center justify-center min-h-[120px]`}>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-center leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Icon/Image Box */}
                <div className="bg-white py-16 px-8 flex items-center justify-center min-h-[320px]">
                  <div className="relative w-full max-w-[280px]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-spacing relative flex items-center justify-center z-10 py-16 md:py-24" style={{ minHeight: '80vh' }}>
        <div className="content-container w-full px-4 sm:px-6">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#475569] text-left">
              {lang === 'en' ? 'Contact' : 'Contacto'}
            </h2>
          </motion.div>

          {/* Two Column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto shadow-2xl rounded-lg overflow-hidden"
          >
            {/* Left Column - Blue Box */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-[#6B9FBF] p-12 lg:p-16 xl:p-20 flex flex-col justify-center items-start text-white"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
              >
                {lang === 'en' ? 'Get Your Free Quote' : 'Obtén Tu Cotización Gratis'}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="text-lg lg:text-xl font-medium opacity-95"
              >
                {lang === 'en' ? "We'll get back to you within 48 hours!" : '¡Te responderemos en 48 horas!'}
              </motion.p>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white p-10 lg:p-14 xl:p-16"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name & Last Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                      {lang === 'en' ? 'FIRST NAME' : 'NOMBRE'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={lang === 'en' ? 'Add your name' : 'Agrega tu nombre'}
                      className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent text-[#475569]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                      {lang === 'en' ? 'LAST NAME' : 'APELLIDO'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={lang === 'en' ? 'Add your name' : 'Agrega tu apellido'}
                      className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent text-[#475569]"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                    {lang === 'en' ? 'PHONE' : 'TELÉFONO'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? 'Phone' : 'Teléfono'}
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent text-[#0f172a]"
                    disabled={isSubmitting}
                  />
                  </div>
                </motion.div>

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="companyName" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                    {lang === 'en' ? 'COMPANY NAME' : 'NOMBRE DE EMPRESA'}
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? 'Add your name' : 'Agrega el nombre de tu empresa'}
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent text-[#0f172a]"
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                    {lang === 'en' ? 'EMAIL' : 'CORREO ELECTRÓNICO'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? 'Email' : 'Correo electrónico'}
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent text-[#0f172a]"
                    required
                    disabled={isSubmitting}
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-xs font-semibold text-[#64748b] mb-3 uppercase tracking-wide">
                    {lang === 'en' ? 'MESSAGE' : 'MENSAJE'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={lang === 'en' ? 'Message' : 'Mensaje'}
                    className="w-full px-4 py-3.5 border border-slate-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#6B9FBF] focus:border-transparent resize-none text-[#475569]"
                    rows={5}
                    disabled={isSubmitting}
                  ></textarea>
                </motion.div>

                {/* Status Messages */}
                {submitStatus.type && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {submitStatus.type === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Mail className="w-5 h-5 text-red-600" />
                      )}
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white px-10 py-4 font-semibold text-base hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed rounded-none w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {lang === 'en' ? 'Sending…' : 'Enviando…'}
                    </span>
                  ) : (
                    lang === 'en' ? 'Submit' : 'Enviar'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0f172a] text-white py-12 mt-20">
        <div className="content-container px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} J&E Express LLC. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
