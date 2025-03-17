import { MermaidDiagram } from "@/components/MermaidDiagram";

export default function DocumentationPage() {
  const pageFlowChart = `graph TD
    Landing["/"] --> SignIn["/sign-in"]
    Landing --> SignUp["/sign-up"]
    SignIn --> Dashboard["/dashboard"]
    SignUp --> Dashboard
    
    Dashboard --> Posts["/posts"]
    Dashboard --> Templates["/templates"]
    Dashboard --> Settings["/settings"]
    Dashboard --> SignOut["/sign-out"]
    
    Posts --> NewPost["/posts/new"]
    Posts --> EditPost["/posts/[id]"]
    
    Templates --> NewTemplate["/templates/new"]
    Templates --> EditTemplate["/templates/[id]"]

    classDef landing fill:#831843,stroke:#fce7f3,stroke-width:2px,color:#fce7f3,font-weight:bold
    classDef dashboard fill:#1e3a8a,stroke:#dbeafe,stroke-width:2px,color:#dbeafe,font-weight:bold
    classDef content fill:#14532d,stroke:#dcfce7,stroke-width:2px,color:#dcfce7,font-weight:bold

    class Landing landing
    class Dashboard dashboard
    class Posts,Templates,NewPost,EditPost,NewTemplate,EditTemplate content`;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">PostComposer Documentation</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Page Flow</h2>
          <div className="p-6 bg-card rounded-lg shadow-lg">
            <MermaidDiagram chart={pageFlowChart} className="overflow-x-auto" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Page Descriptions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium mb-2">Public Pages</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Landing Page (/):</strong> Main marketing page with
                  feature overview
                </li>
                <li>
                  <strong>Sign In (/sign-in):</strong> User authentication page
                </li>
                <li>
                  <strong>Sign Up (/sign-up):</strong> New user registration
                  page
                </li>
                <li>
                  <strong>Sign Out (/sign-out):</strong> Session termination
                  page
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-2">Protected Pages</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Dashboard (/dashboard):</strong> Main application
                  interface
                </li>
                <li>
                  <strong>Posts (/posts):</strong> Post management and creation
                </li>
                <li>
                  <strong>Templates (/templates):</strong> Template management
                </li>
                <li>
                  <strong>Settings (/settings):</strong> User preferences and
                  account settings
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
