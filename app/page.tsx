'use client';

import Link from 'next/link';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  FileText,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Mail,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const initiatives = [
  {
    title: 'Research Journey Series',
    description: 'Real stories from real researchers. Students across disciplines share their experiences as student researchers through interviews and blog-style features offering authentic perspectives, honest insights, and inspiring narratives from the heart of the IIT Kanpur research community.',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
    hoverGradient: 'group-hover:from-blue-600 group-hover:to-cyan-600',
  },
  {
    title: 'Lab Tours',
    description: 'A guided introduction to the vibrant research culture at IIT Kanpur, designed especially for incoming students. Lab Tours take freshers into active laboratories across departments thus sparking curiosity, building early research interest, and helping students integrate research into their academic journey right from day one.',
    icon: FlaskConical,
    gradient: 'from-emerald-500 to-teal-500',
    hoverGradient: 'group-hover:from-emerald-600 group-hover:to-teal-600',
  },
  {
    title: 'PhD & Masters Applications',
    description: 'A dedicated guidance session for students aspiring to pursue higher studies abroad. Learn about PhD and Masters programs at internationally renowned universities, navigate application timelines, and discover the opportunities that await beyond IIT Kanpur.',
    icon: GraduationCap,
    gradient: 'from-violet-500 to-purple-500',
    hoverGradient: 'group-hover:from-violet-600 group-hover:to-purple-600',
  },
  {
    title: 'Research 101',
    description: 'New to research? This introductory session covers research opportunities at IITK and careers in research. Senior students actively engaged in research share their campus experiences and long-term goals which give you a clear picture of what a research-driven path looks like.',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-orange-500',
    hoverGradient: 'group-hover:from-amber-600 group-hover:to-orange-600',
  },
  {
    title: 'CV Making',
    description: "Build a research-oriented CV that opens doors. This session covers the fundamentals of crafting a compelling Curriculum Vitae, from structuring your academic profile to writing effective professor outreach emails. You'll leave with the skills to put your best foot forward for research internships, SURGE and academic applications, international opportunities, PhD and Masters applications, and research projects.",
    icon: FileText,
    gradient: 'from-rose-500 to-pink-500',
    hoverGradient: 'group-hover:from-rose-600 group-hover:to-pink-600',
  },
];

const coordinators = [
  { name: 'Anshu', email: 'anshus24@iitk.ac.in' },
  { name: 'Antriksh Singhal', email: 'antrikshs24@iitk.ac.in' },
  { name: 'Neha', email: 'ensri24@iitk.ac.in' },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">RW</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-foreground">Research Wing</h1>
                <p className="text-xs text-muted-foreground">AnC, IIT Kanpur</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* International Internship Notification */}
              <Link href="/international-internships">
                <Button className="relative flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white text-base font-semibold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  International Internships
                </Button>
              </Link>

              <Link href="/portal">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Go to Research Portal
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
              
           
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-6 py-24 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fadeInUp">
              <ChevronRight className="h-4 w-4" />
              Academics and Career Council, IIT Kanpur
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <span className="block text-foreground">Fueling Curiosity,</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Inspiring Innovation
              </span>
              <span className="block text-foreground mt-2">at IIT Kanpur</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Your gateway to research excellence. Discover opportunities, connect with labs,
              and embark on your academic journey with the Research Wing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link href="/portal">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group px-8">
                  Explore Research Portal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 hover:bg-primary/5 transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Initiatives Section */}
      <section className="flex-1">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Core Initiatives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive programs designed to guide you through every stage of your research journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer bg-card"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />

                  <div className="p-6 lg:p-8 relative">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${initiative.gradient} ${initiative.hoverGradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {initiative.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {initiative.description}
                    </p>

                    <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats/Feature Bar */}
      <section className="bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-white/80">Research Labs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30+</div>
              <div className="text-white/80">Interviews Published</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RW</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-background">Research Wing</h3>
                  <p className="text-sm text-background/70">AnC, IIT Kanpur</p>
                </div>
              </div>
              <p className="text-background/70 text-sm leading-relaxed">
                Empowering the next generation of researchers and scholars at IIT Kanpur.
              </p>
            </div>

            {/* Coordinators */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-background">Contact Coordinators</h3>
              <div className="space-y-3">
                {coordinators.map((coord, index) => (
                  <a
                    key={index}
                    href={`mailto:${coord.email}`}
                    className="flex items-center gap-3 text-background/70 hover:text-background transition-colors group"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm group-hover:underline">{coord.name}: {coord.email}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-background">Connect With Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/company/research-wing-anc-iitk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-background"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/iitk_research_wing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 text-background"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@ResearchWingAnCIIT-Kanpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 text-background"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
              <p className="text-background/50 text-xs pt-4">
                Follow us for updates on events, workshops, and opportunities.
              </p>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-background/50 text-sm">
              © 2024 Research Wing, Academics and Career Council, IIT Kanpur. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
