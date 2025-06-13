
import { Card, CardContent } from "@/components/ui/card";

const OurModel = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Understanding Our Model
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Learn how our waste classification model works, breaking down waste into multiple layers 
            based on biodegradability, recyclability, and reusability.
          </p>
        </div>

        {/* Model Visualization */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Classification tree */}
                  <div className="flex justify-center mt-8">
                    <img
                      src="/class.png"
                      alt="Classification Tree"
                      className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-emerald-200">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Multi-Layer Detection</h3>
              <p className="text-gray-600">
                Our model uses a hierarchical approach, starting from basic waste detection 
                to specific material classification.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-emerald-200">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sensor Integration</h3>
              <p className="text-gray-600">
                Combines IR and ultrasonic sensors for initial waste detection, 
                ensuring accurate trigger mechanisms.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 border-emerald-200">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Classification</h3>
              <p className="text-gray-600">
                Advanced algorithms determine biodegradability, recyclability, 
                and specific material types for optimal sorting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OurModel;
