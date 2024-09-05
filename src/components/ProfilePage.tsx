import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  ArrowLeft,
  ArrowRight,
  Plus,
} from "lucide-react";
import dummy from "@/assets/dummy.png";
import gridIcon from "@/assets/gridIcon.svg";

export default function AnimatedProfileUI() {
  const [activeTab, setActiveTab] = useState("aboutme");
  const [images, setImages] = useState([dummy, dummy, dummy]);
  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imagesPerPage = 3;
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages([...images, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigateImages = (direction: "left" | "right") => {
    setCurrentPage((prevPage) => {
      if (direction === "left") {
        return prevPage > 0 ? prevPage - 1 : totalPages - 1;
      } else {
        return prevPage < totalPages - 1 ? prevPage + 1 : 0;
      }
    });
  };

  return (
    <div className="flex justify-end items-center min-h-screen bg-[#25282d] p-8 mx-3 rounded-2xl">
      <div className="w-full max-w-2xl space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#353c44]  rounded-xl overflow-hidden shadow-lg shadow-black "
        >
          <HelpCircle className="text-gray-400 w-6 h-6 relative translate-x-2 translate-y-5" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute left-4 z-10"
          ></motion.div>
          <div className=" px-10 pb-4 ms-2">
            <div className="flex w-full gap-1 bg-[#171717] rounded-3xl shadow-inner py-2 px-2">
              {["About Me", "Experiences", "Recommended"].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab.toLowerCase().replace(" ", ""))
                  }
                  className={`relative flex-1  py-2 px-4 text-[18px] font-medium rounded-xl  overflow-hidden ${
                    activeTab === tab.toLowerCase().replace(" ", "")
                      ? "text-white fill-button"
                      : "text-gray-400 fill-button "
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-[#28292e] shadow-xl shadow-black "
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX:
                        activeTab === tab.toLowerCase().replace(" ", "")
                          ? 1
                          : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gray-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <span className="relative z-10">{tab}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            >
              <div className="flex items-start space-x-2">
                <img
                  src={gridIcon}
                  alt="gridIcon"
                  className="relative translate-y-8 -translate-x-3"
                />
                <p className="text-base text-gray-400">
                  {activeTab === "aboutme" && (
                    <>
                      Hello! I'm Dave, your sales rep here from Salesforce. I've
                      been working at this awesome company for 3 years now.
                      <br />
                      <br />I was born and raised in Albany, NY & have been
                      living in Santa Carla for the past 10 years my wife
                      Tiffany and my 4 year old twin daughters- Emma and Ella.
                      Both of them are just starting school, so my calender is
                      usually blocked between 9-10 AM. This is a...
                    </>
                  )}
                  {activeTab === "experiences" && (
                    <>My experiences include...</>
                  )}
                  {activeTab === "recommended" && <>I recommend...</>}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.hr
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-gray-700 "
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative bg-[#353c44] rounded-xl overflow-hidden  shadow-lg shadow-black"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 left-4 z-10"
          ></motion.div>
          <HelpCircle className="text-gray-400 w-6 h-6 relative translate-x-2 translate-y-5" />
          <div className="px-4 pb-6">
            <div className="flex items-center justify-between mb-11 me-5">
              <img
                src={gridIcon}
                alt="gridIcon"
                className="relative translate-y-28 -translate-x-1"
              />
              <div className="flex items-center space-x-2">
                <h2 className="text-xl relative -translate-x-24 bg-[#171717] px-9 py-3 rounded-2xl font-semibold text-white">
                  Gallery
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={addImage}
                  className="bg-[#40474f] mr-3 text-white text-[11px] font-bold py-[13px] px-5 rounded-full flex items-center transition-all duration-300 ease-in-out add-button "
                >
                  <Plus className="h-4 w-4 mr-1" />
                  ADD IMAGE
                </motion.button>
                <motion.button
                  onClick={() => navigateImages("left")}
                  className="bg-[#23272a]  text-white p-2 rounded-full nav-button"
                >
                  <ArrowLeft className="h-6 w-6" />
                </motion.button>
                <motion.button
                  onClick={() => navigateImages("right")}
                  className="bg-[#23272a]  text-white p-2 rounded-full nav-button"
                >
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
            <motion.div
              className="relative h-54 overflow-hidden"
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence initial={false} custom={currentPage}>
                <motion.div
                  key={currentPage}
                  custom={currentPage}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-3 ms-9"
                >
                  {images
                    .slice(
                      currentPage * imagesPerPage,
                      (currentPage + 1) * imagesPerPage
                    )
                    .map((src, index) => (
                      <motion.div
                        key={`${currentPage}-${index}`}
                        className="aspect-square relative overflow-hidden w-[175px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          rotate: -2,
                          zIndex: 1,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <motion.div
                          className="w-full h-full absolute inset-0"
                          whileHover={{
                            boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                          }}
                        >
                          <img
                            src={src}
                            alt={`Gallery image ${
                              currentPage * imagesPerPage + index + 1
                            }`}
                            className="w-full h-full object-cover highlight-img"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
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
