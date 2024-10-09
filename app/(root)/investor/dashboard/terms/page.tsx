import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="flex flex-col p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold mb-4">Terms & Conditions</h1>

      <nav>
        <ul className=" pl-4 space-y-1">
          <li><a href="#acceptance" className="text-orange-500 hover:underline">1. Acceptance of Terms</a></li>
          <li><a href="#eligibility" className="text-orange-500 hover:underline">2. Eligibility</a></li>
          <li><a href="#user-responsibilities" className="text-orange-500 hover:underline">3. User Responsibilities</a></li>
          <li><a href="#payment-rewards" className="text-orange-500 hover:underline">4. Payment and Rewards</a></li>
          <li><a href="#account-binding" className="text-orange-500 hover:underline">5. Account Binding</a></li>
          <li><a href="#intellectual-property" className="text-orange-500 hover:underline">6. Intellectual Property</a></li>
          <li><a href="#limitation-liability" className="text-orange-500 hover:underline">7. Limitation of Liability</a></li>
          <li><a href="#privacy-policy" className="text-orange-500 hover:underline">8. Privacy Policy</a></li>
          <li><a href="#termination" className="text-orange-500 hover:underline">9. Termination of Service</a></li>
          <li><a href="#changes" className="text-orange-500 hover:underline">10. Changes to Terms</a></li>
          <li><a href="#governing-law" className="text-orange-500 hover:underline">11. Governing Law</a></li>
          <li><a href="#contact" className="text-orange-500 hover:underline">12. Contact Us</a></li>
        </ul>
      </nav>

      <article className="space-y-4 text-gray-800">
        <section id="acceptance">
          <h2 className="text-lg font-bold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using [Company Name]'s platform, you agree to comply with and be bound by these Terms and Conditions. 
            If you do not agree to these terms, you may not access or use the platform.
          </p>
        </section>

        <section id="eligibility">
          <h2 className="text-lg font-bold">2. Eligibility</h2>
          <p>
            To participate in [Company Name]'s product review and rewards program, you must be at least 18 years old or have parental consent, 
            and provide accurate and truthful information.
          </p>
        </section>

        <section id="user-responsibilities">
          <h2 className="text-lg font-bold">3. User Responsibilities</h2>
          <ul className="list-disc pl-6">
            <li>You agree to provide honest, original, and unbiased reviews.</li>
            <li>You may not post fraudulent or misleading information.</li>
            <li>You are responsible for keeping your account information confidential.</li>
            <li>Any misuse of the platform, including abusive or inappropriate behavior, may result in account suspension or termination.</li>
          </ul>
        </section>

        <section id="payment-rewards">
          <h2 className="text-lg font-bold">4. Payment and Rewards</h2>
          <p>
            Users are eligible to receive rewards for valid product reviews submitted through the platform. 
            Rewards are subject to review and approval by [Company Name].
          </p>
          <p>
            The payment methods and timelines for rewards will be specified on the platform. 
            [Company Name] reserves the right to adjust or cancel rewards in cases of suspected fraud or abuse.
          </p>
        </section>

        <section id="account-binding">
          <h2 className="text-lg font-bold">5. Account Binding</h2>
          <p>
            To receive payments, users must provide accurate withdrawal account details. 
            Supported currencies include USDT, BTC, TRC20, ETH, and others. 
            Incorrect information may result in delays or failed transactions.
          </p>
        </section>

        <section id="intellectual-property">
          <h2 className="text-lg font-bold">6. Intellectual Property</h2>
          <p>
            All content, materials, and intellectual property on the platform belong to [Company Name]. 
            You may not use, distribute, or reproduce any material without our written consent.
          </p>
        </section>

        <section id="limitation-liability">
          <h2 className="text-lg font-bold">7. Limitation of Liability</h2>
          <p>
            [Company Name] is not liable for any indirect, incidental, or consequential damages arising from the use of the platform, 
            including but not limited to loss of earnings or reputation.
          </p>
        </section>

        <section id="privacy-policy">
          <h2 className="text-lg font-bold">8. Privacy Policy</h2>
          <p>
            We respect your privacy and are committed to protecting your personal information. 
            Please review our Privacy Policy for more details on how we collect, use, and safeguard your data.
          </p>
        </section>

        <section id="termination">
          <h2 className="text-lg font-bold">9. Termination of Service</h2>
          <p>
            [Company Name] reserves the right to suspend or terminate any account at its sole discretion, 
            with or without notice, for any violation of these Terms and Conditions or for any other reason deemed necessary.
          </p>
        </section>

        <section id="changes">
          <h2 className="text-lg font-bold">10. Changes to Terms</h2>
          <p>
            [Company Name] may update or modify these Terms and Conditions at any time. 
            Any changes will be effective immediately upon posting on the platform. 
            It is your responsibility to review these terms regularly.
          </p>
        </section>

        <section id="governing-law">
          <h2 className="text-lg font-bold">11. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of [Applicable Country]. 
            Any disputes will be resolved in accordance with these laws.
          </p>
        </section>

        <section id="contact">
          <h2 className="text-lg font-bold">12. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms and Conditions, please contact us at [Support Email].
          </p>
        </section>
      </article>
    </section>
  );
};

export default TermsAndConditions;
