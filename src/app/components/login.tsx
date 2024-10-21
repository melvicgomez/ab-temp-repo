import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'react-feather';

export interface LoginComponentProps {
  setIsAuthenticated: (v: boolean) => void;
}
export default function Login(props: LoginComponentProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const [passwordInput, setPasswordInput] = useState<
    Record<
      'pass1' | 'pass2' | 'pass3',
      {
        inputValue: string;
        hint: string;
        value: string;
        error?: boolean;
      }
    >
  >({
    pass1: {
      inputValue: '',
      hint: 'Red is the color for passion. Related to favorite hobby. This is something I can be competitive when someone is stronger than me. Name of an "it".',
      value: process.env.NEXT_PUBLIC_PASSWORD1 || '',
    },
    pass2: {
      inputValue: '',
      hint: "A chestnut liquid that warms my chest and intoxicates my mind. Involved in our first encounter at Nov 5, 2023. You introduce me it's name (anniversary).",
      value: process.env.NEXT_PUBLIC_PASSWORD2 || '',
    },
    pass3: {
      inputValue: '',
      hint: "☕☕☕☕☕☕☕☕☕☕ of coffee. Name is just a label. Your name on the Rift isn't just a label—it's a symbol of your journey, outplays, and epic moments in League.",
      value: process.env.NEXT_PUBLIC_PASSWORD3 || '',
    },
  });

  const validateInputs = () => {
    setPasswordInput((prevState) => {
      const updatedState = { ...prevState };

      Object.keys(updatedState).forEach((key) => {
        const k = key as 'pass1' | 'pass2' | 'pass3';
        updatedState[k].error = updatedState[k].inputValue.toLowerCase() !== updatedState[k].value.toLowerCase();
      });

      const hasError = Object.values(updatedState)
        .map((s) => s.error)
        .filter((f) => !!f);
      if (hasError.length === 0) {
        sendEmail();
        props.setIsAuthenticated(true);
      }
      return updatedState;
    });
  };

  const handleChange = (key: 'pass1' | 'pass2' | 'pass3', newValue: string) => {
    setPasswordInput((prevState) => ({
      ...prevState,
      [key]: { ...prevState[key], inputValue: newValue },
    }));
  };

  useEffect(() => {
    const enableTime = new Date('2024-10-20T21:00:00'); // Oct 20, 2024, 8:01 AM
    const now = new Date();

    if (now >= enableTime) {
      setIsDisabled(false); // Enable button if the current time has passed the enable time
    } else {
      // Calculate the remaining time until the target date in milliseconds
      const timeout = enableTime.getTime() - now.getTime(); // Ensure both are in milliseconds

      // Set a timeout to enable the button at the correct time
      const timer = setTimeout(() => {
        setIsDisabled(false);
      }, timeout);

      // Cleanup timeout on component unmount
      return () => clearTimeout(timer);
    }
  }, []);

  const sendEmail = async () => {
    const data = {
      service_id: process.env.NEXT_PUBLIC_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_PUBLIC_KEY,
      template_params: {
        message: `Login ${new Date().toLocaleString()}`,
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.text || response.statusText}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen max-w-lg m-auto p-2">
      <div>
        <div className="flex items-center justify-center">
          <span className="title text-7xl">A</span>
          <span className="title text-9xl text-red-600">/</span>
          <span className="title text-7xl">B</span>
        </div>
        <div className="-mt-6 text-center">
          This little mystery that will test your <b>200+IQ</b> 😁😂. If you are willing to take this test, you can use
          my letter to get the all the password you needed to view what is hidden in this site.{' '}
          <b>{`TAKE NOTE: you might encounter harsh words or messages, don't be pressed about it!`}</b>
        </div>
      </div>
      {Object.entries(passwordInput).map(([key, { inputValue, hint, error }]) => (
        <div className="" key={key}>
          <p className="font-bold">Password {key.replace('pass', '')} (one word)</p>
          <div className="flex items-center gap-x-2  w-full relative">
            <input
              value={inputValue}
              type="text"
              className="my-2 bg-transparent p-5 border border-white w-full"
              onChange={(e) => handleChange(key as 'pass1' | 'pass2' | 'pass3', e.target.value)}
            />
            {error !== undefined &&
              (error ? (
                <XCircle className="text-red-400 absolute right-5" />
              ) : (
                <CheckCircle className="text-green-400 absolute right-5" />
              ))}
          </div>
          <p>Hint: {hint}</p>
        </div>
      ))}

      <hr className="border-gray-400 w-full my-2" />

      {isDisabled && <p>Button can work only after {new Date('2024-10-20T21:00:00').toLocaleString()}</p>}

      <div className="w-full">
        <button
          disabled={isDisabled}
          className={`${
            isDisabled ? 'bg-red-200 cursor-not-allowed' : 'bg-red-700 cursor-pointer'
          } w-full font-semibold py-5`}
          onClick={validateInputs}
        >
          SHOW ME!!!
        </button>
      </div>
    </div>
  );
}
