import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Monitor, Linkedin, Twitter } from "lucide-react";

interface PostPreviewProps {
  content: {
    linkedin?: string;
    twitter?: string;
  };
  showDeviceToggle?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function PostPreview({
  content,
  showDeviceToggle = true,
  activeTab = "linkedin",
  onTabChange,
}: PostPreviewProps) {
  const [deviceView, setDeviceView] = useState<"mobile" | "desktop">("desktop");

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Preview</h2>

        {showDeviceToggle && (
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
            <button
              onClick={() => setDeviceView("mobile")}
              className={`p-1.5 rounded-md ${
                deviceView === "mobile"
                  ? "bg-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label="Mobile view"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceView("desktop")}
              className={`p-1.5 rounded-md ${
                deviceView === "desktop"
                  ? "bg-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-label="Desktop view"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="linkedin" className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center space-x-2">
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="linkedin" className="mt-0">
          <div
            className={`border border-gray-200 rounded-lg overflow-hidden ${
              deviceView === "mobile" ? "max-w-[375px] mx-auto" : "w-full"
            }`}
          >
            <div className="bg-[#f3f2ef] p-2 border-b border-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium">Jane Smith</div>
                  <div className="text-xs text-gray-500">
                    Product Manager • Just now
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white">
              {content.linkedin ? (
                <div className="whitespace-pre-line text-sm">
                  {content.linkedin}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">
                  LinkedIn preview will appear here.
                </div>
              )}
            </div>
            <div className="bg-white border-t border-gray-200 p-2 flex space-x-4">
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Like
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Comment
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Share
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="twitter" className="mt-0">
          <div
            className={`border border-gray-200 rounded-lg overflow-hidden ${
              deviceView === "mobile" ? "max-w-[375px] mx-auto" : "w-full"
            }`}
          >
            <div className="bg-white p-3 border-b border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-sm">Jane Smith</span>
                    <span className="text-gray-500 text-sm ml-1">
                      @janesmith
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      • Just now
                    </span>
                  </div>
                  <div className="mt-1 text-sm">
                    {content.twitter ? (
                      <div>{content.twitter}</div>
                    ) : (
                      <div className="text-gray-400 italic">
                        Twitter preview will appear here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-t border-gray-200 p-2 flex justify-around">
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Reply
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Retweet
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Like
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <span className="w-4 h-4 bg-gray-200 rounded-full mr-1"></span>
                Share
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
