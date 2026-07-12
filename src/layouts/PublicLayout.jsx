import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../public-website/components/PublicNavbar';
import PublicFooter from '../public-website/components/PublicFooter';
import FloatingEnrollmentCTA from '../components/FloatingEnrollmentCTA';
import WhatsAppButton from '../components/WhatsAppButton';
import InquiryPopup from '../components/InquiryPopup';

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-grow pb-24 sm:pb-0">
        <Outlet />
      </main>
      <FloatingEnrollmentCTA />
      <WhatsAppButton />
      <InquiryPopup />
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
