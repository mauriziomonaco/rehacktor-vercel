import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 container mx-auto px-4 py-6 gap-6">
        {/* Sidebar */}
        <aside className="w-64 hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main section */}
        <main className="flex-1 space-y-4">
          <Searchbar />
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
