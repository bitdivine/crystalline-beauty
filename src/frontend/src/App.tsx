import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { SnowfallBackground } from './components/SnowfallBackground';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SnowfallBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Gallery />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
