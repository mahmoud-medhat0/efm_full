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
        <motion.div
          ref={(el) => (sectionRefs.current[0] = el)}
          initial="visible"
          animate={animationControls.current[0]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <Hero />
        </motion.div>

        <motion.div
          ref={(el) => (sectionRefs.current[1] = el)}
          initial="visible"
          animate={animationControls.current[1]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <AboutUs />
        </motion.div>

        <motion.div
          ref={(el) => (sectionRefs.current[2] = el)}
          initial="visible"
          animate={animationControls.current[2]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <Profile />
        </motion.div>

        <motion.div
          ref={(el) => (sectionRefs.current[3] = el)}
          initial="visible"
          animate={animationControls.current[3]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <Membership />
        </motion.div>

        <motion.div
          ref={(el) => (sectionRefs.current[4] = el)}
          initial="visible"
          animate={animationControls.current[4]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <Payment />
        </motion.div>

        <motion.div
          ref={(el) => (sectionRefs.current[5] = el)}
          initial="visible"
          animate={animationControls.current[5]}
          variants={sectionVariants}
          transition={{ duration: 0.3 }}
          style={styles.section}
        >
          <Faq />
        </motion.div>
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
