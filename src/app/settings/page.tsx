"use client";

import MainLayout from "@/components/layout/MainLayout";
import { mockUser } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Linkedin, Twitter, CreditCard, User, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Account Settings
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="connections">Connected Accounts</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span>Profile Information</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={mockUser.name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={mockUser.email}
                  />
                </div>

                <div className="pt-4">
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                <span>Subscription Details</span>
              </h2>

              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      Current Plan
                    </span>
                    <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                      {mockUser.subscription.plan.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="text-gray-800 font-medium capitalize">
                      {mockUser.subscription.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Renewal Date</span>
                    <span className="text-gray-800 font-medium">
                      {new Date(
                        mockUser.subscription.renewalDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-medium text-gray-800 mb-4">
                Available Plans
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 cursor-pointer">
                  <h4 className="font-medium mb-2">Free</h4>
                  <p className="text-2xl font-bold mb-4">
                    $0
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• 5 posts per month</li>
                    <li>• Basic templates</li>
                    <li>• Single platform</li>
                  </ul>
                  <button className="w-full py-1 border border-teal-600 text-teal-600 rounded-lg text-sm hover:bg-teal-50">
                    Current Plan
                  </button>
                </div>

                <div className="border-2 border-teal-500 rounded-lg p-4 relative">
                  <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                  <h4 className="font-medium mb-2">Pro</h4>
                  <p className="text-2xl font-bold mb-4">
                    $19
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• Unlimited posts</li>
                    <li>• All templates</li>
                    <li>• Multiple platforms</li>
                    <li>• Analytics</li>
                  </ul>
                  <button className="w-full py-1 bg-teal-600 text-white rounded-lg text-sm hover:bg-teal-700">
                    Current Plan
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 cursor-pointer">
                  <h4 className="font-medium mb-2">Enterprise</h4>
                  <p className="text-2xl font-bold mb-4">
                    $49
                    <span className="text-sm font-normal text-gray-500">
                      /mo
                    </span>
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-4">
                    <li>• Everything in Pro</li>
                    <li>• Team collaboration</li>
                    <li>• Custom templates</li>
                    <li>• Priority support</li>
                  </ul>
                  <button className="w-full py-1 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50">
                    Upgrade
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <button className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>
          </TabsContent>

          {/* Connected Accounts Tab */}
          <TabsContent value="connections" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                <span>Connected Social Accounts</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Linkedin className="w-6 h-6 text-blue-700 mr-3" />
                    <div>
                      <h3 className="font-medium">LinkedIn</h3>
                      <p className="text-sm text-gray-500">
                        {mockUser.connectedAccounts.linkedin
                          ? "Connected"
                          : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-3 py-1 rounded-lg text-sm ${
                      mockUser.connectedAccounts.linkedin
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                    }`}
                  >
                    {mockUser.connectedAccounts.linkedin
                      ? "Disconnect"
                      : "Connect"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Twitter className="w-6 h-6 text-blue-400 mr-3" />
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <p className="text-sm text-gray-500">
                        {mockUser.connectedAccounts.twitter
                          ? "Connected"
                          : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-3 py-1 rounded-lg text-sm ${
                      mockUser.connectedAccounts.twitter
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-teal-50 text-teal-600 hover:bg-teal-100"
                    }`}
                  >
                    {mockUser.connectedAccounts.twitter
                      ? "Disconnect"
                      : "Connect"}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>
                  Connecting your social accounts allows Levercast to publish
                  posts directly to your profiles. We use OAuth for secure
                  authentication and never store your passwords.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
