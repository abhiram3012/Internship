import { useState } from "react";
import axios from 'axios';
import { Typography, Input, Button, Select, Option } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export function LoginForm() {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Set the URL based on the selected role
      let loginUrl = `http://localhost:5000/api/${role}/login`; 

      const response = await axios.post(loginUrl, { emailId, password });

      // Store the token and user details in local storage and Redux
      localStorage.setItem('token', response.data.accessToken);
      dispatch(addUser({
        uid: response.data.id,
        username: response.data.username,
        emailId: response.data.emailId,
        phoneNumber:response.data.phoneNumber,
        department:response.data.department,
        accesstoken: response.data.accessToken
      }));

      // Navigate to the respective dashboard based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'technician') {
        navigate('/technician/new-problems');
      } else {
        navigate('/enduser/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid emailId or password');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen p-4 md:p-8">
      <div className="w-full max-w-md">
        <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
          Sign In
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-lg">
          Enter your email, password, and role to sign in
        </Typography>
        {error && (
          <Typography color="red" className="mb-4 text-center">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} className="mx-auto text-left">
          <div className="mb-6">
            <label htmlFor="emailId">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Your Email
              </Typography>
            </label>
            <Input
              id="emailId"
              color="gray"
              size="lg"
              type="email"
              name="emailId"
              placeholder="name@mail.com"
              className="w-full placeholder-opacity-100 focus:border-primary border-t-blue-gray-200"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              className="w-full placeholder-opacity-100 focus:border-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility} className="cursor-pointer">
                  {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                </i>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <Typography variant="small" className="mb-2 block font-medium text-gray-900">
              Select Role
            </Typography>
            <Select
              value={role}
              onChange={(e) => setRole(e)}
              className="w-full"
            >
              <Option value="admin">Admin</Option>
              <Option value="technician">Technician</Option>
              <Option value="enduser">End User</Option>
            </Select>
          </div>
          <Button color="gray" size="lg" className="mt-6 w-full" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
          <div className="mt-4 flex justify-end">
            <Typography as="a" href="#" color="blue-gray" variant="small" className="font-medium">
              Forgot password
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
