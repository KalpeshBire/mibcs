import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, BookOpen, Lightbulb, Code, Cpu, Shield, Wifi } from 'lucide-react';
import { CLUB_INFO } from '../utils/constants';

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We foster creative thinking and encourage innovative solutions to real-world problems.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and collaborative learning experiences.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Learning',
      description: 'Continuous learning and skill development are at the core of our mission.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from projects to competitions.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'MIBCS was founded by a group of passionate students interested in emerging technologies.'
    },
    {
      year: '2021',
      title: 'First Hackathon',
      description: 'Organized our first internal hackathon with 50+ participants across all domains.'
    },
    {
      year: '2022',
      title: 'Industry Partnerships',
      description: 'Established partnerships with leading tech companies for mentorship and sponsorship.'
    },
    {
      year: '2023',
      title: 'Research Initiative',
      description: 'Launched collaborative research projects with faculty and industry experts.'
    },
    {
      year: '2024',
      title: 'Expansion',
      description: 'Expanded to 500+ active members and launched multiple successful projects.'
    }
  ];

  const domains = [
    { icon: Cpu, name: 'Machine Learning', desc: 'AI algorithms and neural networks' },
    { icon: Wifi, name: 'Internet of Things', desc: 'Connected devices and smart systems' },
    { icon: Code, name: 'Blockchain', desc: 'Decentralized applications and crypto' },
    { icon: Shield, name: 'Cyber Security', desc: 'Digital security and ethical hacking' }
  ];

  return (
    <div className="page-container bg-gray-950">
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"></div>
          <div className="matrix-bg opacity-10"></div>
        </div>

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="text-gradient">MIBCS</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Machine Learning, IoT, Blockchain & Cyber Security - A premier technology club 
              dedicated to fostering innovation and excellence in cutting-edge domains.
            </p>
            
            {/* Domain badges */}
            <div className="flex flex-wrap justify-center gap-4">
              {domains.map((domain, index) => {
                const Icon = domain.icon;
                return (
                  <motion.div
                    key={domain.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700"
                  >
                    <Icon size={16} className="text-cyan-400" />
                    <span className="text-gray-300 text-sm">{domain.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-900/50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              
              <div className="card-glow">
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  To create a dynamic learning environment where students can explore, 
                  experiment, and excel in emerging technologies. We bridge the gap between 
                  theoretical knowledge and practical application through hands-on projects.
                </p>
                
                <div className="space-y-4">
                  {[
                    'Provide practical, hands-on learning experiences',
                    'Foster innovation and creative problem-solving',
                    'Build strong industry connections and partnerships',
                    'Develop future tech leaders and innovators'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-400">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Eye size={24} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Vision</h2>
              </div>
              
              <div className="card-glow">
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  To be the leading technology community that empowers the next generation 
                  of innovators and leaders. We envision our members becoming pioneers who 
                  drive technological advancement and positive societal impact.
                </p>
                
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 p-6 rounded-xl border border-gray-700">
                  <h3 className="font-semibold text-cyan-400 mb-4 flex items-center">
                    <Code size={18} className="mr-2" />
                    What Sets Us Apart
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      'Multi-disciplinary approach covering four key tech domains',
                      'Strong emphasis on practical project implementation',
                      'Active participation in national and international competitions',
                      'Collaborative research opportunities with faculty',
                      'Regular industry expert sessions and workshops'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-2"
                      >
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Core <span className="text-gradient">Values</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our community culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-900/30">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to becoming a leading tech community - here's our story.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-950 shadow-lg z-10"></div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-glow group hover:scale-105 transition-all duration-300">
                      <div className="text-2xl font-bold text-gradient mb-2 code-font">{item.year}</div>
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-800">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Be Part of Our <span className="text-gradient">Story</span>
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Join MIBCS and contribute to the next chapter of innovation, learning, and technological excellence. 
                  Your journey in tech starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="btn-primary">
                    Join Our Community
                  </a>
                  <a href="/projects" className="btn-outline">
                    Explore Our Work
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;