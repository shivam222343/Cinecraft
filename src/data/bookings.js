export const sampleBookings = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    service: 'videography',
    date: '2024-01-15',
    time: '10:00',
    status: 'pending',
    message: 'Need a corporate video for our product launch. Looking for professional quality with multiple camera angles and professional lighting setup.',
    createdAt: '2024-01-10T09:30:00Z',
    estimatedPrice: '$2,500 - $4,000',
    attachments: []
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    phone: '+1 (555) 987-6543',
    service: 'photography',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed',
    message: 'Product photography for our e-commerce website. Need clean, professional shots of about 50 products with white background.',
    createdAt: '2024-01-08T14:15:00Z',
    estimatedPrice: '$1,200 - $2,000',
    attachments: ['product-list.pdf']
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@startup.com',
    phone: '+1 (555) 456-7890',
    service: 'commercial-drone',
    date: '2024-01-25',
    time: '09:00',
    status: 'completed',
    message: 'Aerial shots of our new facility for marketing materials and website. Need both photos and video footage.',
    createdAt: '2024-01-05T11:20:00Z',
    estimatedPrice: '$1,500 - $3,000',
    attachments: ['facility-map.jpg', 'shot-list.docx']
  },
  {
    id: 4,
    name: 'Emily Chen',
    email: 'emily@events.com',
    phone: '+1 (555) 321-9876',
    service: 'broadcasting',
    date: '2024-02-01',
    time: '16:00',
    status: 'pending',
    message: 'Live streaming setup for corporate conference. Need multi-camera coverage and professional audio.',
    createdAt: '2024-01-12T10:45:00Z',
    estimatedPrice: '$3,000 - $5,000',
    attachments: ['event-schedule.pdf']
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@musiclabel.com',
    phone: '+1 (555) 654-3210',
    service: 'cinematography',
    date: '2024-02-10',
    time: '11:00',
    status: 'confirmed',
    message: 'Music video production for upcoming single release. Looking for creative cinematography with multiple locations.',
    createdAt: '2024-01-15T16:30:00Z',
    estimatedPrice: '$4,000 - $7,000',
    attachments: ['storyboard.pdf', 'reference-video.mp4']
  }
];

export const bookingStatuses = [
  { id: 'pending', name: 'Pending', color: 'yellow' },
  { id: 'confirmed', name: 'Confirmed', color: 'green' },
  { id: 'in-progress', name: 'In Progress', color: 'blue' },
  { id: 'completed', name: 'Completed', color: 'gray' },
  { id: 'cancelled', name: 'Cancelled', color: 'red' }
];
