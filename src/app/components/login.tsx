import { useState } from 'react';
import { CheckCircle, XCircle } from 'react-feather';

export interface LoginComponentProps {
  setIsAuthenticated: (v: boolean) => void;
}
export default function Login(props: LoginComponentProps) {
  const errorMessage = [{ title: 'You need to ', description: '' }];

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
      hint: '',
      value: process.env.NEXT_PUBLIC_PASSWORD1 || '',
    },
    pass2: {
      inputValue: '',
      hint: '',
      value: process.env.NEXT_PUBLIC_PASSWORD2 || '',
    },
    pass3: {
      inputValue: '',
      hint: '',
      value: process.env.NEXT_PUBLIC_PASSWORD3 || '',
    },
  });

  const validateInputs = () => {
    setPasswordInput((prevState) => {
      const updatedState = { ...prevState };

      Object.keys(updatedState).forEach((key) => {
        const k = key as 'pass1' | 'pass2' | 'pass3';
        updatedState[k].error =
          updatedState[k].inputValue.toLowerCase() !==
          updatedState[k].value.toLowerCase();
      });

      const hasError = Object.values(updatedState)
        .map((s) => s.error)
        .filter((f) => !!f);
      if (hasError.length === 0) {
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

  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen max-w-md m-auto p-2">
      <div>
        <div className="flex items-center justify-center">
          <span className="title text-7xl">A</span>
          <span className="title text-9xl text-red-600">/</span>
          <span className="title text-7xl">B</span>
        </div>
        <div className="-mt-6 text-center">
          This little mystery that will test your <b>200+IQ</b> 😁😂. If you are
          willing to take this test, you can use my letter to get the all the
          password you needed to view what is hidden in this site.{' '}
          <b>
            TAKE NOTE: you might encounter harsh words or messages, don't be
            pressed about it!
          </b>
        </div>
      </div>
      {Object.entries(passwordInput).map(
        ([key, { inputValue, hint, error }]) => (
          <div className="flex items-center gap-x-2 relative w-full" key={key}>
            <div className="w-full">
              <p className="font-bold">Password {key.replace('pass', '')}</p>
              <input
                value={inputValue}
                type="text"
                className="my-2 bg-transparent p-5 border border-white w-full"
                onChange={(e) =>
                  handleChange(
                    key as 'pass1' | 'pass2' | 'pass3',
                    e.target.value
                  )
                }
              />
              <p>Hint: {hint}</p>
            </div>
            {error !== undefined &&
              (error ? (
                <XCircle className="text-red-400 absolute right-5" />
              ) : (
                <CheckCircle className="text-green-400 absolute right-5" />
              ))}
          </div>
        )
      )}

      <hr className="border-gray-400 w-full my-2" />
      <div className="w-full">
        <button
          className="w-full bg-red-700 font-semibold py-5"
          onClick={validateInputs}
        >
          SHOW ME!!!
        </button>
      </div>
    </div>
  );
}
