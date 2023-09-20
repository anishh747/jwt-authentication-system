import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { useCreateRoomMutation } from '../slices/roomSlice';
import { useJoinRoomMutation } from '../slices/roomSlice';
import { setRoomData } from '../slices/chatRoomSlice';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [profileState, setProfileState] = useState(false);
  const navRef = useRef();
  const profileRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  const { userInfo } = useSelector((state) => state.auth);

  //Events on the dialog box
  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();
  const createJoinBtnHandler = () => {
    const favDialog = document.getElementById("favDialog");
    favDialog.showModal();
    const confirmJoinBtn = favDialog.querySelector("#confirmJoinBtn");
    const createRoomBtn = favDialog.querySelector("#createBtn");
    const dialogInput = document.getElementById("dialogInput")

    confirmJoinBtn.addEventListener("click", async (event) => {
      try {
        event.preventDefault();
        const userEmail = userInfo.rows[0].email;
        favDialog.close(dialogInput.value);
        let room_id = favDialog.returnValue;
        const res = await joinRoom({ room_id, userEmail }).unwrap();
        dispatch(setRoomData({...res}));
        if (res.rowCount === 1) {
          navigate(`/room/${room_id}`)
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }

    });

    createRoomBtn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const room_id = uuidv4();
        const host = userInfo.rows[0].email;
        const res = await createRoom({ room_id, host }).unwrap();
        dispatch(setRoomData({ ...res }));
        favDialog.close();
        navigate(`/room/${room_id}`)
      } catch (err) {
        favDialog.close();
        toast.error(err?.data?.message || err.error)
        // toast("Some Error Occured")
      }
    });
  }

  // Replace  path with your path
  const navigation = [
    { title: "Careers", path: "" },
    { title: "Guides", path: "" },
    { title: "Partners", path: "" },
  ]

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setProfileState(false)
    }
    document.addEventListener('click', handleDropDown)
  }, [])

  useEffect(() => {

    const body = document.body

    // Disable scrolling
    const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
    if (menuState) body.classList.add(...customBodyStyle)
    // Enable scrolling
    else body.classList.remove(...customBodyStyle)

    // Sticky strick
    const customStyle = ["sticky-nav", "fixed", "border-b"]
    window.onscroll = () => {
      if (window.scrollY > 80) navRef.current.classList.add(...customStyle)
      else navRef.current.classList.remove(...customStyle)
    }
  }, [menuState])


  return (
    <>
      <nav ref={navRef} className="bg-white w-full top-0 z-20">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
          <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
            <a href="">
              <img
                src="https://www.floatui.com/logo.svg"
                width={120}
                height={50}
                alt="Float UI logo"
              />
            </a>
            <div className="lg:hidden">
              <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                onClick={() => setMenuState(!menuState)}
              >
                {
                  menuState ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  )
                }
              </button>
            </div>
          </div>
          <div className={`flex-1 justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${menuState ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'}`}>
            {!userInfo ? (
              <>
                <div>
                  <ul className="flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
                    <li className="mt-8 mb-8 lg:mt-0 lg:mb-0">
                      <a href="" className="text-gray-600 hover:text-indigo-600">
                        Contact
                      </a>
                    </li>
                    <Link to="/login">
                      <li className="mt-4 lg:mt-0">
                        <a href="" className="py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0">
                          Login
                        </a>
                      </li>
                    </Link>
                    <Link to="/register">
                      <li className="mt-8 lg:mt-0">
                        <a href="" className="py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline">
                          Sign Up
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className={`relative`}>
                  <div className="flex items-center space-x-4">
                    <button onClick={createJoinBtnHandler} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <span className=" relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Join or Create
                      </span>
                    </button>
                    <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                      onClick={() => setProfileState(!profileState)}
                    >
                      <img
                        src="https://randomuser.me/api/portraits/men/46.jpg"
                        className="w-full h-full rounded-full"
                      />
                    </button>
                    <div className="lg:hidden">
                      <span className="block">Micheal John</span>
                      <span className="block text-sm text-gray-500">john@gmail.com</span>
                    </div>
                  </div>
                  <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${profileState ? '' : 'lg:hidden'}`}>
                    <li>
                      <button className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}



            <div className="flex-1">
              <ul className="justify-center items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                {
                  navigation.map((item, idx) => {
                    return (
                      <li key={idx} className="text-gray-600 hover:text-indigo-600">
                        <a href={item.path}>
                          {item.title}
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </nav>



      <dialog id="favDialog">
        <form>
          <p>
            <label>
              Enter Room ID:
            </label>
            <input type="text" id='dialogInput' />
          </p>
          <div>
            <button id="confirmJoinBtn" value="default">Confirm</button>
          </div>
          <p>OR</p>
          <div>
            <button id="createBtn" value="default">Create New Room</button>
          </div>
        </form>
        <button value="cancel" formMethod="dialog">Cancel</button>
      </dialog>
      <output></output>


    </>

  )
}

export default Header;
