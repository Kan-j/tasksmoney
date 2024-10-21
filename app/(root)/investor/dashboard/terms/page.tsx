import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="flex flex-col p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold mb-4">Terms & Conditions</h1>

      <nav>
        <ul className="pl-4 space-y-1">
          <li><a href="#acceptance" className="text-mainColor hover:underline">1. Acceptance of Terms</a></li>
          <li><a href="#eligibility" className="text-mainColor hover:underline">2. Eligibility</a></li>
          <li><a href="#user-responsibilities" className="text-mainColor hover:underline">3. User Responsibilities</a></li>
          <li><a href="#payment-rewards" className="text-mainColor hover:underline">4. Payment and Rewards</a></li>
          <li><a href="#account-binding" className="text-mainColor hover:underline">5. Account Binding</a></li>
          <li><a href="#intellectual-property" className="text-mainColor hover:underline">6. Intellectual Property</a></li>
          <li><a href="#limitation-liability" className="text-mainColor hover:underline">7. Limitation of Liability</a></li>
          <li><a href="#privacy-policy" className="text-mainColor hover:underline">8. Privacy Policy</a></li>
          <li><a href="#termination" className="text-mainColor hover:underline">9. Termination of Service</a></li>
          <li><a href="#changes" className="text-mainColor hover:underline">10. Changes to Terms</a></li>
          <li><a href="#governing-law" className="text-mainColor hover:underline">11. Governing Law</a></li>
          <li><a href="#contact" className="text-mainColor hover:underline">12. Contact Us</a></li>
          <li><a href="#faq" className="text-mainColor hover:underline">Frequently Asked Questions</a></li>
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

        {/* Add FAQ section here */}
        <section id="faq">
          <h2 className="text-lg font-bold">Frequently Asked Questions</h2>

          <section>
            <h3 className="font-semibold">1. Start Optimization Task</h3>
            <p>1(1). A minimum 100 USDT recharge is required to reset the account to start a new task, excluding the account balance (Except for the first reset user).</p>
            <p>1(2). Once all tasks are completed, the user must request a full withdrawal and receive the withdrawal amount before requesting to reset the account.</p>
          </section>

          <section>
            <h3 className="font-semibold">2. Withdrawals</h3>
            <p>2(1). If the withdrawal amount is 10,000 USDT or more, please contact our online customer service to make a withdrawal.</p>
            <ul className="list-disc pl-6">
              <li>I. The maximum withdrawal amount for VIP1 users is 5,000 USDT</li>
              <li>II. The maximum withdrawal amount for VIP2 users is 10,000 USDT</li>
              <li>III. The maximum withdrawal amount for VIP3 users is 20,000 USDT</li>
              <li>IV. The maximum withdrawal amount for VIP4 users is 100,000 USDT.</li>
            </ul>
            <p>2(2). After completing all tasks, you can apply for a full withdrawal.</p>
            <p>2(3). Users need to complete all tasks to request a withdrawal.</p>
            <p>2(4). If you choose to give up or withdraw during the task optimization process, you cannot request a withdrawal or refund.</p>
            <p>2(5). Withdrawals cannot be processed if no withdrawal request is received from the user.</p>
          </section>

          <section>
            <h3 className="font-semibold">3. Funds</h3>
            <p>3(1). All task funds are paid by our company and used for user task experience. Users will receive a commission from our company, credited within 24 hours of completion.</p>
            <p>3(2). Task earnings will be calculated and credited within 24 hours of completion.</p>
          </section>

          <section>
            <h3 className="font-semibold">4. Recharge Issues</h3>
            <p>If you encounter recharge problems, please contact online customer service. The recharge team will resolve the issue within 24 hours.</p>
          </section>

          <section>
                <h3 className="font-semibold">5. Normal Products</h3>
                <p>5(1). Platform earnings are divided into normal earnings and six times earnings. Each Premium/Regular user will have 1 to 8 opportunities for six times earnings during the day's optimization tasks. All users will normally only receive a maximum of 1-3 combination product assignments.</p>
                <p>5(2). <strong>VIP1</strong> users will receive 0.5% profit for each normal optimization product.</p>
                <p>5(3). <strong>VIP1</strong> users will get 3% profit from each combined product.</p>
                <p>5(4). Funds and earnings will be credited back to the user's account for each optimization task completed.</p>
                <p>5(5). The system will randomly assign tasks to the user's account based on the total amount in the user's account.</p>
                <p>5(6). Once a task has been assigned to a user's account, it cannot be cancelled or skipped.</p>
            </section>

            <section>
                <h3 className="font-semibold">6. Combination Tasks</h3>
                <p>6(1). Combination products consist of 1-3 products. The user may not necessarily get 3 products, as the system randomly assigns normal and combination products. In combination products, the user has more chances to get 1-2 products.</p>
                <p>6(2). The user will receive 6 times more commissions for each product in the combination product than for the regular product.</p>
                <p>6(3). When you receive a combination product, all funds will be used for product trade submissions and will be returned to your account balance after completing the data for each product in the combination product.</p>
                <p>6(4). The system will randomly allocate combination products based on the total balance in the user's account.</p>
                <p>6(5). Once a combination product is assigned to a user's account, it cannot be canceled or skipped.</p>
            </section>

            <section>
                <h3 className="font-semibold">7. Deposit</h3>
                <p>7(1). The amount of the deposit is chosen by the user. The platform cannot decide the amount of the deposit for the user, but suggests that the user make an advance payment according to their ability.</p>
                <p>7(2). If the user needs to pay a deposit when receiving a combined product, we suggest that the user make an advance payment based on the amount of the shortfall shown on the account.</p>
                <p>7(3). Users need to confirm the deposit address with customer service before depositing. If the user transfers to the wrong address, the platform is not responsible for the mistake.</p>
                <p>7(4). The platform will not be held responsible if the user deposits into the wrong deposit account.</p>
            </section>

            <section>
                <h3 className="font-semibold">8. Cooperation of Merchants</h3>
                <p>8(1). The platform has different tasks online and offline each time. If the tasks are not optimized for a long time, the merchant will not be able to unload the tasks, affecting their progress. Users are recommended to complete all tasks and product withdrawals as soon as possible to avoid delays.</p>
                <p>8(2). The merchant will provide a deposit detail for the user to deposit.</p>
                <p>8(3). Any delay in completing tasks will be detrimental to the merchant and the overall process.</p>
            </section>

            <section>
                <h3 className="font-semibold">9. Invitation</h3>
                <p>9(1). Only <strong>VIP3</strong> users can invite new users, and they need to have worked 10 days before they are eligible to invite new users.</p>
                <p>9(2). It will not be possible to invite other users if the account has not completed all product optimizations.</p>
            </section>

            <section>
                <h3 className="font-semibold">10. Operating Hours</h3>
                <p>10(1). Platform operating hours are from 10:00 to 22:59:59 (EST).</p>
                <p>10(2). Online customer service is available from 10:00 to 22:59:59 (EST).</p>
                <p>10(3). Withdrawal operation hours are from 10:00 to 22:59:59 (EST).</p>
            </section>
        </section>
      </article>
    </section>
  );
};

export default TermsAndConditions;
