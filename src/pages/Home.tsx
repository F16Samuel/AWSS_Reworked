
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Play, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast({
        title: "Image uploaded successfully!",
        description: `Selected: ${file.name}`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      toast({
        title: "Image uploaded successfully!",
        description: `Selected: ${file.name}`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const handleRunModel = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Running model...",
      description: "Your image is being processed",
    });
    
    // Here you would connect to your backend
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      toast({
        title: "Processing...",
        description: "Uploading and classifying the image.",
      });

      const response = await axios.post("http://localhost:5000/api/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { category, confidence } = response.data;

      toast({
        title: `Classification: ${category}`,
        description: `Confidence: ${(confidence * 100).toFixed(2)}%`,
      });
    } catch (error: any) {
      toast({
        title: "Classification Failed",
        description: error?.response?.data?.message || "Server error",
        variant: "destructive",
      });
      console.error("Error classifying image:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-awss text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Most Advanced
              <br />
              <span className="text-green-200">Waste Classification Model</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
              Upload the image you want to classify and get the result in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Upload Area */}
            <Card className="p-8 border-2 border-dashed border-emerald-300 bg-gradient-to-br from-white to-emerald-50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-emerald-300 hover:border-emerald-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="file-upload"
                  />
                  
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {selectedFile && imagePreview ? (
                        // Image preview UI
                        <div className="space-y-4">
                          <img
                            src={imagePreview}
                            alt="Uploaded Preview"
                            className="mx-auto max-h-60 rounded-md border border-emerald-300 shadow-md"
                          />
                          <div>
                            <p className="text-lg font-medium text-emerald-700 text-center">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500 text-center">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : selectedFile ? (
                        // Fallback in case preview URL isn’t available (rare case)
                        <div className="space-y-4">
                          <ImageIcon className="h-12 w-12 text-emerald-600 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-emerald-700 text-center">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500 text-center">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Default prompt UI
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 text-emerald-500 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-700">
                              Drop your image here or click to browse
                            </p>
                            <p className="text-sm text-gray-500">
                              Supports: JPG, PNG, GIF (Max 10MB)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3"
                  >
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Image
                  </Button>
                  
                  <Button
                    onClick={handleRunModel}
                    disabled={!selectedFile}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Run Model
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Information Panel */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Smart Waste Classification
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our advanced AI model can accurately classify waste into multiple categories, 
                helping you make informed decisions about proper disposal and recycling.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Multi-layer Classification</h3>
                    <p className="text-gray-600">Identifies biodegradability, recyclability, and material type</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Results</h3>
                    <p className="text-gray-600">Get instant classification results in seconds</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">High Accuracy</h3>
                    <p className="text-gray-600">Trained on thousands of waste images for precision</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-awss-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose AWSS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our system combines cutting-edge AI with practical waste management solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">AI</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced AI Model</h3>
                <p className="text-gray-600">
                  State-of-the-art machine learning algorithms trained on comprehensive waste datasets
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Get classification results in seconds with our optimized processing pipeline
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">
                  Promoting sustainable waste management and environmental consciousness
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
