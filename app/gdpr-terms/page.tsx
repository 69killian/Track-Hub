// src/pages/GDPRTerms.tsx
"use client"
import React from 'react';

const GDPRTerms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">GDPR Terms and Conditions</h1>
      <p className="text-lg text-gray-700 mb-4">
        The General Data Protection Regulation (GDPR) is a European Union (EU) regulation that protects individuals&lsquo; privacy and data. The key principles of the GDPR are:
      </p>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>Transparency: Clear information on how personal data is collected and used.</li>
        <li>Data minimization: Collecting only the necessary data for the specified purpose.</li>
        <li>Data accuracy: Ensuring that personal data is accurate and up-to-date.</li>
        <li>Data retention: Not keeping personal data longer than necessary.</li>
        <li>Security: Protecting personal data against unauthorized access or loss.</li>
        <li>Accountability: Being responsible for how data is handled and protected.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-4">
        If you have any questions or need further information regarding how your data is used, please contact us.
      </p>
    </div>
  );
};

export default GDPRTerms;
