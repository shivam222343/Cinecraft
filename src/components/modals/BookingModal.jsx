import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import FileIcon from '../ui/FileIcon';
import UploadProgress from '../ui/UploadProgress';
import { submitBooking } from '../../utils/api';
import { isDocument, isImage, validateFileType, validateFileSize, formatFileSize, getFileType } from '../../utils/fileUtils';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_id: '',
    date: '',
    time: '',
    message: '',
    image: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadComplete, setUploadComplete] = useState(false);

  const stepTitles = ['Your Info', 'Schedule', 'Project Details', 'Review'];

  // Fetch services from admin-added services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Convert services to options format
  const serviceOptions = services.map(service => ({
    value: service.id.toString(),
    label: `${service.title} - $${service.price}`
  }));

  const timeOptions = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  // File upload handler with progress tracking
  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    try {
      setImageUploading(true);
      setUploadProgress(0);
      setUploadFileName(file.name);
      setUploadComplete(false);
      
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);
      
      // Simulate progress for better UX (since fetch doesn't support upload progress easily)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 200);
      
      const response = await fetch('http://localhost:5000/api/upload/image', {
        method: 'POST',
        body: formDataUpload,
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });
      
      clearInterval(progressInterval);
      
      const data = await response.json();
      if (data.success) {
        setUploadProgress(100);
        setUploadComplete(true);
        
        // Keep the success state visible for a moment
        setTimeout(() => {
          setUploadComplete(false);
          setUploadProgress(0);
        }, 2000);
        
        return data.url;
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
      setUploadProgress(0);
      setUploadComplete(false);
      return null;
    } finally {
      setImageUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.service_id) {
      newErrors.service_id = 'Please select a service';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Per-step validation
  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }
    if (step === 2) {
      if (!formData.service_id) newErrors.service_id = 'Please select a service';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Update price estimation when service changes
    if (field === 'service_id' && value) {
      const selectedService = services.find(service => service.id.toString() === value);
      if (selectedService) {
        setEstimatedPrice({
          min: selectedService.price,
          max: selectedService.price,
          duration: selectedService.duration
        });
      }
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter(file => {
      if (!validateFileSize(file, 10)) {
        alert(`File ${file.name} is too large. Maximum size is 10MB. Current size: ${formatFileSize(file.size)}`);
        return false;
      }
      if (!validateFileType(file)) {
        alert(`File ${file.name} is not a supported format. Supported formats: Images (JPG, PNG, GIF, WebP), Documents (PDF, DOC, DOCX, TXT)`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...(prev.attachments || []), ...validFiles]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await submitBooking(formData);
      alert('Booking submitted successfully! We\'ll get back to you soon.');
      resetForm();
      setTimeout(() => { onClose(); }, 1200);
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service_id: '',
      date: '',
      time: '',
      message: '',
      image: ''
    });
    setErrors({});
    setEstimatedPrice(null);
    setCurrentStep(1);
    setUploadProgress(0);
    setUploadFileName('');
    setUploadComplete(false);
    setImageUploading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`Book Your Session — ${stepTitles[currentStep - 1]}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm text-dark-600">
          <div className="flex-1 h-2 bg-gray-200 rounded mr-3">
            <div className="h-2 bg-primary-500 rounded" style={{ width: `${(currentStep - 1) * 33.33}%` }} />
          </div>
          <span>Step {currentStep} of 4</span>
        </div>

        {/* Step 1: Personal Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                required
              />
            </div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
              required
            />
          </div>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Select
              label="Service Required"
              options={serviceOptions}
              value={formData.service_id}
              onChange={(e) => handleInputChange('service_id', e.target.value)}
              error={errors.service_id}
              required
            />
            {estimatedPrice && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary-50 border border-primary-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-primary-800 mb-2">Service Details</h4>
                <p className="text-primary-700">
                  Price: ${estimatedPrice.min.toLocaleString()}
                </p>
                <p className="text-primary-700">
                  Duration: {estimatedPrice.duration}
                </p>
                <p className="text-sm text-primary-600 mt-1">Final pricing may vary based on specific requirements.</p>
              </motion.div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Preferred Date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                error={errors.date}
                required
                min={new Date().toISOString().split('T')[0]}
              />
              <Select
                label="Preferred Time"
                options={timeOptions}
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                error={errors.time}
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Details & Attachments */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-700">Project Details</label>
              <textarea
                placeholder="Tell us about your project, vision, and any specific requirements..."
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark-700">Upload Files (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const fileUrl = await handleImageUpload(file);
                      if (fileUrl) {
                        handleInputChange('image', fileUrl);
                      }
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                  disabled={imageUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    {imageUploading ? 'Uploading...' : 'Click to upload files'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max 10MB. Supports Images (JPG, PNG, GIF, WebP) & Documents (PDF, DOC, DOCX, TXT)</p>
                </label>
              </div>
              {/* Upload Progress */}
              <UploadProgress 
                progress={uploadProgress}
                fileName={uploadFileName}
                isUploading={imageUploading}
                isComplete={uploadComplete}
              />
              
              {/* File Preview */}
              {formData.image && !imageUploading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                >
                  {isDocument(formData.image) ? (
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-300">
                      <FileIcon fileUrl={formData.image} className="w-8 h-8 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{getFileType(formData.image)} uploaded</p>
                        <p className="text-xs text-gray-500">Will be available for admin review</p>
                      </div>
                    </div>
                  ) : isImage(formData.image) ? (
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border border-gray-300 mx-auto"
                    />
                  ) : (
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-300">
                      <FileIcon fileUrl={formData.image} className="w-8 h-8 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">File uploaded</p>
                        <p className="text-xs text-gray-500">Ready to submit</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-dark-800 mb-2">Summary</h4>
              <ul className="text-sm text-dark-700 space-y-1">
                <li><strong>Name:</strong> {formData.name}</li>
                <li><strong>Email:</strong> {formData.email}</li>
                <li><strong>Phone:</strong> {formData.phone}</li>
                <li><strong>Service:</strong> {serviceOptions.find(s => s.value === formData.service_id)?.label || ''}</li>
                <li><strong>Date:</strong> {formData.date}</li>
                <li><strong>Time:</strong> {formData.time}</li>
                {estimatedPrice && (
                  <li><strong>Price:</strong> ${estimatedPrice.min.toLocaleString()}</li>
                )}
                {formData.image && (
                  <li><strong>File:</strong> {isDocument(formData.image) ? 'Document uploaded' : isImage(formData.image) ? 'Image uploaded' : 'File uploaded'}</li>
                )}
                {formData.message && (
                  <li><strong>Notes:</strong> {formData.message}</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex space-x-3 pt-2">
          <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting}>Close</Button>
          {currentStep > 1 && (
            <Button type="button" variant="secondary" onClick={() => setCurrentStep(currentStep - 1)} disabled={isSubmitting}>
              Back
            </Button>
          )}
          {currentStep < 4 && (
            <Button
              type="button"
              onClick={() => {
                if (validateStep(currentStep)) setCurrentStep(currentStep + 1);
              }}
              className="ml-auto"
            >
              Next
            </Button>
          )}
          {currentStep === 4 && (
            <Button type="submit" className="ml-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Booking...</span>
                </div>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;
