import { LockClosedIcon, UserIcon } from "@heroicons/react/20/solid";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import { EnvelopeIcon, PencilSquareIcon, PhoneIcon, CameraIcon } from "@heroicons/react/24/solid";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { useState } from 'react';
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { route } from "ziggy-js";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia"; // استخدام Inertia للتوجيه

const PersonalSettingsPage = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false); // Add state for image modal

  const { auth } = usePage().props;
  const user = auth.client;

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      const response = await axios.post(route('client.dashboard.change-password'), {
        current_password: password,
        new_password: newPassword,
        new_password_confirmation: confirmPassword
      });
      if (response.data.success) {
        toast.success('Password changed successfully');
        setTimeout(() => {
          Inertia.reload();
          setShowPasswordModal(false);
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error('Passwords do not match');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (profileImage) {
        const formData = new FormData();
        formData.append("profile_image", profileImage);

        const response = await axios.post(route('client.dashboard.update-profile-image'), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          toast.success('Profile image updated successfully');
          setTimeout(() => {
            Inertia.reload();
          }, 2000);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Failed to update profile image");
      console.error(error);
    }
  };

  const handleChangeClick = () => {
    setProfileImage(null);
    setImagePreview(null);
    setIsImageSelected(false); // إعادة تعيين حالة الصورة
  };

  const handleImageModalToggle = () => {
    setShowImageModal(!showImageModal);
  };

  return (
    <DashboardLayout>
      <div className={`w-full h-auto mt-20 ${showPasswordModal ? 'blur-sm' : ''}`}>
        <WelcomeTab />
        <div className="w-full px-2 py-12 sm:px-0">
          <h3 className="text-2xl mb-4">Personal Settings</h3>
          <div className='w-full flex flex-col items-center justify-between space-y-4'>
           <div className="w-full py-4 px-80 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
 
</div>
<div className="w-full py-4 px-6 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-16 max-sm:w-28 p-3 cursor-pointer">
                    <CameraIcon className="text-primary" />
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <p className='text-black/70'>photo change</p>
                    <h4 className='text-black font-medium'>{user.username}</h4>
                    <div className="flex items-center space-x-4">
      
    </div>
                  </div>
                </div>
                <PencilSquareIcon className='w-8 text-primary cursor-pointer' 
                  onClick={handleImageModalToggle}/>
              </div>
            </div>

 <div className="w-full py-4 px-6 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-16 max-sm:w-28 p-3 cursor-pointer">
                    <UserIcon className="text-primary" />
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <p className='text-black/70'>Username</p>
                    <h4 className='text-black font-medium'>{user.username}</h4>
                  </div>
                </div>
                <PencilSquareIcon className='w-8 text-primary cursor-pointer' />
              </div>
            </div>
           

            <div className="w-full py-4 px-6 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-16 max-sm:w-28 p-3 cursor-pointer">
                    <EnvelopeIcon className="text-primary" />
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <p className='text-black/70'>Email</p>
                    <h4 className='text-black font-medium'>{user.email}</h4>
                  </div>
                </div>
                <PencilSquareIcon className='w-8 text-primary cursor-pointer' />
              </div>
            </div>

            <div className="w-full py-4 px-6 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-16 max-sm:w-28 p-3 cursor-pointer">
                    <PhoneIcon className="text-primary" />
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <p className='text-black/70'>Number</p>
                    <h4 className='text-black font-medium'>{user.phone}</h4>
                  </div>
                </div>
                <PencilSquareIcon className='w-8 text-primary cursor-pointer' />
              </div>
            </div>

            <div className="w-full py-4 px-6 rounded-2xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-16 max-sm:w-28 p-3 cursor-pointer">
                    <LockClosedIcon className="text-primary" />
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <p className='text-black/70'>Password</p>
                    <h4 className='text-black font-bold'>********</h4>
                  </div>
                </div>
                <PencilSquareIcon
                  className='w-8 text-primary cursor-pointer'
                  onClick={() => setShowPasswordModal(!showPasswordModal)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-5">
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black p-2 rounded"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-black p-2 rounded"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-black p-2 rounded"
            />
            <button onClick={handlePasswordChange} className="bg-primary text-white p-2 rounded">
              Change Password
            </button>
            <button 
              onClick={() => setShowPasswordModal(false)} 
              className="text-white bg-black border border-black p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center space-y-5">
            {isImageSelected && (
              <>
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-20 h-20 rounded-full shadow-sm" // صورة شخصية دائرية مع ظل خفيف
                />
              </>
            )}
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>
            {isImageSelected && (
              <button
                onClick={handleUpdateClick}
                className="bg-primary text-white p-2 rounded"
              >
                Update Image
              </button>
            )}
            <button 
              onClick={handleImageModalToggle} 
              className="text-white bg-black border border-black p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PersonalSettingsPage;
