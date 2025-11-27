
import "./globals.css";



export const metadata = {
  title: "EventX",
  description: "An event management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         className={`bg-linear-to-br from-gray-950 via-zinc-900 to-stone-900 text-white`}
      >

        {/* Header */}

        <main className=" relative min-h-screen container mx-auto pt-40 md:pt-32">
          {/* glow */}
          <div>

          </div>

          <div>
            {children}

          </div>
          
          
          {/* Footer */}

        </main>
      </body>
    </html>
  );
}
