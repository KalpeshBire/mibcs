import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, MessageCircle, Users, Code, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../utils/api';
import { CLUB_INFO } from '../utils/constants';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await api.post('/contact', data);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: CLUB_INFO.email,
      link: `mailto:${CLUB_INFO.email}`,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: CLUB_INFO.phone,
      link: `tel:${CLUB_INFO.phone}`,
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: CLUB_INFO.address,
      link: null,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', href: CLUB_INFO.social.github, icon: Github, color: 'hover:bg-gray-700' },
    { name: 'LinkedIn', href: CLUB_INFO.social.linkedin, icon: Linkedin, color: 'hover:bg-blue-600' },
    { name: 'Twitter', href: CLUB_INFO.social.twitter, icon: Twitter, color: 'hover:bg-sky-500' },
    { name: 'Instagram', href: CLUB_INFO.social.instagram, icon: Instagram, color: 'hover:bg-pink-600' }
  ];

  const joinBenefits = [
    { icon: Users, text: 'Join 500+ tech enthusiasts' },
    { icon: Code, text: 'Work on real-world projects' },
    { icon: Zap, text: 'Learn cutting-edge technologies' },
    { icon: MessageCircle, text: 'Network with industry experts' }
  ];

  return (
    <div className="page-container bg-gray-950">
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
          <div className="matrix-bg opacity-10"></div>
        </div>

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Ready to join our community or have questions? We'd love to hear from you. 
              Reach out and let's start a conversation about technology and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card-glow">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageCircle size={24} className="mr-3 text-cyan-400" />
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        className="input-field"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="input-field"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="input-field"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      className="input-field"
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Type
                    </label>
                    <select
                      {...register('type')}
                      className="select-field"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="join">Join the Club</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={6}
                      className="input-field resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div className="card-glow">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4 group"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-400">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="card-glow">
                <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className={`flex items-center space-x-3 p-4 bg-gray-800 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 ${social.color}`}
                      >
                        <Icon size={20} className="text-gray-400" />
                        <span className="text-gray-300 font-medium">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Join Info */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Users size={20} className="mr-2 text-cyan-400" />
                    Interested in Joining?
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    We welcome students from all backgrounds who are passionate about technology 
                    and innovation. No prior experience required - just enthusiasm to learn!
                  </p>
                  <div className="space-y-3">
                    {joinBenefits.map((benefit, index) => {
                      const Icon = benefit.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <Icon size={16} className="text-cyan-400" />
                          <span className="text-gray-300 text-sm">{benefit.text}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;