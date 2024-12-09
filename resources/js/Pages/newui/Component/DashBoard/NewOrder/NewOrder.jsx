
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import { FaLightbulb, FaLink, FaClock, FaDollarSign } from "react-icons/fa";
import srvric from "../../../../newui/photo/serveroorder.svg"
import link from "../../../../newui/photo/linkorder.svg"
import start from "../../../../newui/photo/startorder.svg"
import money from "../../../../newui/photo/mony.svg"
import end from "../../../../newui/photo/endorder.svg"
import Select from 'react-select';
import { useState } from 'react';
const NewOrder = () => {
    const [selectedService, setSelectedService] = useState(null);
    const page = usePage().props;
    const app_url = page.app_url;
    const services = page.services;
    const serviceOptions = services.map(service => ({
        value: service.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
                <img src={app_url+`/storage/${service.icon}`} alt="YouTube Icon" style={{ width: '20px', marginRight: '8px' }} />
                {service.name}
            </div>
        ),
    }));
    const handleServiceChange = (selectedOption) => {
      const service = services.find(service => service.id === selectedOption.value);
      setSelectedService(service);
    };

  return (
    <DashboardLayout>

      <h2 className="newOrderTitle">New Order</h2>
      <div className="newOrderContainer">
        <div className="neworder-orderForm">
          <div className="neworder-priceSection">
            <span className="neworder-priceLabel">Price</span>
            <span className="neworder-priceValue">$0.0</span>
          </div>

          {/* Select of Services */}
          <label className="neworder-orderLabel">Select a service</label>
          <div className="neworder-inputWrapperordrer">
            <Select
              options={serviceOptions}
              className="neworder-orderInput"
              styles={{ control: (base) => ({ ...base, fontSize: '15px' }) }}
              placeholder="Select a service"
              style={{fontSize:"15px"}}
              onChange={(option) => handleServiceChange(option)}
            />
          </div>

          {/* Link of Order */}
          <label className="neworder-orderLabel">Link of order</label>
          <div className="neworder-inputWrapperordrer">
            <span className="neworder-inputIcon">
            <img src={link} alt="Clock Icon" />
            </span>
            <input
              type="text"
              placeholder="Enter The link of order"
              style={{fontSize:"15px"}}
              className="neworder-orderInput"
            />
          </div>

          {selectedService && selectedService.time_type === 'custom' && (
          <>
          <label className="neworder-orderLabel">Order time type</label>
          <div className="neworder-timeInputs">
            <div className="neworder-inputWrapperordrer">
              <span className="neworder-inputIcon">
                <img src={start} alt="Clock Icon" />
              </span>
              <input
                type="text"
                placeholder="Start Time"
                className="neworder-orderInput1"
              />
            </div>
            <div className="neworder-inputWrapperordrer" >
              <span className="neworder-inputIcon">
                <img src={end} alt="Clock Icon" />
              </span>
              <input
                type="text"
                placeholder="End Time"
                className="neworder-orderInput"
              />
              </div>
              </div>
              </>
            )}

          {/* Amount */}
          <label className="neworder-orderLabel">Amount</label>
          <div className="neworder-inputWrapperordrer">
            <span className="neworder-inputIcon">
            <img src={money} alt="Clock Icon" />
            </span>
            <input
              type="text"
             
              placeholder="Enter The amount"
              className="neworder-orderInput"
            />
          </div>

          <div className="neworder-buttonsContainer">
            <button className="neworder-upgradeButton">Send Request</button>
            <button className="neworder-cancelButton">Cancel</button>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default NewOrder;
