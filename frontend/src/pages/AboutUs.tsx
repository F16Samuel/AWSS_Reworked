import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  desc: string;
  github: string;
  linkedin: string;
  instagram: string;
  portfolio: string;
}

const AboutUs = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Shauviq Mishra",
      role: "Team Lead • Full Stack Developer",
      image: "/Shauviq.jpg",
      desc:
        "Led the entire technical architecture and development of the platform, managing frontend and backend workflows. Oversaw database integration, backend API logic, frontend routing, and coordinated task distribution across team members. Instrumental in ensuring seamless deployment and stability.",
      github: "https://github.com/Shauviq",
      linkedin: "https://www.linkedin.com/in/shauviqmishra/",
      instagram: "https://www.instagram.com/shauviqmishra/",
      portfolio: "https://shauviq.com",
    },
    {
      name: "Samar Verma",
      role: "Research Lead • ML Engineer • DevOps",
      image: "/Samar.jpg",
      desc:
        "Served as the Research Lead and Full Stack Developer, spearheading the design of the classification pipeline structure and handling requirement analysis for the project. Developed and trained Layer 2A (Paper vs Organic for Biodegradable waste), Layer 2B (Recyclable vs Non-Recyclable for Non-Biodegradable), and Layer 3 (Material-level classification into Metal, Glass, and Plastic). Led backend integrations between the ML models and the server, and revamped the frontend for improved responsiveness and result clarity. Focused on creating a robust, modular, and scalable system while ensuring technical alignment with real-world waste segregation needs.",
      github: "https://github.com/F16Samuel",
      linkedin: "https://www.linkedin.com/in/samar-verma-f16sam/?originalSubdomain=in",
      instagram: "https://www.instagram.com/samuel_f16sam/",
      portfolio: "https://samar-verma-pf.vercel.app/",
    },
    {
      name: "Aanan Chopra",
      role: "AI Developer • ML Model Specialist",
      image: "/Aanan.jpg",
      desc:
        "Engineered the foundational classification model (Layer 1) to differentiate biodegradable from non-biodegradable waste. Focused on data preprocessing, augmentation strategies, and hyperparameter tuning for robust classification performance. Contributed to model evaluation and dataset expansion.",
      github: "https://github.com/AananChopra",
      linkedin: "https://www.linkedin.com/in/aananchopra",
      instagram: "https://www.instagram.com/aananchopra",
      portfolio: "https://aanan.com/",
    },
  ];

  const [activeMemberIndex, setActiveMemberIndex] = useState<number | null>(null);

  const toggleMember = (index: number) => {
    setActiveMemberIndex(index === activeMemberIndex ? null : index);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-awss text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
          Meet Our Team
        </h1>
        <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
          The brilliant minds behind the Automatic Waste Segregation System
        </p>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-emerald-200 group cursor-pointer"
              onClick={() => toggleMember(index)}
            >
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] object-cover rounded-full border-4 border-white shadow-lg mx-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-2">{member.role}</p>

                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    activeMemberIndex === index
                      ? "max-h-[500px] opacity-100 mt-2"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed mb-4">{member.desc}</p>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 text-2xl text-gray-700">
                  <a href={member.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                  <a href={member.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href={member.portfolio} target="_blank" rel="noopener noreferrer"><CgWebsite /></a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-awss-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To revolutionize waste management through intelligent automation, making proper 
              waste segregation accessible and efficient for everyone while contributing to 
              a more sustainable future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">What We Believe</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Technology for Good</h4>
                    <p className="text-gray-600">Using AI to solve real-world environmental challenges</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Sustainable Future</h4>
                    <p className="text-gray-600">Contributing to a cleaner, more sustainable planet</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Innovation & Research</h4>
                    <p className="text-gray-600">Continuously improving through research and development</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white/70 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Project Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Classification Accuracy</span>
                    <span className="text-2xl font-bold text-emerald-600">87%+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Speed</span>
                    <span className="text-2xl font-bold text-emerald-600">&lt;3s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waste Categories</span>
                    <span className="text-2xl font-bold text-emerald-600">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Training Images</span>
                    <span className="text-2xl font-bold text-emerald-600">80K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
