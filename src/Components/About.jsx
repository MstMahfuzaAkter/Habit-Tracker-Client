import { LuRotate3D } from "react-icons/lu";
import { HiOutlineLightBulb, HiOutlineRocketLaunch, HiOutlineShieldCheck } from "react-icons/hi2";
import { MdOutlineGroups, MdAutoGraph } from "react-icons/md";

const About = () => {
  const stats = [
    { label: "Active Users", value: "10K+" },
    { label: "Habits Tracked", value: "1M+" },
    { label: "Completion Rate", value: "85%" },
    { label: "App Rating", value: "4.9/5" },
  ];

  const features = [
    {
      title: "Data-Driven Insights",
      description: "Visualize your progress with beautiful, easy-to-read charts that help you identify patterns.",
      icon: <MdAutoGraph className="text-primary" />,
    },
    {
      title: "Community Driven",
      description: "Explore public habits shared by top performers and integrate them into your routine.",
      icon: <MdOutlineGroups className="text-secondary" />,
    },
    {
      title: "Privacy First",
      description: "Your data is encrypted and secure. You choose what to keep private and what to share.",
      icon: <HiOutlineShieldCheck className="text-accent" />,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-3xl rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-3xl rotate-12">
              <LuRotate3D className="text-5xl text-primary" />
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tighter mb-6 bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent">
            Master Your Routine. <br /> Build Your Future.
          </h1>
          <p className="text-lg lg:text-xl text-base-content/70 leading-relaxed max-w-2xl mx-auto">
            Habitly isn't just a tracker; it's a personal growth engine designed to help you 
            turn small daily actions into massive life-changing achievements.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-base-content/5 bg-base-200/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl lg:text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-sm lg:text-base font-bold opacity-60 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Features Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mission Text */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-black mb-6 flex items-center gap-3">
              <HiOutlineLightBulb className="text-primary" /> Our Mission
            </h2>
            <p className="text-lg lg:text-xl text-base-content/70 mb-8 leading-relaxed">
              We started Habitly with a simple realization:{" "}
              <strong className="text-primary text-xl lg:text-2xl">Consistency is the superpower of the 21st century.</strong>{" "} 
              Our mission is to provide the world's most intuitive platform for discipline, 
              removing the friction between who you are and who you want to be.
            </p>
            
            {/* Features */}
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-3xl lg:text-4xl">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg lg:text-xl">{f.title}</h4>
                    <p className="text-base-content/60">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] rotate-3 relative overflow-hidden group">
              {/* Replace with a real image or high-quality illustration */}
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <HiOutlineRocketLaunch className="text-[12rem] lg:text-[14rem] text-primary/40 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
