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
      <div className="directrefelr-container">
        <h1 className="directrefelr-title">Direct Referrals {referrals.length}</h1>
        {data.parent !== null && (
        <div className="directrefelr-parentBox">
          <div className="directrefelr-imageContainer">
            <img
              src={data.parent.profile_image_url ? data.parent.profile_image_url : character}
              alt="parent"
              className="directrefelr-image"
            />
          </div>
          <h3 className="directrefelr-name">{data.parent.name}</h3>
          <p className="directrefelr-email">{data.parent.email}</p>
          <motion.div
          className="directrefelr-lineFromParent"
          initial={{ height: 0 }}
          animate={{ height: "50px" }}
          transition={{ duration: 0.5 }}
        />
        </div>
        )}
  
        <div className="directrefelr-intermediateBox">
          <div className="directrefelr-imageContainer">
            <img
              src={accImg}
              alt="Me"
              className="directrefelr-image"
            />
          </div>
          <h3 className="directrefelr-name">{data.me.name}</h3>
          {data.parent !== null && (
          <motion.div
          className="directrefelr-lineToChildren"
          initial={{ height: 0 }}
          animate={{ height: "60px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
        ></motion.div>
        )}
        </div>
  
        <div className="directrefelr-childrenContainer">
        <motion.div
          className="directrefelr-horizontalLine"
          style={{ width: lineWidth }}
          initial={{ width: 0 }}
          animate={{ width: lineWidth }}
          transition={{ duration: 0.5, delay: 0.6 }}
        ></motion.div>
          {data.children.map((child, index) => (
            <div key={index} className="directrefelr-childWrapper">
            <div className="directrefelr-arrow"></div>
            <motion.div
                className="directrefelr-childBox"
                style={{
                  border: child.has_subscription ? "3px solid #FFD700" : "1px solid #ddd",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.2 }}
              >
                <div className="directrefelr-imageContainer">
                  <img
                    src={child.profile_image_url ? child.profile_image_url : character}
                    alt={child.name}
                    className="directrefelr-image"
                  />
                </div>
                <h3 className="directrefelr-name">{child.name}</h3>
                <p className="directrefelr-email">{child.email}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
  };
  
  export default DirectReferrals;
  