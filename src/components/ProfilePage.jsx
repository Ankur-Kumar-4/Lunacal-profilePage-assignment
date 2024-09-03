import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, HelpCircle, Plus } from "lucide-react";

export default function ProfileUI() {
  const [activeTab, setActiveTab] = useState("about");
  const [images, setImages] = useState([
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
    "/placeholder.svg?height=200&width=200",
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef(null);

  const imagesPerPage = 6;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages([...images, e.target?.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigateImages = () => {
    if (direction === "left") {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    } else {
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    }
  };

  const displayedImages = images.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <div className="flex justify-end min-h-screen bg-gray-900 p-8">
      <div className="w-full max-w-3xl space-y-6">
        <Card className="bg-gray-800 text-gray-200">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-gray-900">
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:bg-gray-700"
                  >
                    About Me
                  </TabsTrigger>
                  <TabsTrigger
                    value="experiences"
                    className="data-[state=active]:bg-gray-700"
                  >
                    Experiences
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommended"
                    className="data-[state=active]:bg-gray-700"
                  >
                    Recommended
                  </TabsTrigger>
                </TabsList>
                <HelpCircle className="text-gray-400" />
              </div>
              <TabsContent value="about" className="mt-0">
                <p className="text-sm text-gray-400">
                  Hello! I'm Dave, your sales rep here from Salesforce. I've
                  been working at this awesome company for 3 years now.
                  <br />
                  <br />I was born and raised in Albany, NY & have been living
                  in Santa Carla for about 10 years my wife Tiffany and my 4
                  year old twin daughters- Emma and Ella. Both of them are just
                  starting school, so my calender is usually blocked between
                  9-10 AM. This is a...
                </p>
              </TabsContent>
              <TabsContent value="experiences" className="mt-0">
                <p className="text-sm text-gray-400">
                  Experiences content goes here.
                </p>
              </TabsContent>
              <TabsContent value="recommended" className="mt-0">
                <p className="text-sm text-gray-400">
                  Recommended content goes here.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Gallery</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={addImage}>
                  <Plus className="h-4 w-4 mr-2" /> Add Image
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateImages("left")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateImages("right")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {displayedImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
