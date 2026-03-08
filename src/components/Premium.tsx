import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useState } from 'react';

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremium = async () => {
    try {
      const res = await axios.get(BASE_URL + '/premium/verify', {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleBuy = async (type: string) => {
    try {
      const order = await axios.post(
        BASE_URL + '/payment/create',
        { membershipType: type },
        { withCredentials: true },
      );
      const { keyId, amount, currency, orderId, notes } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Zing',
        description: 'Once a zing always a zing',
        order_id: orderId,
        prefill: {
          name: notes.firstName + ' ' + notes.lastName,
          email: notes.emailId,
          contact: '+919876543210',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#0D9488',
        },
        handler: verifyPremium,
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     verifyPremium();
  //   }, []);

  return isUserPremium ? (
    <div className='text-center mt-20 text-gray-400 text-lg'>
      You are already premium
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center gap-8 px-4'>
      <div className='card w-96 bg-base-200 shadow-xl border border-base-300'>
        <div className='card-body'>
          <span className='badge badge-secondary badge-sm w-fit'>
            Most Popular
          </span>

          <div className='flex justify-between items-center'>
            <h2 className='text-3xl font-bold'>Gold</h2>
            <span className='text-lg font-semibold'>₹200/mo</span>
          </div>

          <ul className='mt-6 flex flex-col gap-3 text-sm'>
            <li>✓ See who liked your profile</li>
            <li>✓ Unlimited likes</li>
            <li>✓ Advanced match filters</li>
            <li>✓ 1 profile boost per week</li>

            <li className='opacity-40 line-through'>
              Message priority in inbox
            </li>
            <li className='opacity-40 line-through'>Exclusive premium badge</li>
          </ul>

          <div className='card-actions mt-6'>
            <button
              className='btn btn-secondary w-full'
              onClick={() => handleBuy('gold')}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>

      <div className='text-lg font-semibold opacity-60 px-2'>OR</div>

      <div className='card w-96 bg-base-200 shadow-xl border border-base-300'>
        <div className='card-body'>
          <span className='badge  badge-sm w-fit'></span>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl font-bold'>Diamond</h2>
            <span className='text-lg font-semibold'>₹500/mo</span>
          </div>

          <ul className='mt-6 flex flex-col gap-3 text-sm'>
            <li>✓ See who liked your profile</li>
            <li>✓ Unlimited likes</li>
            <li>✓ Advanced match filters</li>
            <li>✓ Daily profile boost</li>
            <li>✓ Message priority in inbox</li>
            <li>✓ Exclusive premium badge</li>
          </ul>

          <div className='card-actions mt-6'>
            <button
              className='btn btn-accent w-full'
              onClick={() => handleBuy('diamond')}
            >
              Buy Diamond
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
