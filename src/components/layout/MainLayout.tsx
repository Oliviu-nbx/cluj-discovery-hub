
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MainLayout = ({ 
  children, 
  title = "Cluj Compass - Discover the Best Places in Cluj-Napoca", 
  description = "Explore the best restaurants, cafes, attractions, and more in Cluj-Napoca with Cluj Compass." 
}: MainLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
