import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Wifi, Database, Shield, Code, Users, BookOpen, Trophy, ArrowRight, Zap, Brain, Network, Lock, Blocks } from 'lucide-react';

const Domains = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const domains = [
    {
      id: 'ml',
      name: 'Machine Learning',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Artificial Intelligence and Neural Networks',
      longDescription: 'Dive deep into the world of artificial intelligence, neural networks, and data science. Learn to build intelligent systems that can learn, adapt, and make decisions.',
      focusAreas: [
        'Deep Learning & Neural Networks',
        'Computer Vision & Image Processing',
        'Natural Language Processing',
        'Reinforcement Learning',
        'Data Science & Analytics',
        'MLOps & Model Deployment'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'OpenCV'],
      projects: ['AI Code Assistant', 'Smart Campus Analytics', 'Predictive Maintenance System'],
      stats: { projects: 15, members: 120, achievements: 8 }
    },
    {
      id: 'iot',
      name: 'Internet of Things',
      icon: Network,
      color: 'from-green-500 to-emerald-500',
      description: 'Connected Devices and Smart Systems',
      longDescription: 'Build the connected world of tomorrow with IoT devices, sensors, and smart systems that revolutionize how we interact with our environment.',
      focusAreas: [
        'Embedded Systems Development',
        'Sensor Networks & Data Collection',
        'Edge Computing & Real-time Processing',
        'Smart Home & Building Automation',
        'Industrial IoT Solutions',
        'Wireless Communication Protocols'
      ],
      technologies: ['Arduino', 'Raspberry Pi', 'ESP32', 'MQTT', 'LoRaWAN', 'Node-RED'],
      projects: ['Smart Campus Network', 'Environmental Monitoring', 'Automated Greenhouse'],
      stats: { projects: 12, members: 85, achievements: 6 }
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      icon: Blocks,
      color: 'from-yellow-500 to-orange-500',
      description: 'Decentralized Applications and Crypto',
      longDescription: 'Explore the revolutionary world of blockchain technology, cryptocurrencies, and decentralized applications that are reshaping digital transactions.',
      focusAreas: [
        'Smart Contract Development',
        'DeFi (Decentralized Finance)',
        'NFTs & Digital Assets',
        'Cryptocurrency & Token Economics',
        'Blockchain Security & Auditing',
        'Web3 & dApp Development'
      ],
      technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'Truffle', 'MetaMask'],
      projects: ['Decentralized Identity System', 'NFT Marketplace', 'DeFi Lending Platform'],
      stats: { projects: 8, members: 65, achievements: 4 }
    },
    {
      id: 'cybersecurity',
      name: 'Cyber Security',
      icon: Lock,
      color: 'from-red-500 to-rose-500',
      description: 'Digital Security and Ethical Hacking',
      longDescription: 'Master the art of digital defense and ethical hacking. Learn to protect systems, networks, and data from cyber threats in our interconnected world.',
      focusAreas: [
        'Penetration Testing & Ethical Hacking',
        'Network Security & Monitoring',
        'Cryptography & Secure Communications',
        'Incident Response & Forensics',
        'Security Awareness & Training',
        'Compliance & Risk Management'
      ],
      technologies: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'OWASP'],
      projects: ['Security Training Platform', 'Vulnerability Scanner', 'Incident Response Tool'],
      stats: { projects: 10, members: 95, achievements: 7 }
    }
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
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-gradient">Domains</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the cutting-edge technology domains that drive our innovation and learning initiatives. 
              Each domain offers unique opportunities for growth and real-world impact.
            </p>
          </motion.div>

          {/* Domain Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { label: 'Active Projects', value: '45+', icon: Code },
              { label: 'Domain Experts', value: '365+', icon: Users },
              { label: 'Learning Paths', value: '24', icon: BookOpen },
              { label: 'Achievements', value: '25+', icon: Trophy }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon size={24} className="text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white code-font">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Domains Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow group hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                >
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${domain.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {domain.name}
                      </h2>
                      <p className="text-gray-400">{domain.description}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: selectedDomain === domain.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight size={20} className="text-gray-500" />
                    </motion.div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 code-font">{domain.stats.projects}</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 code-font">{domain.stats.members}</div>
                      <div className="text-xs text-gray-500">Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 code-font">{domain.stats.achievements}</div>
                      <div className="text-xs text-gray-500">Awards</div>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: selectedDomain === domain.id ? 'auto' : 0, opacity: selectedDomain === domain.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 pt-6 border-t border-gray-800">
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">{domain.longDescription}</p>

                      {/* Focus Areas */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Zap size={18} className="mr-2 text-cyan-400" />
                          Focus Areas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {domain.focusAreas.map((area, areaIndex) => (
                            <div key={areaIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                              <span className="text-gray-400 text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Code size={18} className="mr-2 text-cyan-400" />
                          Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {domain.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Featured Projects */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Trophy size={18} className="mr-2 text-cyan-400" />
                          Featured Projects
                        </h3>
                        <div className="space-y-2">
                          {domain.projects.map((project, projectIndex) => (
                            <div key={projectIndex} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-gray-400 text-sm">{project}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-900/50">
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
                <Cpu size={48} className="text-cyan-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to <span className="text-gradient">Specialize</span>?
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Choose your domain and start your journey in cutting-edge technology. 
                  Join specialized teams, work on real projects, and become an expert in your field.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="btn-primary">
                    Join a Domain
                  </a>
                  <a href="/projects" className="btn-outline">
                    View Projects
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

export default Domains;