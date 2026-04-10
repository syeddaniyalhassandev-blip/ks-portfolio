'use client';

import { useState, useEffect } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { LogOut, Save, Plus, Trash2, Upload, LayoutDashboard, ArrowUp, ArrowDown, Menu, X } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AdminPage() {
  const [isAuthenticated, setIsAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuth(true);
        }
      } catch (e) {}
      setCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      setIsAuth(true);
    } else {
      setLoginError('Incorrect password');
    }
  };

  if (checkingAuth) {
    return <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest">Verifying Session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl border border-gray-100">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-widest mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Password" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 text-center focus:ring-2 ring-primary/50 outline-none transition-all"
            />
            {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
            <button type="submit" className="btn-primary w-full py-4 rounded-xl font-black uppercase tracking-widest shadow-md hover:shadow-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuth(false)} />;
}

function AdminDashboard({ onLogout }) {
  const { data, loading, refetch } = usePortfolio();
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (data) setFormData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    onLogout();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        Toast.fire({
          icon: 'success',
          title: 'Changes Published!'
        });
        refetch();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to Save Data'
        });
      }
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: 'error',
        title: 'Connection Error'
      });
    }
    setSaving(false);
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const fd = new FormData();
    fd.append('file', file);
    
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      callback(url);
      Swal.fire({ icon: 'success', title: 'Uploaded!', timer: 800, showConfirmButton: false, background: '#fff', color: '#111' });
    } else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Upload failed', background: '#fff', color: '#111' });
    }
  };

  if (loading || !formData) return <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest">Loading Editor...</div>;

  const sections = formData.sections || [];
  const activeSection = sections[activeIndex];

  const updateSectionMeta = (key, val) => {
    const newSections = [...sections];
    newSections[activeIndex][key] = val;
    setFormData({ ...formData, sections: newSections });
  };

  const updateSectionData = (newData) => {
    const newSections = [...sections];
    newSections[activeIndex].data = newData;
    setFormData({ ...formData, sections: newSections });
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
  };

  const removeSection = (index) => {
    Swal.fire({
       title: 'Are you sure?',
       text: "You won't be able to revert this section deletion!",
       icon: 'warning',
       showCancelButton: true,
       background: '#fff',
       color: '#111',
       confirmButtonColor: '#ef4444',
       confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
       if (result.isConfirmed) {
         const newSections = sections.filter((_, i) => i !== index);
         setFormData({ ...formData, sections: newSections });
         setActiveIndex(Math.max(0, index - 1));
       }
    });
  };

  const addSection = (type) => {
    const id = `${type.toLowerCase()}_${Date.now()}`;
    let defaultData = {};
    if (["Experience", "Education", "Projects", "Achievements", "Skills", "Certifications", "Testimonials"].includes(type)) {
      defaultData = []; // these are array based
    } else if (type === 'About') {
      defaultData = { paragraphs: [] };
    } else if (type === 'CustomBlock') {
      defaultData = { title: "Custom Section", content: [""], image: "", imagePos: "right" };
    }

    const newSection = {
      id,
      type,
      navTitle: `New ${type}`,
      data: defaultData
    };

    setFormData({ ...formData, sections: [...sections, newSection] });
    setActiveIndex(sections.length);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gray-900 flex flex-col md:flex-row font-medium relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Layout Builder */}
      <div className={`
        fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-gray-200 p-4 flex flex-col h-screen overflow-y-auto shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 shrink-0 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between mb-6 px-2 mt-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-primary" />
            <h2 className="font-black text-lg uppercase tracking-widest text-gray-900">Page Builder</h2>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-400"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-grow space-y-2">
          {sections.map((section, idx) => (
            <div 
              key={section.id}
              className={`flex items-center justify-between px-3 py-3 rounded-xl transition-colors border ${activeIndex === idx ? 'bg-primary/5 border-primary/20' : 'hover:bg-gray-50 border-transparent'}`}
            >
              <button 
                onClick={() => setActiveIndex(idx)}
                className={`flex-grow text-left font-bold text-sm tracking-widest truncate mr-2 ${activeIndex === idx ? 'text-primary' : 'text-gray-700'}`}
              >
                {section.navTitle || section.type}
                <span className="block text-[9px] text-gray-400 uppercase mt-1">{section.type}</span>
              </button>
              <div className="flex flex-col gap-1 items-center">
                <div className="flex gap-1">
                  <button onClick={() => moveSection(idx, -1)} className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 transition-colors"><ArrowUp size={14} /></button>
                  <button onClick={() => moveSection(idx, 1)} className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-700 transition-colors"><ArrowDown size={14} /></button>
                </div>
                {sections.length > 1 && (
                  <button onClick={() => removeSection(idx)} className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2 border-t border-gray-100 pt-4">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-3">Add Component</p>
          <div className="grid grid-cols-2 gap-2">
             {['About', 'Experience', 'Projects', 'Achievements', 'Skills', 'Certifications', 'Testimonials', 'CustomBlock', 'Contact'].map(t => (
               <button key={t} onClick={() => addSection(t)} className="bg-gray-50 border border-gray-100 hover:border-primary/30 hover:bg-primary/5 hover:text-primary text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-all text-gray-500">
                 + {t}
               </button>
             ))}
          </div>
        </div>

        <button onClick={handleLogout} className="mt-8 px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm uppercase transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden bg-[#f4f6f8] w-full min-w-0">
        {/* Topbar */}
        <div className="min-h-20 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 bg-white/50 backdrop-blur-md shrink-0 py-2 gap-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 overflow-hidden">
              <h1 className="text-xl font-black uppercase tracking-widest text-primary hidden lg:block shrink-0">Edit Block</h1>
              <h1 className="text-sm font-black uppercase tracking-widest text-primary lg:hidden hidden xs:block shrink-0">Edit</h1>
              <span className="bg-gray-900 text-white px-3 py-1 rounded text-[10px] font-mono font-bold uppercase truncate shadow-sm shrink-0">
                {activeSection?.type}
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-white px-4 md:px-6 py-2.5 rounded-xl font-black flex items-center gap-2 uppercase text-[10px] md:text-xs tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shrink-0"
          >
            <Save size={14} className="md:w-4 md:h-4" /> 
            <span>{saving ? '...' : 'Save & Publish'}</span>
          </button>
        </div>

        {/* Editor Area */}
        {activeSection && (
          <div className="flex-grow p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
              
              {/* METADATA EDITOR (Nav Title & HTML ID) */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl grid grid-cols-2 gap-6 shadow-sm">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Navigation Title</label>
                  <input type="text" value={activeSection.navTitle} onChange={e => updateSectionMeta('navTitle', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-shadow" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">HTML ID (URL Anchor Hash)</label>
                  <input type="text" value={activeSection.id} onChange={e => updateSectionMeta('id', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-mono text-gray-500 transition-shadow" />
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8" />

              {/* DYNAMIC COMPONENT EDITOR */}

              {activeSection.type === 'Hero' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Display Name</label>
                    <input type="text" value={activeSection.data.name || ''} onChange={e => updateSectionData({...activeSection.data, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">CV Path (PDF URL)</label>
                    <div className="flex gap-4">
                      <input type="text" value={activeSection.data.cvPath || ''} onChange={e => updateSectionData({...activeSection.data, cvPath: e.target.value})} className="flex-grow bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                      <label className="bg-gray-100 hover:bg-gray-200 border border-gray-200 px-6 rounded-xl flex items-center gap-2 cursor-pointer transition-colors font-bold text-sm uppercase text-gray-700">
                        <Upload size={16} /> Upload
                        <input type="file" accept=".pdf" className="hidden" onChange={e => handleFileUpload(e, url => updateSectionData({...activeSection.data, cvPath: url}))} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Animated Titles (comma separated)</label>
                    <textarea 
                      rows={3} 
                      value={(activeSection.data.titles || []).join(', ')} 
                      onChange={e => updateSectionData({...activeSection.data, titles: e.target.value.split(',').map(s=>s.trim())})} 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed" 
                    />
                  </div>
                </div>
              )}

              {activeSection.type === 'About' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">About Paragraphs (one per line)</label>
                  <textarea 
                    rows={10} 
                    value={(activeSection.data.paragraphs || []).join('\n\n')} 
                    onChange={e => updateSectionData({ paragraphs: e.target.value.split('\n\n') })} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed text-sm" 
                  />
                </div>
              )}

              {activeSection.type === 'CustomBlock' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Section Theme/Title</label>
                    <input type="text" value={activeSection.data.title || ''} onChange={e => updateSectionData({...activeSection.data, title: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Paragraphs (Double newline separated)</label>
                    <textarea rows={6} value={(activeSection.data.content || []).join('\n\n')} onChange={e => updateSectionData({...activeSection.data, content: e.target.value.split('\n\n')})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed text-sm" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image URL (Optional)</label>
                      <div className="flex gap-2">
                        <input type="text" value={activeSection.data.image || ''} onChange={e => updateSectionData({...activeSection.data, image: e.target.value})} className="flex-grow bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow text-sm" />
                        <label className="bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 rounded-xl flex items-center justify-center cursor-pointer transition-colors text-gray-700" title="Upload">
                          <Upload size={16} />
                          <input type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, url => updateSectionData({...activeSection.data, image: url}))} />
                        </label>
                      </div>
                    </div>
                    {activeSection.data.image && (
                      <div className="shrink-0">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Preview</label>
                        <div className="w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                          <img src={activeSection.data.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Image Position</label>
                      <select value={activeSection.data.imagePos || 'right'} onChange={e => updateSectionData({...activeSection.data, imagePos: e.target.value})} className="bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow text-sm h-[46px] text-gray-900 cursor-pointer">
                        <option value="right">Right Side</option>
                        <option value="left">Left Side</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeSection.type === 'Experience' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{company: 'New Company', role: 'Internship', period: 'Jan 2025 - Mar 2025', desc: 'Description...', logo: '', letter: ''}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'company', label: 'Company Name', type: 'text' },
                    { key: 'role', label: 'Role', type: 'text' },
                    { key: 'period', label: 'Period', type: 'text' },
                    { key: 'desc', label: 'Description', type: 'textarea' },
                    { key: 'logo', label: 'Logo Image URL', type: 'image' },
                    { key: 'letter', label: 'Internship Letter URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Projects' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'New Project', desc: 'Description...', tags: ['Tag 1'], icon: ''}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'name', label: 'Project Name', type: 'text' },
                    { key: 'desc', label: 'Description', type: 'textarea' },
                    { key: 'tags', label: 'Tags (comma separated)', type: 'array' },
                    { key: 'icon', label: 'Icon/Image URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Education' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{degree: 'Degree', school: 'School', year: 'Year', badge: 'BADGE', image: '', bgSize: 'cover'}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'degree', label: 'Degree', type: 'text' },
                    { key: 'school', label: 'School Name', type: 'text' },
                    { key: 'year', label: 'Year', type: 'text' },
                    { key: 'badge', label: 'Badge text', type: 'text' },
                    { key: 'image', label: 'Background Image URL', type: 'image' },
                    { key: 'bgSize', label: 'Bg Size (cover/contain/70%)', type: 'text' },
                  ]}
                />
              )}

              {activeSection.type === 'Achievements' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{title: 'New Achievement', org: 'Organization', badge: 'Badge', badgeType: 'gold', points: ['Point 1'], image: '', extraImages: []}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'org', label: 'Organization', type: 'text' },
                    { key: 'badge', label: 'Badge Text', type: 'text' },
                    { key: 'badgeType', label: 'Type (gold/silver/special/academic)', type: 'text' },
                    { key: 'points', label: 'Bullet Points (one per line)', type: 'array_lines' },
                    { key: 'image', label: 'Main Image URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Skills' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'New Skill', icon: ''}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'name', label: 'Skill Name', type: 'text' },
                    { key: 'icon', label: 'Icon URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Certifications' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{title: 'New Cert', provider: 'Provider', badge: 'Badge', image: ''}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'provider', label: 'Provider', type: 'text' },
                    { key: 'badge', label: 'Badge Text', type: 'text' },
                    { key: 'image', label: 'Certificate Image URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Testimonials' && (
                <ArrayEditor 
                  items={activeSection.data} 
                  onChange={updateSectionData}
                  template={{name: 'New Testimonial', role: 'Role', feedback: 'Feedback...', image: ''}}
                  onUpload={handleFileUpload}
                  fields={[
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'role', label: 'Role/Company', type: 'text' },
                    { key: 'feedback', label: 'Quote', type: 'textarea' },
                    { key: 'image', label: 'Avatar Image URL', type: 'image' },
                  ]}
                />
              )}

              {activeSection.type === 'Contact' && (
                <div className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                    <input type="email" value={activeSection.data.email || ''} onChange={e => updateSectionData({...activeSection.data, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">LinkedIn URL</label>
                    <input type="url" value={activeSection.data.linkedIn || ''} onChange={e => updateSectionData({...activeSection.data, linkedIn: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Intro Text</label>
                    <textarea rows={3} value={activeSection.data.introText || ''} onChange={e => updateSectionData({...activeSection.data, introText: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed text-sm" />
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable array editor component
function ArrayEditor({ items, onChange, template, fields, onUpload }) {
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

  if(!items) items = []; // safety check

  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 relative group shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => moveUp(idx)} className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 flex justify-center items-center font-bold text-gray-600 transition-colors">↑</button>
            <button onClick={() => moveDown(idx)} className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 flex justify-center items-center font-bold text-gray-600 transition-colors">↓</button>
            <button onClick={() => removeItem(idx)} className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 hover:bg-red-100 text-red-500 flex justify-center items-center transition-colors"><Trash2 size={16}/></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {fields.map(field => (
              <div key={field.key} className={field.type === 'textarea' || field.type === 'array_lines' ? 'md:col-span-2' : ''}>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{field.label}</label>
                
                {field.type === 'text' && (
                  <input type="text" value={item[field.key] || ''} onChange={e => updateItem(idx, field.key, e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                )}
                
                {field.type === 'textarea' && (
                  <textarea rows={3} value={item[field.key] || ''} onChange={e => updateItem(idx, field.key, e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed" />
                )}

                {field.type === 'array' && (
                  <input type="text" value={(item[field.key] || []).join(', ')} onChange={e => updateItem(idx, field.key, e.target.value.split(',').map(s=>s.trim()))} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                )}

                {field.type === 'array_lines' && (
                  <textarea rows={4} value={(item[field.key] || []).join('\n')} onChange={e => updateItem(idx, field.key, e.target.value.split('\n'))} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow leading-relaxed" />
                )}

                {field.type === 'image' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="text" value={item[field.key] || ''} onChange={e => updateItem(idx, field.key, e.target.value)} className="flex-grow bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-shadow" />
                      <label className="bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 rounded-xl flex items-center justify-center cursor-pointer transition-colors text-gray-700" title="Upload">
                        <Upload size={16} />
                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => onUpload(e, url => updateItem(idx, field.key, url))} />
                      </label>
                    </div>
                    {item[field.key] && item[field.key].match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) && (
                      <div className="relative w-20 h-20 rounded-lg border border-gray-100 overflow-hidden bg-gray-50 group-hover:border-primary/20">
                         <img src={item[field.key]} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={() => onChange([...items, JSON.parse(JSON.stringify(template))])} className="w-full py-6 border-2 border-dashed border-gray-300 hover:border-primary/50 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-2xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest transition-all">
        <Plus size={20} /> Add New Item
      </button>
    </div>
  );
}
