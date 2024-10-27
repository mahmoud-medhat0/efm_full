import { useState } from 'react';
import { LinkIcon, PhotoIcon } from "@heroicons/react/20/solid";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import Input from "../../../components/schema/Input";
import { BanknotesIcon, ShoppingBagIcon, ClockIcon } from "@heroicons/react/24/solid";
import Button from "../../../components/schema/Button";
import ServicesSelector from "../../../components/dashboard/membships/ServicesSelector";
import RootLayout from "../Layout";
import { usePage } from "@inertiajs/inertia-react";
import axios from 'axios';
import { route } from 'ziggy-js';
import toast from 'react-hot-toast';
import YouTubeInfoCard from "../../../components/cards/YouTubeInfoCard";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Selector from "../../../components/dashboard/membships/Selector";
const NewOrderPage = () => {
  const page = usePage();
  const [categories,setCategories] = useState(page.props.categories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [selectedService,setSelectedService] = useState(page.props.services[0]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isValid,setIsValid] = useState(false);
  const [price,setPrice] = useState(0);
  const [amount,setAmount] = useState(0);
  const [videoDetails,setVideoDetails] = useState({
    thumbnail: '',
    title: '',
    viewCount: '',
    likeCount: '',
    duration: '',
  });
  const [selectedOrderType, setSelectedOrderType] = useState();
  const [startTime,setStartTime] = useState(0);
  const [endTime,setEndTime] = useState(0);
  const handleConfirmClick = () => {
    if (isConfirmed) {
      setIsConfirmed(false);
      setIsValid(false);
      setPrice(0);
      setVideoDetails({
        thumbnail: '',
        title: '',
        viewCount: '',
        likeCount: '',
        duration: '',
      });
      setAmount(0);
      return;
    }
    setIsConfirmLoading(true);
    const url = document.getElementById('link').value;
    axios.post(route('client.dashboard.yt-video-details'), { url }).then((res) => {
      if(res.data.success){
        setIsValid(true);
        toast.success(res.data.message,{
          position:"top-right",
          duration:4000
        });
        setIsConfirmed(!isConfirmed);
        setIsConfirmLoading(false);
        setVideoDetails({
          thumbnail: res.data.thumbnail,
          title: res.data.title,
          viewCount: res.data.viewCount,
          likeCount: res.data.likeCount,
          duration: res.data.duration,
        });
      }else if(!res.data.success){
        setIsValid(false);
        toast.error(res.data.errors.url, {
          position: "top-right",
          duration: 4000,
      });
      setIsConfirmLoading(false);

      }
      setIsConfirmLoading(false);
    });
  };
  const handleServiceChange = (service) => {
    setSelectedService(service);
  };
  const handlePrice = () => {
    try {
      if(isValid){
      const amountElement = document.getElementById('number');
      if (amountElement) {
        const minute_cost = selectedService.minute_cost;
        const durationParts = videoDetails.duration.split(':');
        const videominutes = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]) + parseInt(durationParts[2]) / 60;
        const price = (amountElement.value??0) * (minute_cost * videominutes);
        setPrice(parseFloat(price).toFixed(2));
      } else {
        console.log('Amount element not found');
      }}
      else{
        toast.error('Please confirm the video details first', {
          position: "top-right",
          duration: 4000,
      });
      setPrice(0);
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    handlePrice();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('service_id', selectedService.id);
    formData.append('link', document.getElementById('link').value);
    formData.append('amount', amount);
    formData.append('price', price);
    formData.append('order_type', selectedOrderType);
    if(selectedOrderType==='custom_time'){
      formData.append('time_start', startTime);
      formData.append('time_end', endTime);
    }
    if(selectedService.is_category_required){
      selectedCategoryIds.forEach((id) => formData.append('categories[]', id)); // Correctly append category IDs as an array
    }
    if(!isValid){
      toast.error('Please confirm the video details first', {
        position: "top-right",
        duration: 4000,
    });
    return;
    }
    if(amount<selectedService.min || amount>selectedService.max){
      toast.error('Amount must be between '+selectedService.min+' and '+selectedService.max, {
        position: "top-right",
        duration: 4000,
    });
    return;
    }
    axios.post(route('client.dashboard.new-order.post'), formData).then((res) => {
      if(res.data.success){
        toast.success(res.data.message,{
          position:"top-right",
          duration:4000
        });
      }
      else if(!res.data.success && res.data.errors){
        Object.keys(res.data.errors).forEach(field => {
          toast.error(res.data.errors[field], {
            position: "top-right",
            duration: 4000
          });
        });
      }
      else if(!res.data.success){
        toast.error(res.data.message,{
          position:"top-right",
          duration:4000
        });
      }
    });
  };
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedCategories = typeof value === 'string' ? value.split(',') : value;
    setSelectedCategories(selectedCategories);
    setSelectedCategoryIds(selectedCategories.map(cat => cat.id));
  };
  const handleOrderTypeChange = (method) => {
    setSelectedOrderType(method.value);
  };
  return (
    <RootLayout>
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-2xl font-medium mb-2">New Order</h3>
          <div className="space-y-3 mb-5">
            <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="services" className="block text-lg font-medium mb-2">Select of Services</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] px-2 rounded-lg'>
                <LinkIcon className="h-6 w-6 text-primary" />
                <ServicesSelector services={page.props.services} onChange={handleServiceChange}/>
              </div>
            </div>
            <div>
              <label htmlFor="link" className="block text-lg font-medium mb-2">Link of Order</label>
              <div className='w-full flex flex-row items-start gap-2 border border-[#6377863D] p-2 rounded-lg'>
                <LinkIcon className="h-6 w-6 text-primary" />
                <Input id="link" className="w-full bg-transparent" placeholder='Enter link of order' aria-describedby="username-help" disabled={isConfirmLoading||isConfirmed} />
                <Button size="sm2" style={{backgroundColor: isConfirmed ? '#3AB95A' : '#6377863D'}} className="ml-2 " onClick={handleConfirmClick} disabled={isConfirmLoading||isConfirmed} isLoading={isConfirmLoading}                >
                  {isConfirmed ? 'Cancel' : 'Confirm'}
                </Button>
              </div>
            </div>
            <div className='w-full flex flex-row items-center justify-center'>
              {isValid && <YouTubeInfoCard thumbnail={videoDetails.thumbnail} title={videoDetails.title} viewCount={videoDetails.viewCount} likeCount={videoDetails.likeCount} duration={videoDetails.duration} />}
            </div>
            {selectedService.is_category_required && <div>
            <label htmlFor="categories" className="block text-lg font-medium">Categories</label>
            <div className='w-full flex flex-row items-center justify-center'> 
            <Select
              className='w-full'
              style={{width:'100%',height:'50px',paddingTop:'20px'}}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.map((cat) => cat.name).join(', ')}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category}>
                  <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                  <ListItemText primary={category.name} />
                </MenuItem>
              ))}
            </Select>
            </div>
            </div>}
            <div>
              <label htmlFor="order_type" className="block text-lg font-medium mb-2">Order Time Type</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] px-2 rounded-lg'>
                <ClockIcon className="h-6 w-6 text-primary" />
                <Selector methods={[{name: 'Full Time', value: 'full_time'}, {name: 'Custom Time', value: 'custom_time'}]} onChange={handleOrderTypeChange} />
              </div>
            </div>
            {selectedOrderType==='custom_time' && 
            <div className='w-full flex flex-col items-start justify-center gap-2'>
              <label htmlFor="time_start" className="block text-lg font-medium mb-2">Start Time</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] p-2 rounded-lg'>
                <ClockIcon className="h-6 w-6 text-primary" />
                <Input id="time_start" className="w-full bg-transparent" aria-describedby="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <label htmlFor="time_end" className="block text-lg font-medium mb-2">End Time</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] p-2 rounded-lg'>
                <ClockIcon className="h-6 w-6 text-primary" />
                <Input id="time_end" className="w-full bg-transparent" aria-describedby="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </div>
            </div> 
            }
            <div>
              <label htmlFor="number" className="block text-lg font-medium mb-2">Amount</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] p-2 rounded-lg'>
                <ShoppingBagIcon className="h-6 w-6 text-primary" />
                <Input id="number" min={selectedService.min} max={selectedService.max} value={amount} type='number' className="w-full bg-transparent" placeholder='1000' aria-describedby="amount of order" onChange={handlePrice,handleAmount} />
              </div>
            </div>
            <div>
              <label htmlFor="number" className="block text-lg font-medium mb-2">Price</label>
              <div className='w-full flex flex-row items-center gap-2 border border-[#6377863D] p-2 rounded-lg'>
                <BanknotesIcon className="h-6 w-6 text-primary" />
                <Input id="number" className="w-full bg-transparent" aria-describedby="Price" value={price} disabled />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between space-x-5 mt-6">
              <Button fullWidth type="submit">Submit</Button>
              <Button fullWidth className=" text-black " variant={"cancel"}>Cancel</Button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default NewOrderPage;