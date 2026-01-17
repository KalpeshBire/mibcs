import { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { ExternalLink, Heart, Users, Award, Building, Search, Filter } from 'lucide-react';
import { api } from '../utils/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Sponsors = () => {
  const [filters, setFilters] = useState({
    tier: '',
    search: ''
  });

  const { data, isLoading } = useQuery(
    'sponsors',
    () => api.get('/sponsors').then(res => res.data)
  );

  // Mock sponsors for demo
  const mockSponsors = [
    {
      _id: '1',
      name: 'TechCorp Solutions',
      description: 'Leading provider of enterprise software solutions and cloud infrastructure.',
      tier: 'platinum',
      website: 'https://techcorp.com',
      logo: { url: '/api/placeholder/200/100' }
    },
    {
      _id: '2',
      name: 'InnovateLabs',
      description: 'Research and development company focused on emerging technologies.',
      tier: 'gold',
      website: 'https://innovatelabs.com',
      logo: { url: '/api/placeholder/200/100' }
    },
    {
      _id: '3',
      name: 'StartupHub',
      description: 'Incubator and accelerator for tech startups and entrepreneurs.',
      tier: 'silver',
      website: 'https://startuphub.com',
      logo: { url: '/api/placeholder/200/100' }
    }
  ];

  const sponsorTiers = [
    { 
      id: 'platinum', 
      name: 'Platinum', 
      color: 'bg-gradient-to-r from-gray-300 to-gray-100 text-gray-800',
      description: 'Premier partners with maximum visibility and benefits'
    },
    { 
      id: 'gold', 
      name: 'Gold', 
      color: 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900',
      description: 'Major supporters with significant partnership benefits'
    },
    { 
      id: 'silver', 
      name: 'Silver', 
      color: 'bg-gradient-to-r from-gray-400 to-gray-300 text-gray-800',
      description: 'Valued partners supporting our mission and growth'
    }
  ];

  const sponsors = data?.sponsors || mockSponsors;
  const filteredSponsors = sponsors.filter(sponsor =>
    sponsor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    sponsor.description.toLowerCase().includes(filters.search.toLowerCase())
  );

  const groupedSponsors = sponsorTiers.reduce((acc, tier) => {
    acc[tier.id] = filteredSponsors.filter(sponsor => sponsor.tier === tier.id);
    return acc;
  }, {});

  const benefits = [
    {
      icon: Heart,
      title: 'Brand Visibility',
      description: 'Get your brand in front of talented tech students and future innovators.'
    },
    {
      icon: Users,
      title: 'Talent Pipeline',
      description: 'Connect with skilled students for internships and full-time opportunities.'
    },
    {
      icon: Award,
      title: 'Innovation Partnership',
      description: 'Collaborate on cutting-edge projects and research initiatives.'
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
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-gradient">Sponsors</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We're grateful to our amazing sponsors who support our mission to foster 
              innovation and excellence in technology education.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="card-glow mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sponsors..."
                  className="input-field pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <select
                className="select-field"
                value={filters.tier}
                onChange={(e) => setFilters(prev => ({ ...prev, tier: e.target.value }))}
              >
                <option value="">All Tiers</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
              </select>
              <button className="btn-outline flex items-center justify-center space-x-2">
                <Filter size={18} />
                <span>More Filters</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Sponsors */}
      {!isLoading && sponsors && sponsors.length > 0 && (
        <section className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Current Sponsors</h2>
              <p className="text-gray-400 text-lg">Thank you to these organizations for their continued support</p>
            </motion.div>

            <div className="space-y-16">
              {sponsorTiers.map((tier) => {
                const tierSponsors = groupedSponsors[tier.id];
                if (!tierSponsors || tierSponsors.length === 0) return null;

                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-center mb-12">
                      <span className={`inline-block px-6 py-3 rounded-full text-lg font-bold ${tier.color} mb-4`}>
                        {tier.name} Sponsors
                      </span>
                      <p className="text-gray-400">{tier.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {tierSponsors.map((sponsor, index) => (
                        <motion.div
                          key={sponsor._id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="card-glow text-center group hover:scale-105 transition-all duration-300"
                        >
                          {sponsor.logo?.url && (
                            <div className="h-24 flex items-center justify-center mb-6 p-4 bg-white rounded-lg">
                              <img
                                src={sponsor.logo.url}
                                alt={sponsor.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          )}
                          
                          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 mb-3">
                            {sponsor.name}
                          </h3>
                          
                          {sponsor.description && (
                            <p className="text-gray-400 mb-6 leading-relaxed">{sponsor.description}</p>
                          )}

                          {sponsor.website && (
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300"
                            >
                              Visit Website
                              <ExternalLink size={16} className="ml-2" />
                            </a>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Why Sponsor Us */}
      <section className="section-padding bg-gray-900/50">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Sponsor MIBCS?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Partner with us to support the next generation of tech innovators while gaining 
              valuable benefits for your organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-glow text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-6 group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Icon size={32} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-gray-800">
                <Building size={48} className="text-cyan-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">Ready to Partner with Us?</h3>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Join our community of sponsors and help us continue fostering innovation 
                  in technology education. Together, we can shape the future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/contact" className="btn-primary">
                    Become a Sponsor
                  </a>
                  <a href="mailto:sponsors@mibcs.com" className="btn-outline">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {filteredSponsors.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={32} className="text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg">No sponsors found.</p>
          <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Sponsors;