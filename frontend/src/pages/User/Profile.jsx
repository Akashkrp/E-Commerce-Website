
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";



const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
      }, [userInfo.email, userInfo.username]);
    
      const dispatch = useDispatch();

      const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const res = await updateProfile({
              _id: userInfo._id,
              username,
              email,
              password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Profile updated successfully");
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

      return (
        <div className="container mx-auto p-4 mt-[10rem]">
          <div className="flex justify-center align-center md:flex md:space-x-4">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="bg-black text-white border border-gray-900 p-4 rounded-sm w-full placeholder-gray-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
    
                <div className="mb-4">
                  <label className="block text-white mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="bg-black text-white border border-gray-900 p-4 rounded-sm w-full placeholder-gray-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
    
                <div className="mb-4">
                  <label className="block text-white mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="bg-black text-white border border-gray-900 p-4 rounded-sm w-full placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
    
                <div className="mb-4">
                  <label className="block text-white mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="bg-black text-white border border-gray-900 p-4 rounded-sm w-full placeholder-gray-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
    
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  >
                    Update
                  </button>
    
                  <Link
                    to="/user-orders"
                    className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
                  >
                    My Orders
                  </Link>
                </div>
                {loadingUpdateProfile && <Loader />}
              </form>
            </div>
          </div>
        </div>
      );
    };
    


export default Profile;


/*
useSelector is used to access user state 
or
useSelector is used to access (or "read") data from the Redux store in your component.


useSelector(...) returns the auth slice of the Redux state (whatever is inside state.auth).
{ userInfo } = ... destructures the userInfo property out of the auth slice. const { userInfo } = ... creates a new constant variable named userInfo in your component scope.

the first element of the array returned by useProfileMutation() is the function to call when you want to perform the mutation (i.e., updateProfile). updateProfile is a function

Concept	Meaning
unwrap() => Extracts pure response data from RTK mutation call and throws error if any
Why use it?	To use try/catch cleanly and get just the useful data (not wrapped in RTK metadata)

LN 114
When the user submits their form to update their profile, loadingUpdateProfile becomes true while the profile update is being processed.

As long as loadingUpdateProfile is true, the <Loader /> component is rendered, which typically means a loading spinner.

A mutation is a request that changes data (in this case, updates the profile).

*/