import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Room = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const posts = [
        {
            authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            authorName: "Sidi dev",
        },
        {
            authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
            authorName: "Micheal",
        },
        {
            authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
            authorName: "Luis",
        },
        {
            authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
            authorName: "Lourin",
        }
    ]

    return (
        <>
            <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
                <div className="text-center">
                    <h1 className="text-3xl text-gray-800 font-semibold">
                        Blog
                    </h1>
                    <p className="mt-3 text-gray-500">
                        Blogs that are loved by the community. Updated every hour.
                    </p>
                </div>
                <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        posts.map((items, key) => (
                            <article className="flex  justify-center items-center max-w-md min-w-[300px] min-h-[200px] mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                                <a>
                                    <div className="flex flex-col items-center">
                                        <div className="flex-none w-[6rem] h-[6rem] rounded-full">
                                            <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                                        </div>
                                        <div className="">
                                            <span className="block text-gray-900">{items.authorName}</span>
                                        </div>
                                    </div>

                                </a>
                            </article>
                        ))
                    }
                </div>
            </section>
        </>
    );
}

export default Room;


