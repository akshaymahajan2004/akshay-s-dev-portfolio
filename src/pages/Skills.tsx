import { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import SkillCard from "@/components/SkillCard";

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
  order?: number; // Added order field
}

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "skills"));
        const data = querySnapshot.docs.map(doc => doc.data() as SkillCategory);
        
        // SORT LOGIC: Ascending order (1, 2, 3...)
        // Items without 'order' will appear at the top (treated as 0)
        data.sort((a, b) => (a.order || 0) - (b.order || 0));

        setCategories(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <div className="pt-24 text-center">Loading skills...</div>;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-up">
            My <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-up animation-delay-100">
            I continuously learn and work with various technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <SkillCard key={category.name} category={category} index={index} />
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-gray-500">No skills found. Add them in Admin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;