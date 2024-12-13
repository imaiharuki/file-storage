import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen">
      Sidebar
      <section className="flex h-full flex-1 flex-col">
        Mobile navigation header
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
