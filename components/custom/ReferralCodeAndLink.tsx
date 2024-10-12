import React, { useEffect, useState } from 'react';
import { getReferralCode } from '@/lib/actions/user.actions'; // Import server action
import { Button } from '../ui/button';
import { ClipboardCopy, ClipboardCheck } from 'lucide-react'; // Import the ClipboardCheck icon for copied feedback

interface Props {
  userId: string | null;
}

const ReferralCodeAndLink: React.FC<Props> = ({ userId }) => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null); // To track which text has been copied

  // Function to copy the given text to the clipboard
  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedText(text); // Set the copied text
      setTimeout(() => setCopiedText(null), 1500); // Clear after 1.5 seconds
    }
  };

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        if (!userId) return;
        setLoading(true);
        const code = await getReferralCode(userId);
        setReferralCode(code);
      } catch (error: any) {
        console.error('Error fetching referral code:', error);
        setError(error.message || 'An unknown error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralCode();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const referralLink = referralCode
    ? `http://localhost:3000/register?ref=${referralCode}`
    : null;

  return (
    <section className="p-4 border border-gray-200 rounded-lg">
      {/* Referral Code Section */}
      <h2 className="text-xl font-bold mb-4">Referral Code</h2>
      <div className="flex justify-between items-center">
        <p
          className={`text-base font-bold mb-4 ${copiedText === referralCode ? 'text-green-500' : 'text-orange-500'}`}
        >
          {referralCode ? referralCode : 'No referral code available'}
        </p>
        <Button
          variant={'outline'}
          onClick={() => handleCopy(referralCode || '')} // Call copy function on click
          className="flex items-center justify-center"
        >
          {copiedText === referralCode ? (
            <ClipboardCheck className="animate-bounce text-green-500" />
          ) : (
            <ClipboardCopy />
          )}
        </Button>
      </div>

      {/* Referral Link Section */}
      <h2 className="text-xl font-bold mb-4">Referral Link</h2>
      <div className="flex justify-between items-center">
        <p
          className={`text-base font-bold ${copiedText === referralLink ? 'text-green-500' : 'text-orange-500'}`}
        >
          {referralLink ? referralLink : 'No referral link available'}
        </p>
        <Button
          variant={'outline'}
          onClick={() => handleCopy(referralLink || '')} // Call copy function on click
          className="flex items-center justify-center"
        >
          {copiedText === referralLink ? (
            <ClipboardCheck className="animate-bounce text-green-500" />
          ) : (
            <ClipboardCopy />
          )}
        </Button>
      </div>
    </section>
  );
};

export default ReferralCodeAndLink;
