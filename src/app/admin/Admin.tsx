import { useState, useEffect } from "react";
import { db, storage, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import AdminAuthCheck from "@/components/AdminAuthCheck";

// --- TYPES ---
interface ProjectForm {
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  image: string;
  techStack: string; 
}

interface SkillForm {
  name: string;
  icon: string;
  skills: string; // Comma separated string for input
  order: number;  // Controls display priority
}

interface SkillCategoryData {
  id: string; 
  name: string;
  icon: string;
  skills: string[];
  order?: number;
}

export default function AdminPage() {
  // --- STATE ---
  const [projects, setProjects] = useState<any[]>([]);
  const [skillsData, setSkillsData] = useState<SkillCategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Project Form State
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: "",
    techStack: "", 
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Skill Form State
  const [skillForm, setSkillForm] = useState<SkillForm>({ 
    name: "", 
    icon: "", 
    skills: "", 
    order: 0 
  });
  const [skillEditId, setSkillEditId] = useState<string | null>(null);

  // ==========================
  // 1. INITIAL FETCH
  // ==========================
  const fetchData = async () => {
    // A. Fetch Projects
    try {
      const projectSnap = await getDocs(collection(db, "projects"));
      setProjects(projectSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }

    // B. Fetch Skills
    try {
      const skillSnap = await getDocs(collection(db, "skills"));
      const skillsList = skillSnap.docs.map((d) => ({ id: d.id, ...d.data() } as SkillCategoryData));
      
      // SORT SKILLS BY ORDER (Ascending: 1, 2, 3...)
      skillsList.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      setSkillsData(skillsList);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================
  // 2. PROJECT ACTIONS
  // ==========================
  const uploadImage = async () => {
    if (!imageFile) return form.image;
    const uniqueName = `${Date.now()}-${imageFile.name}`;
    const imgRef = ref(storage, `projects/${uniqueName}`);
    await uploadBytes(imgRef, imageFile);
    return await getDownloadURL(imgRef);
  };

  const handleProjectSubmit = async () => {
    if (!form.title || !form.description) return alert("Fill all required fields");
    setLoading(true);
    try {
      const imgURL = await uploadImage();
      const techStackArray = form.techStack.split(",").map((t) => t.trim()).filter(Boolean);
      const data = { ...form, image: imgURL, techStack: techStackArray };

      if (editId) {
        await updateDoc(doc(db, "projects", editId), data);
        setEditId(null);
      } else {
        await addDoc(collection(db, "projects"), data);
      }
      // Reset
      setForm({ title: "", description: "", githubLink: "", liveLink: "", image: "", techStack: "" });
      setImageFile(null);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchData();
    }
  };

  const handleEditClick = (p: any) => {
    setEditId(p.id);
    setForm({
        title: p.title, description: p.description, githubLink: p.githubLink, liveLink: p.liveLink, image: p.image,
        techStack: Array.isArray(p.techStack) ? p.techStack.join(", ") : ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==========================
  // 3. SKILL ACTIONS
  // ==========================
  
  const handleSkillSubmit = async () => {
    if(!skillForm.name || !skillForm.icon) return alert("Category Name and Icon are required");
    setLoading(true);

    try {
      // Convert "React, Node" -> ["React", "Node"]
      const skillsArray = skillForm.skills.split(",").map(s => s.trim()).filter(s => s.length > 0);

      const data = {
        name: skillForm.name,
        icon: skillForm.icon,
        skills: skillsArray,
        order: Number(skillForm.order) // Ensure it saves as a number
      };

      if (skillEditId) {
        // Update
        await updateDoc(doc(db, "skills", skillEditId), data);
        setSkillEditId(null);
      } else {
        // Create
        await addDoc(collection(db, "skills"), data);
      }

      // Reset
      setSkillForm({ name: "", icon: "", skills: "", order: 0 });
      fetchData();
      
    } catch (error: any) {
      console.error("Skill Error:", error);
      alert(`Failed to save skill. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if(!confirm("Delete this entire skill category?")) return;
    try {
        await deleteDoc(doc(db, "skills", id));
        fetchData();
    } catch (error: any) {
        console.error(error);
        alert(error.message);
    }
  };

  const handleEditCategory = (cat: SkillCategoryData) => {
    setSkillEditId(cat.id);
    setSkillForm({
        name: cat.name,
        icon: cat.icon,
        skills: cat.skills.join(", "),
        order: cat.order || 0
    });
    // Scroll to form
    document.getElementById("skills-form")?.scrollIntoView({ behavior: "smooth" });
  };

  // ==========================
  // 4. UI RENDER
  // ==========================
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-100 p-6 pt-24">
        <div className="max-w-5xl mx-auto">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <button onClick={() => signOut(auth)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
              Logout
            </button>
          </div>

          {/* ======================= */}
          {/* PROJECTS SECTION        */}
          {/* ======================= */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Manage Projects</h2>
            
            {/* Project Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">{editId ? "Update Project" : "Add New Project"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Title</label>
                    <input className="border p-2 rounded w-full text-black" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Description</label>
                    <textarea rows={3} className="border p-2 rounded w-full text-black" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">GitHub</label>
                    <input className="border p-2 rounded w-full text-black" value={form.githubLink} onChange={(e) => setForm({...form, githubLink: e.target.value})} />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-600">Live Demo</label>
                    <input className="border p-2 rounded w-full text-black" value={form.liveLink} onChange={(e) => setForm({...form, liveLink: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Tech Stack (comma separated)</label>
                    <input className="border p-2 rounded w-full text-black" value={form.techStack} onChange={(e) => setForm({...form, techStack: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600">Image</label>
                    <input type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} className="text-black block w-full" />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleProjectSubmit} disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                  {loading ? "Saving..." : editId ? "Update" : "Add Project"}
                </button>
                {editId && <button onClick={() => { setEditId(null); setForm({title:"", description:"", githubLink:"", liveLink:"", image:"", techStack:""}); }} className="bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>}
              </div>
            </div>

            {/* Project List */}
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center border border-gray-100 gap-4">
                  <div className="flex items-center gap-4">
                     {p.image && <img src={p.image} className="w-16 h-16 object-cover rounded" alt="proj" />}
                     <div>
                        <h4 className="font-bold text-lg text-black">{p.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{p.description}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(p)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleProjectDelete(p.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* ======================= */}
          {/* SKILLS SECTION          */}
          {/* ======================= */}
          <div className="mb-20" id="skills-form">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Manage Skills</h2>

            {/* SKILL FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    {skillEditId ? "Update Category" : "Add New Category"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Order Field */}
                    <div className="md:col-span-1">
                        <label className="text-sm font-semibold text-gray-600">Order (1, 2, 3...)</label>
                        <input 
                            type="number"
                            placeholder="0" 
                            className="border p-2 rounded w-full text-black focus:ring-2 focus:ring-blue-500 outline-none"
                            value={skillForm.order}
                            onChange={e => setSkillForm({...skillForm, order: parseInt(e.target.value) || 0})}
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-600">Category Name</label>
                        <input 
                            placeholder="e.g. Frontend" 
                            className="border p-2 rounded w-full text-black focus:ring-2 focus:ring-blue-500 outline-none"
                            value={skillForm.name}
                            onChange={e => setSkillForm({...skillForm, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="md:col-span-1">
                        <label className="text-sm font-semibold text-gray-600">Icon (Emoji)</label>
                        <input 
                            placeholder="e.g. 🎨" 
                            className="border p-2 rounded w-full text-black focus:ring-2 focus:ring-blue-500 outline-none"
                            value={skillForm.icon}
                            onChange={e => setSkillForm({...skillForm, icon: e.target.value})}
                        />
                    </div>
                    
                    <div className="md:col-span-4">
                        <label className="text-sm font-semibold text-gray-600">Skills List (Comma separated)</label>
                        <textarea 
                            rows={2}
                            placeholder="e.g. React, TypeScript, Tailwind CSS" 
                            className="border p-2 rounded w-full text-black focus:ring-2 focus:ring-blue-500 outline-none"
                            value={skillForm.skills}
                            onChange={e => setSkillForm({...skillForm, skills: e.target.value})}
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate skills with commas.</p>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button 
                        onClick={handleSkillSubmit} 
                        disabled={loading} 
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-medium"
                    >
                        {skillEditId ? "Update Category" : "Add Category"}
                    </button>
                    
                    {skillEditId && (
                        <button 
                            onClick={() => { 
                                setSkillEditId(null); 
                                setSkillForm({ name: "", icon: "", skills: "", order: 0 }); 
                            }} 
                            className="bg-gray-500 text-white px-6 py-2 rounded font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* SKILL LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsData.map((cat) => (
                <div key={cat.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 relative flex flex-col">
                  
                  <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl bg-gray-100 p-2 rounded-lg">{cat.icon}</span>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{cat.name}</h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Order: {cat.order || 0}</span>
                        </div>
                      </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.skills?.map((skill, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 border-t pt-4 mt-auto">
                    <button onClick={() => handleEditCategory(cat)} className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminAuthCheck>
  );
}