import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Apparel Stock Hub",
  description: "Learn how Apparel Stock Hub collects, uses, and protects your personal information.",
  keywords: "privacy policy, data protection, apparel stock hub",
  robots: "index, follow",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen pt-16 sm:pt-20 md:pt-24 max-w-[90%] sm:max-w-[85%] md:max-w-[800px] mx-auto text-base sm:text-lg py-4 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        Privacy Policy
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to Apparel Stock Hub. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="leading-relaxed mb-3">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number when you contact us through our forms.</li>
            <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on site.</li>
            <li><strong>Cookies:</strong> Small text files stored on your device to enhance your browsing experience.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="leading-relaxed mb-3">We use collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Responding to your inquiries and providing customer support</li>
            <li>Improving our website and services</li>
            <li>Analyzing website traffic and user behavior</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p className="leading-relaxed mb-3">We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
            <li><strong>Microsoft Clarity:</strong> To understand user interactions and improve user experience</li>
            <li><strong>Google AdSense:</strong> To display relevant advertisements (if applicable)</li>
          </ul>
          <p className="leading-relaxed">
            These services have their own privacy policies. We recommend reviewing them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p className="leading-relaxed mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Cookies Policy</h2>
          <p className="leading-relaxed">
            We use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-3">
            <p>Email: info@apparelstockhub.com</p>
            <p>Phone: [Your Phone Number]</p>
            <p>Address: [Your Business Address]</p>
          </div>
        </section>

        <section className="text-sm text-gray-600">
          <p>Last Updated: September 8, 2025</p>
        </section>
      </div>
    </div>
  );
}
