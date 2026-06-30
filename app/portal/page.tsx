'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase, type Professor, type Lab, type ProjectVacancy, type Department } from '@/lib/supabase';
import {
  ArrowLeft,
  Search,
  Users,
  FlaskConical,
  GraduationCap,
  Bell,
  ChevronRight,
  MapPin,
  Clock,
  Mail,
  ExternalLink,
  FileText,
  BookOpen,
  Lightbulb,
  Filter,
  X,
  Calendar,
  Loader2,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PortalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [vacancies, setVacancies] = useState<ProjectVacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('directory');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const [deptRes, profRes, labsRes, vacRes] = await Promise.all([
        supabase.from('departments').select('*').order('name'),
        supabase.from('professors').select('*, departments(*)').order('name'),
        supabase.from('labs').select('*, departments(*), professors(*)').order('name'),
        supabase.from('project_vacancies').select('*, labs(*, departments(*)), professors(*)').eq('is_active', true).order('deadline')
      ]);

      if (deptRes.data) setDepartments(deptRes.data);
      if (profRes.data) setProfessors(profRes.data);
      if (labsRes.data) setLabs(labsRes.data);
      if (vacRes.data) setVacancies(vacRes.data);

      setLoading(false);
    }

    fetchData();
  }, []);

  const filteredProfessors = professors.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prof.research_interests?.some(i => i.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
    const matchesDept = selectedDepartment === 'all' || prof.department_id === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const filteredLabs = labs.filter(lab => {
    const matchesSearch = lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lab.research_areas?.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ?? false) ||
      (lab.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesDept = selectedDepartment === 'all' || lab.department_id === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const filteredVacancies = vacancies.filter(vac => {
    const matchesSearch = vac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vac.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const lab = labs.find(l => l.id === vac.lab_id);
    const matchesDept = selectedDepartment === 'all' || lab?.department_id === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-accent text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">RW</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold">Research Portal</h1>
                <p className="text-xs text-white/70">AnC, IIT Kanpur</p>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-colors"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Banner */}
        <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary via-primary to-accent p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Research Student Dashboard</h1>
              <p className="text-white/80 text-sm sm:text-base max-w-xl">
                Explore professors, labs, and live project opportunities. Your gateway to research excellence at IIT Kanpur.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-white text-primary hover:bg-white/90 shadow-lg w-full sm:w-auto">
                Browse Labs
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search professors, labs, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base sm:text-lg border-2 focus:border-primary"
            />
          </div>
          <div className="flex gap-2 sm:gap-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-[200px] h-12 border-2">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.code} - {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="directory" className="py-3 text-sm sm:text-base">
              <Users className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Professor & Lab </span>Directory
            </TabsTrigger>
            <TabsTrigger value="vacancies" className="py-3 text-sm sm:text-base relative">
              <Bell className="mr-2 h-4 w-4" />
              Notice Board
              {filteredVacancies.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs">{filteredVacancies.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="resources" className="py-3 text-sm sm:text-base">
              <BookOpen className="mr-2 h-4 w-4" />
              Resource Corner
            </TabsTrigger>
          </TabsList>

          {/* Professor & Lab Directory */}
          <TabsContent value="directory">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-8">
                {/* Professors Section */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Professors ({filteredProfessors.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProfessors.map(professor => (
                      <Card key={professor.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group border-l-4 border-l-primary">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {professor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {professor.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">{professor.designation}</p>
                            <Badge variant="secondary" className="text-xs mb-3">
                              {professor.departments?.code || 'N/A'}
                            </Badge>
                            <div className="flex items-center gap-2 flex-wrap">
                              {professor.is_accepting_students ? (
                                <Badge className="bg-emerald-500 text-white text-xs">Accepting Students</Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs text-muted-foreground">Not Accepting</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          {professor.research_interests && professor.research_interests.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {professor.research_interests.slice(0, 3).map((interest, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{interest}</Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <a href={`mailto:${professor.email}`} className="hover:text-primary truncate">
                              {professor.email}
                            </a>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Labs Section */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    Labs ({filteredLabs.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredLabs.map(lab => (
                      <Card key={lab.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-primary to-accent mb-4 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6" />
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {lab.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs mb-3">
                          {lab.departments?.code || 'N/A'}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {lab.description || 'No description available'}
                        </p>
                        {lab.research_areas && lab.research_areas.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {lab.research_areas.slice(0, 3).map((area, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{area}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate text-xs sm:text-sm">{lab.location || 'Location N/A'}</span>
                          </div>
                          {lab.website_url && (
                            <a href={lab.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Notice Board - Project Vacancies */}
          <TabsContent value="vacancies">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Live Project Vacancies ({filteredVacancies.length})
                  </h2>
                </div>

                {filteredVacancies.length === 0 ? (
                  <Card className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">No Active Vacancies</h3>
                    <p className="text-muted-foreground">Check back later for new opportunities.</p>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {filteredVacancies.map(vacancy => {
                      const daysLeft = vacancy.deadline
                        ? Math.max(0, Math.ceil((new Date(vacancy.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                        : null;

                      return (
                        <Card key={vacancy.id} className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                            <h3 className="font-semibold text-foreground text-lg">{vacancy.title}</h3>
                            {daysLeft !== null && (
                              <Badge
                                className={`${daysLeft <= 7 ? 'bg-red-500' : daysLeft <= 14 ? 'bg-amber-500' : 'bg-emerald-500'} text-white shrink-0`}
                              >
                                {daysLeft} days left
                              </Badge>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <FlaskConical className="h-4 w-4 text-primary" />
                              <span className="text-foreground font-medium">{vacancy.labs?.name}</span>
                              {vacancy.labs?.departments && (
                                <Badge variant="secondary" className="text-xs">{vacancy.labs.departments.code}</Badge>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {vacancy.description}
                            </p>

                            {vacancy.requirements && vacancy.requirements.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {vacancy.requirements.slice(0, 4).map((req, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{req}</Badge>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground pt-2 border-t">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" />
                                <span>Duration: {vacancy.duration || 'Flexible'}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>Spots: {vacancy.spots_available}</span>
                              </div>
                              {vacancy.deadline && (
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-4 w-4" />
                                  <span>Deadline: {new Date(vacancy.deadline).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>

                            {vacancy.professors && (
                              <div className="mt-3 pt-3 border-t">
                                <p className="text-xs text-muted-foreground mb-1">Contact Professor:</p>
                                <a
                                  href={`mailto:${vacancy.professors.email}`}
                                  className="text-sm text-primary hover:underline flex items-center gap-1.5"
                                >
                                  <Mail className="h-4 w-4" />
                                  {vacancy.professors.name}
                                </a>
                              </div>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Resource Corner */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Cold Email Guide */}
              <Card className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">How to Write Cold Emails to Professors</h3>
                    <p className="text-sm text-muted-foreground">A comprehensive guide for effective outreach</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                      Subject Line Matters
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">
                      Keep it concise and specific. Include your purpose and key identifier (e.g., year/department).
                    </p>
                    <div className="pl-8 mt-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                        &quot;SURGE 2024 Application - B.Tech CSE 3rd Year - [Your Name]&quot;
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</span>
                      Show You&apos;ve Done Your Homework
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">
                      Reference specific papers or projects from their work. Explain why it interests you.
                    </p>
                    <div className="pl-8 mt-2 p-3 bg-muted rounded-lg border">
                      <p className="text-xs font-medium text-foreground mb-1">Example:</p>
                      <p className="text-xs text-muted-foreground italic">
                        &quot;I recently read your paper on &apos;Deep Reinforcement Learning for Robotics&apos; and found the approach to sample efficiency particularly compelling. I&apos;m excited about extending this work to...&quot;
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</span>
                      Clear Ask, Minimal Commitment
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">
                      Be specific about what you want (meeting, project discussion, SURGE guidance). Offer flexibility.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">4</span>
                      Attach Relevant Documents
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">
                      Include CV, transcript, and a brief SOP if applying for a specific position.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">5</span>
                      Professional Closing
                    </h4>
                    <p className="text-sm text-muted-foreground pl-8">
                      Keep it brief but polite. Follow up after 1-2 weeks if no response.
                    </p>
                  </div>
                </div>
              </Card>

              {/* CV Structure Guide */}
              <Card className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Academic CV Structure</h3>
                    <p className="text-sm text-muted-foreground">Standard format for research applications</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      Header Section
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                      <li>Full Name (prominent, larger font)</li>
                      <li>Contact: Email, Phone, LinkedIn, Google Scholar</li>
                      <li>Current Position/Affiliation</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      Education (Reverse Chronological)
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                      <li>Degree, Institution, Year</li>
                      <li>CGPA/Percentage (if strong)</li>
                      <li>Relevant coursework (optional)</li>
                      <li>Thesis/Project title (if applicable)</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      Research Experience
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                      <li>Project title, Role, Duration</li>
                      <li>Advisor/Supervisor name</li>
                      <li>Brief description (2-3 lines)</li>
                      <li>Key outcomes, publications, tools used</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      Publications (if any)
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                      <li>Use standard citation format</li>
                      <li>Mark submitted/under review clearly</li>
                      <li>Include DOOs/links</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border">
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary" />
                      Additional Sections
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 pl-6">
                      <li>Technical Skills (categorized)</li>
                      <li>Awards & Honors</li>
                      <li>Teaching/Tutoring Experience</li>
                      <li>Leadership & Extracurriculars</li>
                      <li>References (2-3 professors)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Pro Tips</p>
                      <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                        <li>Keep CV to 1-2 pages for undergrad applications</li>
                        <li>Use consistent formatting throughout</li>
                        <li>Quantify achievements where possible</li>
                        <li>Tailor CV for each position/lab</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <BookOpen className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  SOP Writing Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn how to craft compelling statements of purpose for graduate applications.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <GraduationCap className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  PhD Application Timeline
                </h3>
                <p className="text-sm text-muted-foreground">
                  Month-by-month guide for PhD applications to US, Europe, and India.
                </p>
              </Card>

              <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  Letter of Recommendation Guide
                </h3>
                <p className="text-sm text-muted-foreground">
                  How to request strong recommendation letters from professors.
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              2024 Research Wing, AnC, IIT Kanpur
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/research-wing-anc-iitk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/iitk_research_wing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@ResearchWingAnCIIT-Kanpur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
