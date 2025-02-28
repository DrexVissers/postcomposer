"use client";

import MainLayout from "@/components/layout/MainLayout";
import {
  mockUser,
  mockCategories,
  mockTags,
  Category,
  Tag,
  mockTeams,
  mockTeamMembers,
  Team,
  User as UserType,
  UserRole,
} from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Linkedin,
  Twitter,
  CreditCard,
  User,
  Bell,
  Tag as TagIcon,
  Plus,
  X,
  Pencil,
  Save,
  Trash,
  UserPlus,
  Users,
  Shield,
  Check,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
  // Add state for categories and tags
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [tags, setTags] = useState<Tag[]>(mockTags);

  // State for new/edit category
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#3b82f6");

  // State for new/edit tag
  const [isEditingTag, setIsEditingTag] = useState(false);
  const [currentTag, setCurrentTag] = useState<Tag | null>(null);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#ef4444");

  // State for team management
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [teamMembers, setTeamMembers] = useState<UserType[]>(mockTeamMembers);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("editor");
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<UserType | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("editor");

  // Handle category actions
  const addCategory = () => {
    setIsEditingCategory(true);
    setCurrentCategory(null);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryColor("#3b82f6");
  };

  const editCategory = (category: Category) => {
    setIsEditingCategory(true);
    setCurrentCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description || "");
    setCategoryColor(category.color || "#3b82f6");
  };

  const saveCategory = () => {
    if (!categoryName.trim()) return;

    if (currentCategory) {
      // Edit existing category
      setCategories(
        categories.map((cat) =>
          cat.id === currentCategory.id
            ? {
                ...cat,
                name: categoryName,
                description: categoryDescription,
                color: categoryColor,
              }
            : cat
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: categoryName,
        description: categoryDescription,
        color: categoryColor,
      };
      setCategories([...categories, newCategory]);
    }

    setIsEditingCategory(false);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
  };

  // Handle tag actions
  const addTag = () => {
    setIsEditingTag(true);
    setCurrentTag(null);
    setTagName("");
    setTagColor("#ef4444");
  };

  const editTag = (tag: Tag) => {
    setIsEditingTag(true);
    setCurrentTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color || "#ef4444");
  };

  const saveTag = () => {
    if (!tagName.trim()) return;

    if (currentTag) {
      // Edit existing tag
      setTags(
        tags.map((t) =>
          t.id === currentTag.id ? { ...t, name: tagName, color: tagColor } : t
        )
      );
    } else {
      // Add new tag
      const newTag: Tag = {
        id: `tag-${Date.now()}`,
        name: tagName,
        color: tagColor,
      };
      setTags([...tags, newTag]);
    }

    setIsEditingTag(false);
  };

  const deleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  // Handle team member invitation
  const handleInviteMember = () => {
    // In a real app, this would send an invitation email
    // For now, we'll just close the dialog
    setIsInviteDialogOpen(false);
    setInviteEmail("");
    setInviteRole("editor");
  };

  // Handle role change
  const handleRoleChange = () => {
    if (selectedMember) {
      const updatedMembers = teamMembers.map((member) => {
        if (member.id === selectedMember.id) {
          return { ...member, role: newRole };
        }
        return member;
      });
      setTeamMembers(updatedMembers);

      // Also update the team members array in the teams
      const updatedTeams = teams.map((team) => {
        if (team.id === selectedMember.teamId) {
          const updatedTeamMembers = team.members.map((member) => {
            if (member.userId === selectedMember.id) {
              return { ...member, role: newRole };
            }
            return member;
          });
          return { ...team, members: updatedTeamMembers };
        }
        return team;
      });
      setTeams(updatedTeams);

      setIsEditRoleDialogOpen(false);
      setSelectedMember(null);
      setNewRole("editor");
    }
  };

  // Handle member removal
  const handleRemoveMember = (memberId: string) => {
    const memberToRemove = teamMembers.find((member) => member.id === memberId);
    if (memberToRemove && memberToRemove.teamId) {
      // Remove from teamMembers
      setTeamMembers(teamMembers.filter((member) => member.id !== memberId));

      // Remove from teams
      const updatedTeams = teams.map((team) => {
        if (team.id === memberToRemove.teamId) {
          return {
            ...team,
            members: team.members.filter(
              (member) => member.userId !== memberId
            ),
          };
        }
        return team;
      });
      setTeams(updatedTeams);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Get role badge color
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "admin":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "editor":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "viewer":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Account Settings
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="connections">Connected Accounts</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="categories">Categories & Tags</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
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

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-6 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                <span>Notification Preferences</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Notification Types
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <div>
                          <p className="font-medium">Post Status Updates</p>
                          <p className="text-sm text-gray-500">
                            Get notified when your post status changes
                          </p>
                        </div>
                      </div>
                      <Checkbox id="post-status" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-amber-500 mr-3" />
                        <div>
                          <p className="font-medium">Approval Requests</p>
                          <p className="text-sm text-gray-500">
                            Get notified when posts need your approval
                          </p>
                        </div>
                      </div>
                      <Checkbox id="approval-requests" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium">Scheduled Posts</p>
                          <p className="text-sm text-gray-500">
                            Get notified about scheduled post updates
                          </p>
                        </div>
                      </div>
                      <Checkbox id="scheduled-posts" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="font-medium">System Notifications</p>
                          <p className="text-sm text-gray-500">
                            Get notified about system updates and maintenance
                          </p>
                        </div>
                      </div>
                      <Checkbox id="system-notifications" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Notification Delivery
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-app Notifications</p>
                        <p className="text-sm text-gray-500">
                          Show notifications in the app
                        </p>
                      </div>
                      <Checkbox id="in-app" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">
                          Send notifications to your email
                        </p>
                      </div>
                      <Checkbox id="email" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Notification Display
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="notification-display-limit">
                        Maximum notifications to display
                      </Label>
                      <Select defaultValue="10">
                        <SelectTrigger
                          id="notification-display-limit"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select a limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 notifications</SelectItem>
                          <SelectItem value="10">10 notifications</SelectItem>
                          <SelectItem value="20">20 notifications</SelectItem>
                          <SelectItem value="50">50 notifications</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notification-retention">
                        Notification retention period
                      </Label>
                      <Select defaultValue="30">
                        <SelectTrigger
                          id="notification-retention"
                          className="w-full"
                        >
                          <SelectValue placeholder="Select a period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="mr-2">Save Preferences</Button>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Clear All Notifications
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Categories & Tags Tab */}
          <TabsContent value="categories" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800 flex items-center">
                  <TagIcon className="w-5 h-5 mr-2" />
                  <span>Categories</span>
                </h2>
                <Button
                  onClick={addCategory}
                  size="sm"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Category
                </Button>
              </div>

              {isEditingCategory && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-md font-medium mb-4">
                    {currentCategory ? "Edit Category" : "Add New Category"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">Name</Label>
                      <Input
                        id="category-name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Category name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-description">Description</Label>
                      <Input
                        id="category-description"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Category description"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-color">Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="category-color"
                          value={categoryColor}
                          onChange={(e) => setCategoryColor(e.target.value)}
                          className="w-10 h-10 rounded border-0"
                        />
                        <Input
                          value={categoryColor}
                          onChange={(e) => setCategoryColor(e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button onClick={saveCategory}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingCategory(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {categories.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No categories yet. Add your first category.
                  </p>
                ) : (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          {category.description && (
                            <p className="text-sm text-gray-500">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editCategory(category)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800 flex items-center">
                  <TagIcon className="w-5 h-5 mr-2" />
                  <span>Tags</span>
                </h2>
                <Button
                  onClick={addTag}
                  size="sm"
                  className="flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Tag
                </Button>
              </div>

              {isEditingTag && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-md font-medium mb-4">
                    {currentTag ? "Edit Tag" : "Add New Tag"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tag-name">Name</Label>
                      <Input
                        id="tag-name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="Tag name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tag-color">Color</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          id="tag-color"
                          value={tagColor}
                          onChange={(e) => setTagColor(e.target.value)}
                          className="w-10 h-10 rounded border-0"
                        />
                        <Input
                          value={tagColor}
                          onChange={(e) => setTagColor(e.target.value)}
                          className="w-32"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button onClick={saveTag}>
                        <Save className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditingTag(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {tags.length === 0 ? (
                  <p className="text-gray-500 text-center py-4 w-full">
                    No tags yet. Add your first tag.
                  </p>
                ) : (
                  tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg"
                      style={{ borderColor: tag.color }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: tag.color }}
                      ></div>
                      <span style={{ color: tag.color }}>{tag.name}</span>
                      <div className="flex space-x-1">
                        <button
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => editTag(tag)}
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => deleteTag(tag.id)}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Team Management</span>
                </h2>
                <Dialog
                  open={isInviteDialogOpen}
                  onOpenChange={setIsInviteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span>Invite Member</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your team. They&apos;ll
                        receive an email with instructions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="colleague@example.com"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select
                          value={inviteRole}
                          onValueChange={(value) =>
                            setInviteRole(value as UserRole)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsInviteDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleInviteMember}>
                        Send Invitation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Role Permissions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Owner</p>
                        <p className="text-xs text-gray-500">
                          Full access to all settings and billing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Admin</p>
                        <p className="text-xs text-gray-500">
                          Can manage team members and content
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Editor</p>
                        <p className="text-xs text-gray-500">
                          Can create and edit content
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Viewer</p>
                        <p className="text-xs text-gray-500">
                          Can view content but not edit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Team Members
                  </h3>
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getRoleBadgeColor(member.role)}>
                            {member.role.charAt(0).toUpperCase() +
                              member.role.slice(1)}
                          </Badge>
                          {member.role !== "owner" && (
                            <div className="flex items-center">
                              <Dialog
                                open={
                                  isEditRoleDialogOpen &&
                                  selectedMember?.id === member.id
                                }
                                onOpenChange={(open) => {
                                  setIsEditRoleDialogOpen(open);
                                  if (open) {
                                    setSelectedMember(member);
                                    setNewRole(member.role);
                                  }
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Change Role</DialogTitle>
                                    <DialogDescription>
                                      Change the role for {member.name}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <Select
                                      value={newRole}
                                      onValueChange={(value) =>
                                        setNewRole(value as UserRole)
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="admin">
                                          Admin
                                        </SelectItem>
                                        <SelectItem value="editor">
                                          Editor
                                        </SelectItem>
                                        <SelectItem value="viewer">
                                          Viewer
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <DialogFooter>
                                    <Button
                                      variant="outline"
                                      onClick={() =>
                                        setIsEditRoleDialogOpen(false)
                                      }
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleRoleChange}>
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
