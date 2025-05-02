export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white mt-8 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} ReHacktor. Tutti i diritti riservati.</p>
          <p className="text-xs text-gray-400">Powered by RAWG.io & Supabase</p>
        </div>
      </footer>
    );
  }
  