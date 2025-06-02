
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Shauviq Mishra",
      role: "Project Lead & Full Stack Web Developer",
      image: "/Shauviq.jpg",
      desc: "Managing both frontend & backend, ensuring seamless integration of the ML model with the web interface.",
      github: "https://github.com/Shauviq",
      linkedin: "https://www.linkedin.com/in/shauviqmishra/",
      instagram: "https://www.instagram.com/shauviqmishra/",
      portfolio: "https://shauviq.com",
    },
    {
      name: "Samar Verma",
      role: "Research Lead & Full Stack Web Developer",
      image: "/Samar.jpg",
      desc: "Handling research, documentation, and patent processes to ensure legal and technical compliance.",
      github: "https://github.com/F16Samuel",
      linkedin: "https://www.linkedin.com/in/samar-verma-f16sam/?originalSubdomain=in",
      instagram: "https://www.instagram.com/samuel_f16sam/",
      portfolio: "https://samar-verma-pf.vercel.app/",
    },
    {
      name: "Aanan Chopra",
      role: "Artificial Intelligence & Machine Learning Engineer",
      image: "/Aanan.jpg",
      desc: "Developing and optimizing the AI model for accurate waste classification across multiple layers.",
      github: "https://github.com/AananChopra",
      linkedin: "https://www.linkedin.com/in/aananchopra",
      instagram: "https://www.instagram.com/aananchopra",
      portfolio: "https://aanan.com/",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-awss text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
              The brilliant minds behind the Automatic Waste Segregation System
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-emerald-200 group">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                   <img
                      src={member.image}
                      alt={member.name}
                      className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] object-cover rounded-full border-4 border-white shadow-lg mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.desc}</p>
                  {/* Social Icons */}
                  <div className="flex justify-center gap-4 mt-4 text-2xl text-gray-700">
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a>
                    <a href={member.portfolio} target="_blank" rel="noopener noreferrer">
                      <CgWebsite />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                    <span className="text-2xl font-bold text-emerald-600">95%+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Processing Speed</span>
                    <span className="text-2xl font-bold text-emerald-600">&lt;3s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Waste Categories</span>
                    <span className="text-2xl font-bold text-emerald-600">8+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Training Images</span>
                    <span className="text-2xl font-bold text-emerald-600">10K+</span>
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
