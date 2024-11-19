import NewOrderstyles from './NewOrder.module.css';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import { FaLightbulb, FaLink, FaClock, FaDollarSign } from "react-icons/fa";
import srvric from "../../../../newui/photo/serveroorder.svg"
import link from "../../../../newui/photo/linkorder.svg"
import start from "../../../../newui/photo/startorder.svg"
import money from "../../../../newui/photo/mony.svg"
import end from "../../../../newui/photo/endorder.svg"
import Select from 'react-select';

const NewOrder = () => {
    const page = usePage().props;
    const services = page.services;
    const serviceOptions = services.map(service => ({
        value: service.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <img src={srvric} alt="YouTube Icon" style={{ width: '20px', marginRight: '8px' }} />
                {service.name}
            </div>
        ),
    }));

  return (
    <DashboardLayout>
      <h2 className={ NewOrderstyles.newOrderTitle}>New Order</h2>
      <div className={ NewOrderstyles.newOrderContainer}>
        <div className={ NewOrderstyles.orderForm}>
          <div className={ NewOrderstyles.priceSection}>
            <span className={ NewOrderstyles.priceLabel}>Price</span>
            <span className={ NewOrderstyles.priceValue}>$0.0</span>
          </div>

          {/* Select of Services */}
          <label className={ NewOrderstyles.orderLabel}>Select a service</label>
          <div className={ NewOrderstyles.inputWrapperordrer}>
            <Select
              options={serviceOptions}
              className={ NewOrderstyles.orderInput}
              styles={{ control: (base) => ({ ...base, fontSize: '15px' }) }}
              placeholder="Select a service"
              style={{fontSize:"15px"}}
            />
          </div>

          {/* Link of Order */}
          <label className={ NewOrderstyles.orderLabel}>Link of order</label>
          <div className={ NewOrderstyles.inputWrapperordrer}>
            <span className={ NewOrderstyles.inputIcon}>
            <img src={link} alt="Clock Icon" />
            </span>
            <input
              type="text"
              placeholder="Enter The link of order"
              style={{fontSize:"15px"}}
              className={ NewOrderstyles.orderInput}
            />
          </div>

          {/* Order Time Type */}
          <label className={ NewOrderstyles.orderLabel}>Order time type</label>
          <div className={ NewOrderstyles.timeInputs} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div className={ NewOrderstyles.inputWrapperordrer} style={{ flex: '1 1 45%', display: 'flex', alignItems: 'center' }}>
              <span className={ NewOrderstyles.inputIcon}>
                <img src={start} alt="Clock Icon" />
              </span>
              <input
                type="text"
                placeholder="Start Time"
                style={{fontSize:"15px", flex: '1'}}
                className={ NewOrderstyles.orderInput}
              />
            </div>
            <div className={ NewOrderstyles.inputWrapperordrer} style={{ flex: '1 1 45%', display: 'flex', alignItems: 'center' }}>
              <span className={ NewOrderstyles.inputIcon}>
                <img src={end} alt="Clock Icon" />
              </span>
              <input
                type="text"
                style={{fontSize:"15px", flex: '1'}}
                placeholder="End Time"
                className={ NewOrderstyles.orderInput}
              />
            </div>
          </div>

          {/* Amount */}
          <label className={ NewOrderstyles.orderLabel}>Amount</label>
          <div className={ NewOrderstyles.inputWrapperordrer}>
            <span className={ NewOrderstyles.inputIcon}>
            <img src={money} alt="Clock Icon" />
            </span>
            <input
              type="text"
              style={{fontSize:"15px"}}
              placeholder="Enter The amount"
              className={ NewOrderstyles.orderInput}
            />
          </div>

          <div className={ NewOrderstyles.buttonsContainer}>
            <button className={ NewOrderstyles.upgradeButton}>Send Request</button>
            <button className={ NewOrderstyles.cancelButton}>Cancel</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
