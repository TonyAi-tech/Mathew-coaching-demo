import React, { useEffect } from 'react';
import { ChevronDown, Gamepad2, Clock, Target, MessageSquare, Instagram, Twitter, Mail, Hexagon, Calendar, User, Trophy, ArrowRight, Crosshair, Shield, Brain, Zap, Users, Award, BarChart } from 'lucide-react';

function App() {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.service-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-tech-dark text-gray-100">
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 tech-gradient opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)]"></div>
        <Hexagon className="absolute text-blue-500/10 w-96 h-96 animate-pulse-slow" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-glow bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500">
            Elevate Your Rainbow Six Siege Skills with Expert Coaching
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-3xl mx-auto">
            Personalized 1-on-1 coaching sessions to help you master strategies, improve gameplay, and achieve your competitive goals.
          </p>
          <a href="#schedule" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-display font-semibold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            Book Your Session Now <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </header>

      {/* About Me Section */}
      <section className="py-32 bg-tech-gray relative overflow-hidden" id="about">
        <div className="absolute inset-0 tech-gradient opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden card-glow">
                <img 
                  src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80"
                  alt="Coach Matthew"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white p-4 rounded-lg">
                <Trophy className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-glow">Meet Your Coach: Matthew</h2>
              <p className="text-gray-300 text-lg mb-6">
                With over 5 years of competitive Rainbow Six Siege experience and a proven track record of helping players reach their full potential, I'm here to guide you through every aspect of the game.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                My coaching philosophy focuses on developing both mechanical skills and strategic thinking, ensuring you become a well-rounded player capable of adapting to any situation.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-tech-dark p-4 rounded-lg text-center">
                  <p className="text-blue-500 font-display text-2xl font-bold">500+</p>
                  <p className="text-gray-400">Sessions</p>
                </div>
                <div className="bg-tech-dark p-4 rounded-lg text-center">
                  <p className="text-purple-500 font-display text-2xl font-bold">98%</p>
                  <p className="text-gray-400">Success Rate</p>
                </div>
                <div className="bg-tech-dark p-4 rounded-lg text-center">
                  <p className="text-blue-500 font-display text-2xl font-bold">4.9/5</p>
                  <p className="text-gray-400">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-32 bg-tech-dark relative overflow-hidden" id="services">
        <div className="absolute inset-0 tech-gradient opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-5xl font-bold text-center mb-8 text-glow">Coaching Services</h2>
          <p className="text-gray-300 text-xl text-center mb-20 max-w-3xl mx-auto">
            Comprehensive coaching packages designed to elevate your Rainbow Six Siege gameplay to professional levels.
          </p>
          
          {/* Main Services */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="service-card bg-tech-gray p-10 rounded-2xl card-glow backdrop-blur-sm bg-opacity-50 transition-all hover:transform hover:scale-105 delay-0">
              <Gamepad2 className="w-12 h-12 text-blue-500 mb-6 animate-float" />
              <h3 className="font-display text-2xl font-bold mb-4">Personalized Coaching</h3>
              <p className="text-gray-400 text-lg mb-6">One-on-one sessions tailored to your unique playstyle and goals.</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Crosshair className="w-5 h-5 text-blue-500 mr-2" />
                  Aim training techniques
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  Defensive strategies
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-blue-500 mr-2" />
                  Attack coordination
                </li>
              </ul>
            </div>

            <div className="service-card bg-tech-gray p-10 rounded-2xl card-glow backdrop-blur-sm bg-opacity-50 transition-all hover:transform hover:scale-105 delay-1">
              <Target className="w-12 h-12 text-purple-500 mb-6 animate-float" />
              <h3 className="font-display text-2xl font-bold mb-4">VOD Analysis</h3>
              <p className="text-gray-400 text-lg mb-6">In-depth review of your gameplay footage with actionable feedback.</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Brain className="w-5 h-5 text-purple-500 mr-2" />
                  Decision making review
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-purple-500 mr-2" />
                  Team coordination analysis
                </li>
                <li className="flex items-center">
                  <BarChart className="w-5 h-5 text-purple-500 mr-2" />
                  Performance metrics
                </li>
              </ul>
            </div>

            <div className="service-card bg-tech-gray p-10 rounded-2xl card-glow backdrop-blur-sm bg-opacity-50 transition-all hover:transform hover:scale-105 delay-2">
              <Award className="w-12 h-12 text-blue-500 mb-6 animate-float" />
              <h3 className="font-display text-2xl font-bold mb-4">Competitive Prep</h3>
              <p className="text-gray-400 text-lg mb-6">Prepare for tournaments and competitive play with pro-level strategies.</p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Trophy className="w-5 h-5 text-blue-500 mr-2" />
                  Tournament preparation
                </li>
                <li className="flex items-center">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  Map-specific strategies
                </li>
                <li className="flex items-center">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  Team synergy building
                </li>
              </ul>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-display font-bold mb-8">Simple, Transparent Pricing</h3>
            <div className="service-card bg-tech-gray p-8 rounded-2xl card-glow backdrop-blur-sm bg-opacity-50 max-w-2xl mx-auto delay-3 animate-glow-pulse">
              <p className="text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                $25 per 1-hour session
              </p>
              <p className="text-gray-300 text-lg mb-6">
                All services included • No hidden fees • Book multiple sessions for better results
              </p>
              <a href="#schedule" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-display font-semibold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Book Your First Session <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-tech-gray relative" id="testimonials">
        <div className="absolute inset-0 tech-gradient opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-5xl font-bold text-center mb-20 text-glow">Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-tech-dark p-10 rounded-2xl card-glow backdrop-blur-sm">
              <MessageSquare className="w-10 h-10 text-blue-500 mb-6" />
              <p className="text-gray-300 text-xl mb-6 font-light">"Matthew's coaching completely transformed my gameplay. I've improved significantly in just a few sessions."</p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100&h=100" 
                  alt="Alex K." 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-display font-bold text-lg">Alex K.</p>
                  <p className="text-gray-400">Diamond Player</p>
                </div>
              </div>
            </div>
            <div className="bg-tech-dark p-10 rounded-2xl card-glow backdrop-blur-sm">
              <MessageSquare className="w-10 h-10 text-purple-500 mb-6" />
              <p className="text-gray-300 text-xl mb-6 font-light">"The personalized strategies and attention to detail in each session made all the difference."</p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100" 
                  alt="Sarah M." 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-display font-bold text-lg">Sarah M.</p>
                  <p className="text-gray-400">Platinum Player</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-32 bg-tech-dark relative" id="schedule">
        <div className="absolute inset-0 tech-gradient opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-5xl font-bold text-center mb-8 text-glow">Schedule Your Session</h2>
          <p className="text-gray-300 text-xl text-center mb-12">Choose a time that works best for you, and let's start your journey to improvement.</p>
          <div className="bg-tech-gray p-8 rounded-2xl card-glow">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name</label>
                  <input type="text" className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100" />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Preferred Date & Time</label>
                <input type="datetime-local" className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100" />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea className="w-full bg-tech-dark border border-gray-700 rounded-lg p-3 text-gray-100 h-32"></textarea>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-display font-semibold py-4 px-8 rounded-lg text-lg transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Book Session
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-tech-gray relative" id="contact">
        <div className="absolute inset-0 tech-gradient opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-5xl font-bold text-center mb-20 text-glow">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="mailto:contact@matthewscoaching.com" className="bg-tech-dark p-8 rounded-2xl card-glow text-center hover:transform hover:scale-105 transition-all">
              <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400">contact@matthewscoaching.com</p>
            </a>
            <a href="#" className="bg-tech-dark p-8 rounded-2xl card-glow text-center hover:transform hover:scale-105 transition-all">
              <Instagram className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Instagram</h3>
              <p className="text-gray-400">@matthewcoaching</p>
            </a>
            <a href="#" className="bg-tech-dark p-8 rounded-2xl card-glow text-center hover:transform hover:scale-105 transition-all">
              <Twitter className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold mb-2">Twitter</h3>
              <p className="text-gray-400">@matthewcoaching</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tech-dark py-16 border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-blue-500 transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-blue-500 transition-colors">Services</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-blue-500 transition-colors">Testimonials</a></li>
                <li><a href="#schedule" className="text-gray-400 hover:text-blue-500 transition-colors">Schedule</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li><a href="mailto:contact@matthewscoaching.com" className="text-gray-400 hover:text-blue-500 transition-colors">Email</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with the latest tips and strategies.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-tech-gray border border-gray-700 rounded-l-lg p-2 flex-grow" />
                <button className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800/30 pt-8 text-center">
            <p className="text-gray-400">© 2024 Matthew's Coaching. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;