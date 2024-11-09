import { useEffect, useState, useRef } from "react";
import AboutUs from "../../Component/Homepage/AboutUsSection/AboutUs";
import Hero from "../../Component/Homepage/HeroSection/Hero";
import Payment from "../../Component/Homepage/PaymentSection/Payment";
import { motion, useAnimation } from "framer-motion";
import Profile from "../../Component/Homepage/ProfileSection/Profile";
import Membership from "../../Component/Homepage/MembershipSection/Membership";
import Faq from "../../Component/Homepage/Faq/Faq";
import CustomerOpinions from "../../Component/Homepage/CustomerOpinions/CustomerOpinions";
import Layout from "../../Layout/Layout";

const Homepage = () => {
  const sectionRefs = useRef(new Array(6).fill(null));
  const animationControls = useRef(new Array(6).fill(null));
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track the scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(scrollPercentage * 360); // Scroll progress (circle rotation)
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observe visibility of sections for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = sectionRefs.current.indexOf(entry.target);
        if (entry.isIntersecting && index !== -1) {
          animationControls.current[index].start("visible"); 
        } else {
          animationControls.current[index].start("hidden");
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Smooth scroll to the section based on the hash in URL
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('#');
    if (urlParts[1]) {
      const element = document.getElementById(urlParts[1]);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[Hero, AboutUs, Profile, Membership, Payment, Faq].map((SectionComponent, index) => {
          const controls = useAnimation();
          animationControls.current[index] = controls;

          useEffect(() => {
            controls.start("hidden");
          }, [controls]);

          return (
            <motion.div
              key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              initial="visible"
              animate={controls}
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              style={styles.section}
            >
              <SectionComponent />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Scroll progress circle */}
      <motion.div
        style={{
          ...styles.progress,
          transform: `rotate(${scrollProgress}deg)`,
        }}
        transition={{ duration: 0.3 }}
      >
        <span style={styles.arrow}>↑</span>
      </motion.div>
    </Layout>
  );
};

const styles = {
  progress: {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "2px solid #333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#333",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 999,
  },
  arrow: {
    fontSize: "1.5rem",
  },
  section: {
    padding: "20px",
  },
};

export default Homepage;
