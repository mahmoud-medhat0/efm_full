import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import character from "../../../../../assets/character.jpg";
import { motion } from "framer-motion";

const DirectReferrals = () => {
  const { referrals, referral_count, parent, me } = usePage().props;
  console.log(parent);
    const data = {
      parent: parent,
      me: me,
      children: referrals,
    };
    const accImg = me.profile_image ? me.profile_image_url : character;
    const lineWidth = `${referrals.length * 8}em`;
    return (
      <DashboardLayout>
      <div style={styles.container}>
        <h1 style={styles.title}>Direct Referrals {referrals.length}</h1>
        {data.parent !== null && (
        <div style={styles.parentBox}>
          <div style={styles.imageContainer}>
            <img
              src={data.parent.profile_image_url ? data.parent.profile_image_url : character}
              alt="parent"
              style={styles.image}
            />
          </div>
          <h3 style={styles.name}>{data.parent.name}</h3>
          <p style={styles.email}>{data.parent.email}</p>
          <motion.div
          style={styles.lineFromParent}
          initial={{ height: 0 }}
          animate={{ height: "50px" }}
          transition={{ duration: 0.5 }}
        />
        </div>
        )}
  
        <div style={styles.intermediateBox}>
          <div style={styles.imageContainer}>
            <img
              src={accImg}
              alt="Me"
              style={styles.image}
            />
          </div>
          <h3 style={styles.name}>{data.me.name}</h3>
          {data.parent !== null && (
          <motion.div
          style={styles.lineToChildren}
          initial={{ height: 0 }}
          animate={{ height: "60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.div>
        )}
        </div>
  
        <div style={styles.childrenContainer}>
        <motion.div
          style={{ ...styles.horizontalLine, width: lineWidth }}
          initial={{ width: 0 }}
          animate={{ width: lineWidth }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
          {data.children.map((child, index) => (
            <div key={index} style={styles.childWrapper}>
            <div style={styles.arrow}></div>
            <motion.div
                style={{
                  ...styles.childBox,
                  border: child.has_subscription ? "3px solid #FFD700" : "1px solid #ddd",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={child.profile_image_url ? child.profile_image_url : character}
                    alt={child.name}
                    style={styles.image}
                  />
                </div>
                <h3 style={styles.name}>{child.name}</h3>
                <p style={styles.email}>{child.email}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
  };
  
  const styles = {
    container: {
      textAlign: "center",
      margin: "50px auto",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      flexDirection: "column",
      alignItems: "center",
      overflow: "auto",
      paddingRight: "calc(20px + 1em)",
    },
    title: {
      fontSize: "24px",
      color: "#DFBC8A",
      marginBottom: "25px",
    },
    parentBox: {
      position: "relative",
      textAlign: "center",
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "15px",
      width: "200px",
      margin: "0 auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      border: "3px solid #d4af37",
    },
    intermediateBox: {
      position: "relative",
      textAlign: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: "10px",
      padding: "15px",
      width: "150px",
      margin: "55px auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      border: "3px solid #808892",
    },
    childrenContainer: {
      display: "flex",
      flexWrap: "nowrap",
      position: "relative",
      marginTop: "40px",
      gap: "20px",
      overflowX: "auto",
      maxHeight: "none",
    },
    childWrapper: {
      marginTop: "45px",
      position: "relative",
      display: "flex",
    },
    childBox: {
      textAlign: "center",
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "10px",
      width: "auto",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      position: "relative",
    },
    imageContainer: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      margin: "0 auto",
      position: "relative",
      top: "-45px",
    },
    image: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      position: "absolute",
      top: "10px",
      left: "10px",
    },
    lineFromParent: {
      position: "absolute",
      width: "2px",
      backgroundColor: "#ddd",
      bottom: "-50px",
      left: "50%",
      transform: "translateX(-50%)",
    },
    lineToChildren: {
      position: "absolute",
      width: "2px",
      backgroundColor: "#ddd",
      bottom: "-60px",
      left: "50%",
      transform: "translateX(-50%)",
      top: "-77px",
    },
    horizontalLine: {
      position: "absolute",
      height: "2px",
      backgroundColor: "#ddd",
      top: "0",
      zIndex: 1,
      left: "7%",
      transform: "translateX(0)",
    },
    arrow: {
      position: "absolute",
      width: "2px",
      height: "30px",
      backgroundColor: "#ddd",
      top: "-70px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1,
      clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
    },
    name: {
      fontSize: "16px",
      color: "#333",
      marginBottom: "5px",
    },
    email: {
      fontSize: "14px",
      color: "#777",
      marginTop: "-10px",
    },
    "@media (max-width: 768px)": {
      container: {
        padding: "10px",
        paddingRight: "calc(10px + 1em)",
      },
      parentBox: {
        width: "90%",
      },
      intermediateBox: {
        width: "80%",
      },
      childrenContainer: {
        flexWrap: "wrap",
        overflowX: "auto",
      },
      childBox: {
        width: "100px",
        padding: "5px",
      },
      imageContainer: {
        width: "60px",
        height: "60px",
      },
      image: {
        width: "40px",
        height: "40px",
      },
    },
  };
  
  
  export default DirectReferrals;
  