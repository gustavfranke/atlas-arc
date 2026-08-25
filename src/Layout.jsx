import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@200;300;400;500;600&display=swap');
        
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        
        html { scroll-behavior: smooth; }
        
        body {
          background-color: #0a0a0a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection {
          background-color: rgba(201, 169, 110, 0.3);
          color: #f5f0e8;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #2a2520; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3a3530; }
      `}</style>
      {children}
    </div>
  );
}