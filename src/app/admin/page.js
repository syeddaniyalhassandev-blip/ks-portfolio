'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePortfolio } from '@/hooks/usePortfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, Save, Plus, Trash2, Upload, LayoutDashboard, ArrowUp, ArrowDown, 
  Menu, X, ExternalLink, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, 
  User, Briefcase, GraduationCap, FolderGit2, Award, Wrench, FileBadge, 
  MessageSquareQuote, Mail, Layers, ChevronDown, ChevronUp, ChevronRight, 
  GripVertical, FileText, Check, RotateCcw, Search, Globe, ShieldCheck, 
  FileCheck, Zap, Images
} from 'lucide-react';
import Swal from 'sweetalert2';

// Map section types to intuitive Lucide icons
const SECTION_ICONS = {
  Hero: Sparkles,
  About: User,
  Experience: Briefcase,
  Projects: FolderGit2,
  Education: GraduationCap,
  Achievements: Award,
  Skills: Wrench,
  Certifications: FileBadge,
  Testimonials: MessageSquareQuote,
  Contact: Mail,
  CustomBlock: Layers,
  Gallery: Images
};

// Available section types with descriptive metadata for modal
const SECTION_TYPES_INFO = [
  { type: 'About', title: 'About Biography', desc: 'Personal biography and background paragraphs', icon: User },
  { type: 'Experience', title: 'Work Experience', desc: 'Interactive timeline of jobs and internships', icon: Briefcase },
  { type: 'Projects', title: 'Projects Showcase', desc: 'Grid of technical projects with multi-image galleries', icon: FolderGit2 },
  { type: 'Gallery', title: 'Photo & Project Gallery', desc: 'Multi-image photo grid with interactive lightbox zoom modal', icon: Images },
  { type: 'Education', title: 'Education History', desc: 'Academic degrees, institutions, and years', icon: GraduationCap },
  { type: 'Achievements', title: 'Achievements & Awards', desc: 'Honors, competitions, and badges', icon: Award },
  { type: 'Skills', title: 'Technical Skills', desc: 'Grid of software, hardware, and tool icons', icon: Wrench },
  { type: 'Certifications', title: 'Certifications', desc: 'Certificates gallery with zoomable modal', icon: FileBadge },
  { type: 'Testimonials', title: 'Testimonials & Quotes', desc: 'Feedback from mentors and colleagues', icon: MessageSquareQuote },
  { type: 'Contact', title: 'Contact Section', desc: 'Contact info and interactive messaging form', icon: Mail },
  { type: 'CustomBlock', title: 'Custom Feature Block', desc: 'Flexible text block with optional side image or gallery', icon: Layers }
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuth(true);
        }
      } catch (e) {
        console.error("Auth check failed", e);
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuth(true);
      } else {
        setLoginError('Incorrect admin password. Please try again.');
      }
    } catch (err) {
      setLoginError('Network error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center text-gray-500 font-medium">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 animate-pulse">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Verifying Admin Session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] text-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Decorative Accents */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 sm:p-10 rounded-3xl max-w-md w-full border border-gray-200 shadow-2xl shadow-gray-200/50 relative z-10"
        >
          {/* Logo Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold mb-1">
              Khubaib Salman Studio
            </span>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-wider">
              CMS Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Enter your master password to manage portfolio content
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold mb-2">
                Admin Security Token
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter Password..." 
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 text-sm focus:bg-white focus:border-primary focus:ring-2 ring-primary/20 outline-none transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-600 text-xs font-medium"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loggingIn || !password.trim()}
              className="w-full bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              {loggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Access Studio</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary font-medium transition-colors"
            >
              <Globe size={14} />
              <span>Return to Public Portfolio ↗</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuth(false)} />;
}

function AdminDashboard({ onLogout }) {
  const { data, loading, refetch } = usePortfolio();
  const [formData, setFormData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pendingFiles, setPendingFiles] = useState({}); // { localUrl: File }
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (data) {
      const cloned = JSON.parse(JSON.stringify(data));
      setFormData(cloned);
      setIsDirty(false);
    }
  }, [data]);

  // Clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.keys(pendingFiles).forEach(url => URL.revokeObjectURL(url));
    };
  }, [pendingFiles]);

  const handleSaveRef = useRef();
  useEffect(() => {
    handleSaveRef.current = handleSave;
  });

  // Keyboard shortcut Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!saving && formData && handleSaveRef.current) {
          handleSaveRef.current();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData, saving]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#111827',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  const handleLogout = async () => {
    if (isDirty) {
      const res = await Swal.fire({
        title: 'Unsaved Changes!',
        text: "You have unsaved changes that will be lost if you log out.",
        icon: 'warning',
        showCancelButton: true,
        background: '#ffffff',
        color: '#111827',
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Logout Anyway'
      });
      if (!res.isConfirmed) return;
    }
    await fetch('/api/auth', { method: 'DELETE' });
    onLogout();
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const localUrl = URL.createObjectURL(file);
    setPendingFiles(prev => ({ ...prev, [localUrl]: file }));
    callback(localUrl);
    setIsDirty(true);
    
    Toast.fire({ 
      icon: 'info', 
      title: 'File preview loaded', 
      text: 'Will be permanently uploaded when you Save & Publish.' 
    });
  };

  const handleSave = async () => {
    setSaving(true);
    let finalData = JSON.parse(JSON.stringify(formData));
    
    try {
      // 1. Process Pending Uploads
      const uploadsToRun = [];

      const findBlobs = (obj, path = []) => {
        if (!obj || typeof obj !== 'object') return;
        
        Object.entries(obj).forEach(([key, value]) => {
          if (typeof value === 'string' && value.startsWith('blob:')) {
            uploadsToRun.push({ obj, key, localUrl: value });
          } else if (typeof value === 'object') {
            findBlobs(value);
          }
        });
      };

      findBlobs(finalData.sections);

      // 2. Perform Uploads to Vercel Blob
      if (uploadsToRun.length > 0) {
        Toast.fire({ icon: 'info', title: `Uploading ${uploadsToRun.length} file(s)...` });
        
        for (const item of uploadsToRun) {
          const file = pendingFiles[item.localUrl];
          if (!file) continue;

          const fd = new FormData();
          fd.append('file', file);

          const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
          if (!upRes.ok) throw new Error(`Failed to upload ${file.name}`);
          
          const { url: remoteUrl } = await upRes.json();
          item.obj[item.key] = remoteUrl;
        }
      }

      // 3. Save Final Data to Prisma
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (res.ok) {
        Toast.fire({ icon: 'success', title: 'Published Successfully!', text: 'Live site has been revalidated.' });
        setPendingFiles({});
        setIsDirty(false);
        refetch();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save data');
      }
    } catch (error) {
      console.error(error);
      Toast.fire({ icon: 'error', title: 'Publish Failed', text: error.message });
    }
    setSaving(false);
  };

  const handleReset = () => {
    if (!data) return;
    Swal.fire({
      title: 'Discard unsaved changes?',
      text: 'This will revert all edits back to your last published state.',
      icon: 'warning',
      showCancelButton: true,
      background: '#ffffff',
      color: '#111827',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, discard edits'
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData(JSON.parse(JSON.stringify(data)));
        setPendingFiles({});
        setIsDirty(false);
        Toast.fire({ icon: 'info', title: 'Changes reset to last published version.' });
      }
    });
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center text-gray-500 font-medium">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Loading Studio Content...</p>
      </div>
    );
  }

  const sections = formData.sections || [];
  const activeSection = sections[activeIndex] || sections[0];

  const updateSectionMeta = (key, val) => {
    const newSections = [...sections];
    newSections[activeIndex][key] = val;
    setFormData({ ...formData, sections: newSections });
    setIsDirty(true);
  };

  const updateSectionData = (newData) => {
    const newSections = [...sections];
    newSections[activeIndex].data = newData;
    setFormData({ ...formData, sections: newSections });
    setIsDirty(true);
  };

  const moveSection = (index, dir) => {
    if (index === 0 && dir === -1) return;
    if (index === sections.length - 1 && dir === 1) return;
    
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + dir];
    newSections[index + dir] = temp;
    
    setFormData({ ...formData, sections: newSections });
    setActiveIndex(index + dir);
    setIsDirty(true);
  };

  const removeSection = (index) => {
    Swal.fire({
      title: 'Delete this Section?',
      text: `Are you sure you want to delete "${sections[index].navTitle || sections[index].type}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      background: '#ffffff',
      color: '#111827',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete section!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newSections = sections.filter((_, i) => i !== index);
        setFormData({ ...formData, sections: newSections });
        setActiveIndex(Math.max(0, index - 1));
        setIsDirty(true);
      }
    });
  };

  const addSection = (type) => {
    const id = `${type.toLowerCase()}_${Date.now()}`;
    let defaultData = {};
    if (["Experience", "Education", "Projects", "Achievements", "Skills", "Certifications", "Testimonials", "Gallery"].includes(type)) {
      defaultData = [];
    } else if (type === 'About') {
      defaultData = { paragraphs: ["I am a Mechatronics Engineer passionate about robotics and automation."] };
    } else if (type === 'CustomBlock') {
      defaultData = { title: "New Custom Feature", content: ["Add your custom content here."], image: "", images: [], imagePos: "right" };
    } else if (type === 'Contact') {
      defaultData = { email: "Khubaibsalman2004@gmail.com", linkedIn: "https://www.linkedin.com/in/khubaib-salman-3a09ab251/", introText: "I am always looking for interesting projects and collaborations in robotics and automation." };
    }

    const newSection = {
      id,
      type,
      navTitle: type === 'Hero' ? 'Home' : type,
      data: defaultData
    };

    const nextSections = [...sections, newSection];
    setFormData({ ...formData, sections: nextSections });
    setActiveIndex(nextSections.length - 1);
    setIsAddModalOpen(false);
    setIsDirty(true);
    Toast.fire({ icon: 'success', title: `Added ${type} section` });
  };

  const ActiveIcon = SECTION_ICONS[activeSection?.type] || Layers;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-900 flex flex-col md:flex-row font-medium relative overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <div className={`
        fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-4 flex flex-col h-screen overflow-y-auto shadow-xl z-50 shrink-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Studio Branding */}
        <div className="flex items-center justify-between mb-6 px-2 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-sm uppercase tracking-wider text-gray-900">KS Studio</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Mechatronics CMS</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section List Header */}
        <div className="flex items-center justify-between px-2 mb-3">
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold">
            Sections ({sections.length})
          </span>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-[11px] font-bold text-primary hover:text-blue-700 transition-colors flex items-center gap-1 bg-primary/10 hover:bg-primary/20 px-2.5 py-1 rounded-lg cursor-pointer"
          >
            <Plus size={12} />
            <span>Add Section</span>
          </button>
        </div>

        {/* Sections Navigation List */}
        <div className="grow space-y-1.5 overflow-y-auto pr-1">
          {sections.map((section, idx) => {
            const Icon = SECTION_ICONS[section.type] || Layers;
            const isArray = Array.isArray(section.data);
            const count = isArray ? section.data.length : null;

            return (
              <div 
                key={section.id}
                className={`group flex items-center justify-between px-3 py-3 rounded-xl transition-all border ${
                  activeIndex === idx 
                    ? 'bg-primary/10 border-primary/20 text-primary shadow-xs' 
                    : 'bg-gray-50/60 hover:bg-gray-100/80 border-transparent text-gray-700 hover:text-gray-900'
                }`}
              >
                <button 
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsSidebarOpen(false);
                  }}
                  className="grow flex items-center gap-3 text-left min-w-0 mr-2 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activeIndex === idx ? 'bg-primary text-white shadow-xs' : 'bg-gray-200/70 text-gray-500 group-hover:text-gray-700'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold text-xs uppercase tracking-wider truncate ${
                      activeIndex === idx ? 'text-primary' : 'text-gray-800'
                    }`}>
                      {section.navTitle || section.type}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[9px] font-mono uppercase text-gray-400">{section.type}</span>
                      {count !== null && (
                        <span className="text-[9px] font-mono bg-gray-200/80 px-1.5 py-0.2 rounded-full text-gray-600">
                          {count} {count === 1 ? 'item' : 'items'}
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Quick Actions (Reorder & Delete) */}
                <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100 shrink-0">
                  <div className="flex flex-col">
                    <button 
                      onClick={() => moveSection(idx, -1)} 
                      disabled={idx === 0}
                      className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button 
                      onClick={() => moveSection(idx, 1)} 
                      disabled={idx === sections.length - 1}
                      className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                  {sections.length > 1 && (
                    <button 
                      onClick={() => removeSection(idx)} 
                      className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors ml-0.5"
                      title="Delete Section"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Footer Actions */}
        <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-xs font-bold transition-all"
          >
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-primary" />
              <span>Open Live Portfolio</span>
            </div>
            <ExternalLink size={14} />
          </a>

          <button 
            onClick={handleLogout} 
            className="w-full px-3.5 py-2.5 flex items-center gap-2.5 text-red-600 hover:bg-red-50 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut size={15} /> 
            <span>Sign Out Studio</span>
          </button>
        </div>
      </div>

      {/* MAIN EDITOR AREA */}
      <div className="grow flex flex-col h-screen overflow-hidden bg-[#f4f6f8] w-full min-w-0">
        {/* Topbar Header */}
        <div className="min-h-18 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 bg-white/80 backdrop-blur-md shrink-0 py-2.5 gap-4 z-30 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            >
              <Menu size={22} />
            </button>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <ActiveIcon size={16} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm md:text-base font-black uppercase tracking-wider text-gray-900 truncate">
                    {activeSection?.navTitle || activeSection?.type}
                  </h1>
                  <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-[10px] font-mono uppercase shrink-0 font-bold">
                    {activeSection?.type}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 truncate hidden sm:block font-mono">
                  Anchor ID: #{activeSection?.id}
                </p>
              </div>
            </div>
          </div>

          {/* Topbar Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Status Pill */}
            {isDirty ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Unsaved Changes</span>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold">
                <CheckCircle2 size={13} />
                <span>Published</span>
              </div>
            )}

            {/* Undo / Reset Button */}
            {isDirty && (
              <button
                onClick={handleReset}
                title="Discard unsaved edits"
                className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-xl transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={15} />
                <span className="hidden md:inline">Reset</span>
              </button>
            )}

            {/* Save & Publish Button */}
            <button 
              onClick={handleSave} 
              disabled={saving || !isDirty}
              title="Save & Publish to live site (Ctrl+S)"
              className="bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl font-black flex items-center gap-2 uppercase text-xs tracking-widest shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save size={15} /> 
                  <span>Save & Publish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* EDITOR WORKSPACE CANVAS */}
        {activeSection && (
          <div className="grow p-4 sm:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8 pb-28">
              
              {/* SECTION METADATA CARD (Nav Title & HTML Anchor ID) */}
              <div className="bg-white border border-gray-200 p-6 rounded-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 shadow-xs">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Navigation Menu Title
                  </label>
                  <input 
                    type="text" 
                    value={activeSection.navTitle} 
                    onChange={e => updateSectionMeta('navTitle', e.target.value)} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                    placeholder="e.g. Experience"
                  />
                  <p className="text-[10px] text-gray-400 mt-1.5">Displayed in the header navbar & footer menu</p>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                    URL Anchor Hash ID
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400 font-mono text-sm">#</span>
                    <input 
                      type="text" 
                      value={activeSection.id} 
                      onChange={e => updateSectionMeta('id', e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pl-7 text-gray-900 text-sm font-mono outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="experience"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 font-mono">
                    Link target: https://yoursite.com/#<span className="text-primary">{activeSection.id}</span>
                  </p>
                </div>
              </div>

              {/* DYNAMIC COMPONENT EDITOR CARD */}
              {activeSection.type === 'Hero' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <Sparkles className="text-primary w-5 h-5" />
                    <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">Hero Header Configuration</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Full Name / Title
                    </label>
                    <input 
                      type="text" 
                      value={activeSection.data.name || ''} 
                      onChange={e => updateSectionData({...activeSection.data, name: e.target.value})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="Engr. Khubaib Salman"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Resume / CV PDF Document URL
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="grow relative">
                        <input 
                          type="text" 
                          value={activeSection.data.cvPath || ''} 
                          onChange={e => updateSectionData({...activeSection.data, cvPath: e.target.value})} 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 text-sm font-mono outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                          placeholder="/Khubaib_Salman_CV.pdf"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="bg-linear-to-r from-primary to-blue-600 hover:from-primary/90 text-white px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all font-bold text-xs uppercase tracking-wider shadow-md shrink-0">
                          <Upload size={15} /> 
                          <span>Upload PDF</span>
                          <input type="file" accept=".pdf" className="hidden" onChange={e => handleFileUpload(e, url => updateSectionData({...activeSection.data, cvPath: url}))} />
                        </label>
                        {activeSection.data.cvPath && (
                          <a
                            href={activeSection.data.cvPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 hover:text-gray-900 px-4 py-3.5 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
                            title="Preview CV Document"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Animated Titles Carousel (Comma Separated)
                    </label>
                    <textarea 
                      rows={3} 
                      value={(activeSection.data.titles || []).join(', ')} 
                      onChange={e => updateSectionData({...activeSection.data, titles: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed text-sm" 
                      placeholder="Mechatronics Engineer, Robotics Enthusiast, Automation Specialist"
                    />
                    {/* Live Badge Preview */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {(activeSection.data.titles || []).map((t, idx) => (
                        <span key={idx} className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button Visibility Switches */}
                  <div className="border-t border-gray-100 pt-6">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-4">
                      CTA Button Visibility
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="flex items-center justify-between bg-gray-50/80 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">View Resume Button</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 font-mono">Opens document in tab</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={activeSection.data.showResume !== false}
                          onChange={e => updateSectionData({...activeSection.data, showResume: e.target.checked})}
                          className="w-5 h-5 accent-primary cursor-pointer"
                        />
                      </label>
                      <label className="flex items-center justify-between bg-gray-50/80 border border-gray-200 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">Download PDF Button</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5 font-mono">Direct CV download</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={activeSection.data.showDownload !== false}
                          onChange={e => updateSectionData({...activeSection.data, showDownload: e.target.checked})}
                          className="w-5 h-5 accent-primary cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeSection.type === 'About' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <User className="text-primary w-5 h-5" />
                      <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">About Biography Paragraphs</h3>
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                      {(activeSection.data.paragraphs || []).length} Paragraphs
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Paragraphs (Separate each paragraph with an empty line / Double Enter)
                    </label>
                    <textarea 
                      rows={10} 
                      value={(activeSection.data.paragraphs || []).join('\n\n')} 
                      onChange={e => updateSectionData({ paragraphs: e.target.value.split('\n\n') })} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed text-sm" 
                      placeholder="Write your biography paragraphs here..."
                    />
                  </div>
                </div>
              )}

              {activeSection.type === 'CustomBlock' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <Layers className="text-primary w-5 h-5" />
                    <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">Custom Feature Block Editor</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Section Headline
                    </label>
                    <input 
                      type="text" 
                      value={activeSection.data.title || ''} 
                      onChange={e => updateSectionData({...activeSection.data, title: e.target.value})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                      placeholder="e.g. Mechatronics Lab Research"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Content Paragraphs (Double Line Break Separated)
                    </label>
                    <textarea 
                      rows={6} 
                      value={(activeSection.data.content || []).join('\n\n')} 
                      onChange={e => updateSectionData({...activeSection.data, content: e.target.value.split('\n\n')})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-6 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed text-sm" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        Optional Media Image
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={activeSection.data.image || ''} 
                          onChange={e => updateSectionData({...activeSection.data, image: e.target.value})} 
                          className="grow bg-gray-50 border border-gray-200 rounded-xl p-3 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                          placeholder="https://... or upload"
                        />
                        <label className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 rounded-xl flex items-center justify-center cursor-pointer transition-colors font-bold text-xs uppercase" title="Upload Image">
                          <Upload size={16} />
                          <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, url => updateSectionData({...activeSection.data, image: url}))} />
                        </label>
                      </div>
                      {activeSection.data.image && (
                        <div className="mt-3 relative w-32 h-20 rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                          <Image src={activeSection.data.image} alt="Preview" className="w-full h-full object-cover" width={128} height={80} unoptimized />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        Image Alignment Position
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => updateSectionData({...activeSection.data, imagePos: 'right'})}
                          className={`p-3.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                            (activeSection.data.imagePos || 'right') === 'right'
                              ? 'bg-primary/10 border-primary text-primary shadow-xs'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Right Side →
                        </button>
                        <button
                          type="button"
                          onClick={() => updateSectionData({...activeSection.data, imagePos: 'left'})}
                          className={`p-3.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                            activeSection.data.imagePos === 'left'
                              ? 'bg-primary/10 border-primary text-primary shadow-xs'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          ← Left Side
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MULTI-IMAGE GALLERY IN CUSTOM BLOCK */}
                  <div className="border-t border-gray-100 pt-6">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Multi-Image Gallery (Add Multiple Screenshots / Photos)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {(activeSection.data.images || []).map((imgUrl, imgIdx) => (
                        <div key={imgIdx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 group shadow-xs">
                          <Image src={imgUrl} alt={`Image ${imgIdx + 1}`} fill className="object-cover" unoptimized />
                          <button
                            type="button"
                            onClick={() => {
                              const newImgs = (activeSection.data.images || []).filter((_, i) => i !== imgIdx);
                              updateSectionData({...activeSection.data, images: newImgs});
                            }}
                            className="absolute top-1 right-1 p-1.5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                            title="Remove image"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary text-gray-400 hover:text-primary flex flex-col items-center justify-center cursor-pointer transition-colors text-xs font-bold gap-1 bg-gray-50">
                        <Plus size={20} />
                        <span className="text-[10px] uppercase">Add Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleFileUpload(e, url => {
                            const newImgs = [...(activeSection.data.images || []), url];
                            updateSectionData({...activeSection.data, images: newImgs});
                          })}
                        />
                      </label>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">You can upload multiple images here. Hover over any thumbnail to delete.</p>
                  </div>
                </div>
              )}

              {activeSection.type === 'Experience' && (
                <ArrayAccordionEditor 
                  title="Work Experience & Internships"
                  icon={Briefcase}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{company: 'New Organization', role: 'Internship Role', period: 'Jan 2025 - Mar 2025', desc: 'Describe your duties and mechatronics contributions...', logo: '', letter: '', images: []}}
                  onUpload={handleFileUpload}
                  itemTitleKey="company"
                  itemSubtitleKey="role"
                  fields={[
                    { key: 'company', label: 'Company / Organization Name', type: 'text', placeholder: 'Atlas Honda Limited' },
                    { key: 'role', label: 'Job Role / Designation', type: 'text', placeholder: 'Internship / Robotics Engineer' },
                    { key: 'period', label: 'Time Period', type: 'text', placeholder: 'Jul – Aug 2024' },
                    { key: 'desc', label: 'Description & Responsibilities', type: 'textarea', placeholder: 'Details of your internship...' },
                    { key: 'logo', label: 'Company Logo Image URL', type: 'image' },
                    { key: 'letter', label: 'Internship Certificate / Letter URL', type: 'image' },
                    { key: 'images', label: 'Experience Photo Gallery (Multiple Photos / Screenshots)', type: 'images_gallery' },
                  ]}
                />
              )}

              {activeSection.type === 'Projects' && (
                <ArrayAccordionEditor 
                  title="Projects & Robotics Portfolio"
                  icon={FolderGit2}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'New Mechatronics Project', desc: 'Describe system architecture, embedded hardware, and software...', tags: ['Robotics', 'SolidWorks', 'ROS'], icon: '', images: []}}
                  onUpload={handleFileUpload}
                  itemTitleKey="name"
                  itemSubtitleKey="desc"
                  fields={[
                    { key: 'name', label: 'Project Name', type: 'text', placeholder: 'Autonomous Line-Following Robot' },
                    { key: 'desc', label: 'Detailed Description', type: 'textarea', placeholder: 'Explain sensors, microcontroller, control systems...' },
                    { key: 'tags', label: 'Tech Stack / Tags (Comma Separated)', type: 'array', placeholder: 'ROS, C++, SolidWorks, Arduino, MATLAB' },
                    { key: 'icon', label: 'Project Icon / SVG / Image URL', type: 'image' },
                    { key: 'images', label: 'Project Photo Gallery (Add Multiple Photos / Screenshots)', type: 'images_gallery' },
                  ]}
                />
              )}

              {activeSection.type === 'Gallery' && (
                <ArrayAccordionEditor 
                  title="Photo & Project Gallery Items"
                  icon={Images}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{title: 'New Snapshot Title', caption: 'Short description of this photo or demo...', image: ''}}
                  onUpload={handleFileUpload}
                  itemTitleKey="title"
                  itemSubtitleKey="caption"
                  fields={[
                    { key: 'title', label: 'Photo Title / Project Name', type: 'text', placeholder: '6-DOF Mechatronics Robot Arm' },
                    { key: 'caption', label: 'Caption / Description', type: 'text', placeholder: 'Built using ROS and custom embedded PCBs' },
                    { key: 'image', label: 'Upload Gallery Photo', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Education' && (
                <ArrayAccordionEditor 
                  title="Academic Degrees & Institutions"
                  icon={GraduationCap}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{degree: 'B.E. Mechatronics Engineering', school: 'Karachi Institute of Economics and Technology', year: '2021 - 2025', badge: 'BACHELORS', image: '', bgSize: 'cover'}}
                  onUpload={handleFileUpload}
                  itemTitleKey="degree"
                  itemSubtitleKey="school"
                  fields={[
                    { key: 'degree', label: 'Degree / Program Title', type: 'text', placeholder: 'B.E. Mechatronics Engineering' },
                    { key: 'school', label: 'School / University Name', type: 'text', placeholder: 'KIET' },
                    { key: 'year', label: 'Graduation Year / Period', type: 'text', placeholder: '2021 - 2025' },
                    { key: 'badge', label: 'Badge Label', type: 'text', placeholder: 'BACHELORS / MATRIC' },
                    { key: 'bgSize', label: 'Background Scaling (cover, contain, 70%, 80%)', type: 'select', options: ['cover', 'contain', '70%', '80%', '90%'] },
                    { key: 'image', label: 'Campus Background Image URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Achievements' && (
                <ArrayAccordionEditor 
                  title="Achievements, Awards & Honors"
                  icon={Award}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{title: 'New Award Title', org: 'Awarding Organization', badge: 'GOLD MEDAL', badgeType: 'gold', points: ['1st Place in Robotics Competition'], image: '', images: []}}
                  onUpload={handleFileUpload}
                  itemTitleKey="title"
                  itemSubtitleKey="org"
                  fields={[
                    { key: 'title', label: 'Achievement / Competition Title', type: 'text', placeholder: 'National Robotics Olympiad' },
                    { key: 'org', label: 'Organization / Institution', type: 'text', placeholder: 'IEEE / PAC' },
                    { key: 'badge', label: 'Badge Title', type: 'text', placeholder: '1ST PRIZE' },
                    { key: 'badgeType', label: 'Badge Theme / Type', type: 'select', options: ['gold', 'silver', 'special', 'academic'] },
                    { key: 'points', label: 'Bullet Points (One per line)', type: 'array_lines', placeholder: 'Enter achievements, one per line...' },
                    { key: 'image', label: 'Main Trophy / Photo Image URL', type: 'image' },
                    { key: 'images', label: 'Additional Event Photos (Multiple Images)', type: 'images_gallery' },
                  ]}
                />
              )}

              {activeSection.type === 'Skills' && (
                <ArrayAccordionEditor 
                  title="Technical Skills & Proficiencies"
                  icon={Wrench}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'New Tool / Skill', icon: ''}}
                  onUpload={handleFileUpload}
                  itemTitleKey="name"
                  fields={[
                    { key: 'name', label: 'Skill / Tool Name', type: 'text', placeholder: 'ROS / SolidWorks / PLC' },
                    { key: 'icon', label: 'Icon Image URL / SVG', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Certifications' && (
                <ArrayAccordionEditor 
                  title="Certifications & Diplomas"
                  icon={FileBadge}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{title: 'New Certification Title', provider: 'Issuing Organization', badge: 'VERIFIED', image: ''}}
                  onUpload={handleFileUpload}
                  itemTitleKey="title"
                  itemSubtitleKey="provider"
                  fields={[
                    { key: 'title', label: 'Certificate Name', type: 'text', placeholder: 'Industrial Robotics Advanced Training' },
                    { key: 'provider', label: 'Provider / Institution', type: 'text', placeholder: 'Coursera / Siemens / IEEE' },
                    { key: 'badge', label: 'Badge Label', type: 'text', placeholder: 'VERIFIED / ACADEMIC' },
                    { key: 'image', label: 'Certificate PDF / Image Document URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Testimonials' && (
                <ArrayAccordionEditor 
                  title="Testimonials & Endorsements"
                  icon={MessageSquareQuote}
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'Engr. Mentor Name', role: 'Chief Engineer, Atlas Honda', feedback: 'Khubaib demonstrated outstanding mechatronics expertise...', image: ''}}
                  onUpload={handleFileUpload}
                  itemTitleKey="name"
                  itemSubtitleKey="role"
                  fields={[
                    { key: 'name', label: 'Person Name', type: 'text', placeholder: 'Engr. Salman' },
                    { key: 'role', label: 'Role & Organization', type: 'text', placeholder: 'Supervisor, Atlas Battery' },
                    { key: 'feedback', label: 'Feedback / Quote', type: 'textarea', placeholder: 'Write the testimonial quotation...' },
                    { key: 'image', label: 'Avatar / Photo URL (Optional)', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Contact' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <Mail className="text-primary w-5 h-5" />
                    <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">Contact & Social Setup</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        Destination Email Address
                      </label>
                      <input 
                        type="email" 
                        value={activeSection.data.email || ''} 
                        onChange={e => updateSectionData({...activeSection.data, email: e.target.value})} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1.5 font-mono">FormSubmit messages will arrive at this inbox</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                        LinkedIn Profile URL
                      </label>
                      <input 
                        type="url" 
                        value={activeSection.data.linkedIn || ''} 
                        onChange={e => updateSectionData({...activeSection.data, linkedIn: e.target.value})} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">
                      Introductory Invitation Text
                    </label>
                    <textarea 
                      rows={3} 
                      value={activeSection.data.introText || ''} 
                      onChange={e => updateSectionData({...activeSection.data, introText: e.target.value})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed text-sm" 
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* ADD SECTION MODAL DRAWER */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 max-w-2xl w-full bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-wider text-gray-900">Add New Portfolio Section</h3>
                    <p className="text-xs text-gray-500">Choose a section component to insert into your page</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-gray-200/60 rounded-xl text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTION_TYPES_INFO.map(info => {
                  const Icon = info.icon || Layers;
                  return (
                    <button
                      key={info.type}
                      onClick={() => addSection(info.type)}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/30 text-left transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-primary/10 group-hover:text-primary text-gray-500 flex items-center justify-center shrink-0 transition-colors mt-0.5 border border-gray-200/80 group-hover:border-primary/20">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">
                          {info.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                          {info.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Professional Accordion-Based Array Editor (Light Theme)
function ArrayAccordionEditor({ title, icon: TitleIcon, items, onChange, template, fields, onUpload, itemTitleKey = 'name', itemSubtitleKey }) {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (idx) => {
    setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const expandAll = () => {
    const all = {};
    (items || []).forEach((_, idx) => { all[idx] = true; });
    setOpenItems(all);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const updateItem = (index, key, val) => {
    const newItems = [...items];
    newItems[index][key] = val;
    onChange(newItems);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    onChange(newItems);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    onChange(newItems);
  };

  const addItem = () => {
    const newItems = [...(items || []), JSON.parse(JSON.stringify(template))];
    onChange(newItems);
    setOpenItems(prev => ({ ...prev, [newItems.length - 1]: true }));
  };

  if (!items) items = [];

  return (
    <div className="space-y-6 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xs">
      {/* Section Header & Bulk Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-3">
          {TitleIcon && <TitleIcon className="text-primary w-5 h-5" />}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider text-gray-900">{title}</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">{items.length} {items.length === 1 ? 'Entry' : 'Entries'} in list</p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="py-12 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-gray-50/50">
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-400 mb-3 shadow-2xs">
            {TitleIcon ? <TitleIcon size={24} /> : <Layers size={24} />}
          </div>
          <p className="text-sm font-bold text-gray-900 mb-1">No entries yet</p>
          <p className="text-xs text-gray-500 max-w-sm mb-6">Click below to add your first entry to this section.</p>
          <button
            type="button"
            onClick={addItem}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Plus size={16} /> Add First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openItems[idx] !== false;
            const itemTitle = item[itemTitleKey] || `Entry #${idx + 1}`;
            const itemSub = itemSubtitleKey ? item[itemSubtitleKey] : null;

            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs hover:shadow-sm"
              >
                {/* Accordion Header Bar */}
                <div className="flex items-center justify-between p-4 bg-gray-50/80 hover:bg-gray-100/90 transition-colors gap-4">
                  <button
                    type="button"
                    onClick={() => toggleItem(idx)}
                    className="grow flex items-center gap-3 text-left min-w-0 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 truncate">
                        {itemTitle}
                      </h4>
                      {itemSub && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {itemSub}
                        </p>
                      )}
                    </div>
                  </button>

                  {/* Header Actions (Reorder, Delete, Expand toggle) */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button 
                      type="button"
                      onClick={() => moveUp(idx)} 
                      disabled={idx === 0}
                      className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => moveDown(idx)} 
                      disabled={idx === items.length - 1}
                      className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => removeItem(idx)} 
                      className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors ml-1 cursor-pointer"
                      title="Delete Item"
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleItem(idx)}
                      className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-700 transition-colors ml-1 cursor-pointer"
                    >
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Accordion Content Form */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                        {fields.map(field => (
                          <div 
                            key={field.key} 
                            className={field.type === 'textarea' || field.type === 'array_lines' || field.type === 'images_gallery' ? 'md:col-span-2' : ''}
                          >
                            <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                              {field.label}
                            </label>
                            
                            {field.type === 'text' && (
                              <input 
                                type="text" 
                                value={item[field.key] || ''} 
                                onChange={e => updateItem(idx, field.key, e.target.value)} 
                                placeholder={field.placeholder || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                              />
                            )}
                            
                            {field.type === 'textarea' && (
                              <textarea 
                                rows={3} 
                                value={item[field.key] || ''} 
                                onChange={e => updateItem(idx, field.key, e.target.value)} 
                                placeholder={field.placeholder || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed" 
                              />
                            )}

                            {field.type === 'select' && (
                              <select
                                value={item[field.key] || field.options?.[0] || ''}
                                onChange={e => updateItem(idx, field.key, e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all h-[46px] cursor-pointer font-bold uppercase"
                              >
                                {(field.options || []).map(opt => (
                                  <option key={opt} value={opt} className="bg-white text-gray-900 uppercase font-bold">
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            )}

                            {field.type === 'array' && (
                              <input 
                                type="text" 
                                value={(item[field.key] || []).join(', ')} 
                                onChange={e => updateItem(idx, field.key, e.target.value.split(',').map(s=>s.trim()).filter(Boolean))} 
                                placeholder={field.placeholder || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                              />
                            )}

                            {field.type === 'array_lines' && (
                              <textarea 
                                rows={4} 
                                value={(item[field.key] || []).join('\n')} 
                                onChange={e => updateItem(idx, field.key, e.target.value.split('\n'))} 
                                placeholder={field.placeholder || ''}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all leading-relaxed font-mono text-xs" 
                              />
                            )}

                            {field.type === 'image' && (
                              <div className="space-y-3">
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={item[field.key] || ''} 
                                    onChange={e => updateItem(idx, field.key, e.target.value)} 
                                    placeholder="https://... or upload file"
                                    className="grow bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-gray-900 text-sm outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary transition-all" 
                                  />
                                  <label className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 rounded-xl flex items-center justify-center cursor-pointer transition-colors text-xs uppercase font-bold tracking-wider shrink-0" title="Upload Media">
                                    <Upload size={15} />
                                    <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => onUpload(e, url => updateItem(idx, field.key, url))} />
                                  </label>
                                </div>
                                {item[field.key] && (
                                  <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-200 w-fit">
                                    {item[field.key].match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || item[field.key].startsWith('blob:') ? (
                                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                                        <Image src={item[field.key]} alt="Thumb" className="w-full h-full object-cover" width={56} height={56} unoptimized />
                                      </div>
                                    ) : (
                                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <FileCheck size={20} />
                                      </div>
                                    )}
                                    <div className="text-xs">
                                      <p className="font-bold text-gray-900 truncate max-w-[180px]">Loaded File</p>
                                      <a href={item[field.key]} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline font-mono">
                                        Preview Link ↗
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {field.type === 'images_gallery' && (
                              <div className="space-y-3">
                                <div className="flex flex-wrap gap-3">
                                  {(item[field.key] || []).map((imgUrl, imgIdx) => (
                                    <div key={imgIdx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group shadow-xs">
                                      <Image src={imgUrl} alt={`Image ${imgIdx + 1}`} fill className="object-cover" unoptimized />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newImgs = (item[field.key] || []).filter((_, i) => i !== imgIdx);
                                          updateItem(idx, field.key, newImgs);
                                        }}
                                        className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs"
                                        title="Remove image"
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  ))}
                                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary text-gray-400 hover:text-primary flex flex-col items-center justify-center cursor-pointer transition-colors text-xs font-bold gap-1 bg-gray-50">
                                    <Plus size={18} />
                                    <span className="text-[9px] uppercase">Add Photo</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={e => onUpload(e, url => {
                                        const newImgs = [...(item[field.key] || []), url];
                                        updateItem(idx, field.key, newImgs);
                                      })}
                                    />
                                  </label>
                                </div>
                                <p className="text-[10px] text-gray-400">Upload multiple photos/screenshots. Hover over any thumbnail to delete.</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Entry Button */}
      <button 
        type="button"
        onClick={addItem} 
        className="w-full py-4 border-2 border-dashed border-gray-200 hover:border-primary/50 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all cursor-pointer bg-gray-50/50"
      >
        <Plus size={16} /> Add New {title.split(' ')[0]} Entry
      </button>
    </div>
  );
}
