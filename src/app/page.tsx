import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Body />
      <Footer />
    </div>
  );
}